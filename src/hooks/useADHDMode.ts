import { useState, useEffect } from 'react';
import type { EnergyLevel, CelebrationType } from '../types';

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
  const [celebrationType, setCelebrationType] = useState<CelebrationType>('task');

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

  const celebrate = (taskTitle: string, type: CelebrationType = 'task') => {
    setCelebrationType(type);

    let messages: string[] = [];

    switch (type) {
      case 'subtask':
        messages = [
          `✅ One step closer! ${taskTitle}`,
          `🎯 Micro-win! ${taskTitle} done!`,
          `✨ Nice! ${taskTitle} complete!`,
          `💫 Progress! ${taskTitle} checked off!`,
        ];
        break;
      case 'bigwin':
        messages = [
          `🎊 ALL DONE! You completed everything today! 🎊`,
          `🏆 INCREDIBLE! All tasks complete! 🏆`,
          `🌟 YOU DID IT! Everything's done! 🌟`,
          `🎉 AMAZING! You conquered your list! 🎉`,
        ];
        break;
      case 'streak':
        messages = [
          `🔥 Streak milestone! ${taskTitle}`,
          `⭐ ${taskTitle} — You're unstoppable!`,
          `🚀 ${taskTitle} — Keep it going!`,
          `💪 ${taskTitle} — Incredible consistency!`,
        ];
        break;
      default:
        messages = [
          `🎉 Nice one! ${taskTitle} is done!`,
          `✨ Look at you go! ${taskTitle} crushed!`,
          `🌟 That's done and dusted! ${taskTitle} complete!`,
          `💪 You're on a roll! ${taskTitle} finished!`,
          `🎯 Nailed it! ${taskTitle} is history!`,
          `🔥 Way to go! ${taskTitle} conquered!`,
          `⚡ Boom! ${taskTitle} completed!`,
          `🌈 Awesome work! ${taskTitle} done!`,
        ];
    }
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCelebrationMessage(randomMessage);
    setShowCelebration(true);

    // Auto-hide celebration after duration based on type
    const duration = type === 'bigwin' || type === 'streak' ? 5000 : type === 'subtask' ? 2000 : 3000;
    setTimeout(() => {
      setShowCelebration(false);
    }, duration);
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
    celebrationType,
    celebrate,
  };
};
