/**
 * TADA — User-preferences hook.
 *
 * Single source of truth for all persisted settings (dark mode, ADHD mode,
 * energy filter). Uses the {@link StorageAdapter} for persistence.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { AppSettings, EnergyLevel } from '../types/index';
import { getStorage, DEFAULT_SETTINGS } from '../lib/storage';
import { SAVE_DEBOUNCE_MS } from '../lib/constants';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ---- Load from storage on mount ----------------------------------------
  useEffect(() => {
    let cancelled = false;
    const storage = getStorage();

    storage.getSettings().then((stored) => {
      if (!cancelled) {
        setSettings(stored);
        setIsLoaded(true);
      }
    }).catch((err) => {
      console.error('[useSettings] Failed to load settings:', err);
      if (!cancelled) setIsLoaded(true);
    });

    return () => { cancelled = true; };
  }, []);

  // ---- Debounced persist --------------------------------------------------
  const scheduleSave = useCallback(() => {
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const storage = getStorage();
      storage.saveSettings(settingsRef.current).catch((err) => {
        console.error('[useSettings] Failed to save settings:', err);
      });
    }, SAVE_DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    scheduleSave();
  }, [settings, isLoaded, scheduleSave]);

  // ---- Apply dark-mode class to <html> ------------------------------------
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // ---- Convenience setters ------------------------------------------------

  const toggleDarkMode = useCallback(() => {
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  const toggleADHDMode = useCallback(() => {
    setSettings((prev) => ({ ...prev, adhdMode: !prev.adhdMode }));
  }, []);

  const setEnergyFilter = useCallback((level: EnergyLevel) => {
    setSettings((prev) => ({ ...prev, energyFilter: level }));
  }, []);

  const clearEnergyFilter = useCallback(() => {
    setSettings((prev) => ({ ...prev, energyFilter: null }));
  }, []);

  return {
    settings,
    isLoaded,
    toggleDarkMode,
    toggleADHDMode,
    setEnergyFilter,
    clearEnergyFilter,
    // Expose raw setter for batch updates
    updateSettings: setSettings,
  };
};
