import React, { createContext, useContext, useCallback } from 'react';
import useSound from 'use-sound';

interface SoundContextType {
  playClick: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Subtle click for specific actions
const CLICK_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
// Minimal tick for other buttons
const GENERAL_CLICK_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
// The success jingle you liked
const SUCCESS_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3';

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: 0.1, interrupt: true });
  const [playGeneralClick] = useSound(GENERAL_CLICK_SOUND_URL, { volume: 0.05, interrupt: true });
  const [playSuccess] = useSound(SUCCESS_SOUND_URL, { volume: 0.15, interrupt: true });

  const handleClick = useCallback((e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('button, a, [role="button"], .cursor-pointer');
    if (target) {
      // Check if it's NOT the ones having their own manual trigger
      const isSpecial = target.textContent?.includes('Archiv öffnen') || 
                        target.querySelector('svg.lucide-x') || 
                        target.closest('.council-simulator'); // Avoid double triggers in simulator toggle
      
      if (!isSpecial) {
        playGeneralClick();
      }
    }
  }, [playGeneralClick]);

  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <SoundContext.Provider value={{ playClick, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSounds must be used within a SoundProvider');
  }
  return context;
};
