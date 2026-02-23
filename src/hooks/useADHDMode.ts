import { useState, useEffect } from 'react';
import type { EnergyLevel } from '../types';

const ADHD_MODE_KEY = 'tada-adhd-mode';
const ENERGY_FILTER_KEY = 'tada-energy-filter';

export const useADHDMode = () => {
  const [isADHDMode, setIsADHDMode] = useState(() => {
    const saved = localStorage.getItem(ADHD_MODE_KEY);
    return saved === 'true';
  });

  const [energyFilter, setEnergyFilter] = useState<EnergyLevel | null>(() => {
    const saved = localStorage.getItem(ENERGY_FILTER_KEY);
    return saved ? (saved as EnergyLevel) : null;
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(ADHD_MODE_KEY, isADHDMode.toString());
  }, [isADHDMode]);

  useEffect(() => {
    if (energyFilter) {
      localStorage.setItem(ENERGY_FILTER_KEY, energyFilter);
    } else {
      localStorage.removeItem(ENERGY_FILTER_KEY);
    }
  }, [energyFilter]);

  const toggleADHDMode = () => {
    setIsADHDMode((prev) => !prev);
  };

  const celebrate = (taskTitle: string) => {
    const messages = [
      `🎉 Nice one! ${taskTitle} is done!`,
      `✨ Look at you go! ${taskTitle} crushed!`,
      `🌟 That's done and dusted! ${taskTitle} complete!`,
      `💪 You're on a roll! ${taskTitle} finished!`,
      `🎯 Nailed it! ${taskTitle} is history!`,
      `🔥 Way to go! ${taskTitle} conquered!`,
      `⚡ Boom! ${taskTitle} completed!`,
      `🌈 Awesome work! ${taskTitle} done!`,
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCelebrationMessage(randomMessage);
    setShowCelebration(true);

    // Auto-hide celebration after 3 seconds
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const clearEnergyFilter = () => {
    setEnergyFilter(null);
  };

  return {
    isADHDMode,
    toggleADHDMode,
    energyFilter,
    setEnergyFilter,
    clearEnergyFilter,
    showCelebration,
    celebrationMessage,
    celebrate,
  };
};
