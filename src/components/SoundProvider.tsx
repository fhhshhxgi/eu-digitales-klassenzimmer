import React, { createContext, useContext, useCallback } from 'react';
import useSound from 'use-sound';

interface SoundContextType {
  playClick: () => void;
  playHero: () => void;
  playGroupSelect: () => void;
  playTutorialStep: () => void;
  playSecurityNode: () => void;
  playEscalation: () => void;
  playSuccess: () => void;
  playAudioCheck: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Dezenter Klick für spezifische Aktionen
const CLICK_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
// Soundeffekt für den Hero-Bereich
const CLICK_SOUND_HERO= 'https://assets.mixkit.co/active_storage/sfx/2672/2672-preview.mp3'
// Sound für die Gruppenauswahl
const GROUP_SELECT_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/565/565-preview.mp3';
// Sound für Tutorial-Schritte
const TUTORIAL_STEP_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/900/900-preview.mp3';
// Sound für Sicherheits-Knotenpunkte
const SECURITY_NODE_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/913/913-preview.mp3';
// Eskalations-Warnsound
const ESCALATION_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/552/552-preview.mp3';
// Minimaler Klicksound für Standard-Buttons
const GENERAL_CLICK_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
// Erfolgs-Jingle
const SUCCESS_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3';
const AUDIO_CHECK_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2303/2303-preview.mp3';

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: 0.25, interrupt: true });
  const [playHero] = useSound(CLICK_SOUND_HERO, { volume: 0.25, interrupt: true});
  const [playGroupSelect] = useSound(GROUP_SELECT_SOUND_URL, { volume: 0.15, interrupt: true });
  const [playTutorialStep] = useSound(TUTORIAL_STEP_SOUND_URL, { volume: 0.15, interrupt: true });
  const [playSecurityNode] = useSound(SECURITY_NODE_SOUND_URL, { volume: 0.4, interrupt: true });
  const [playEscalation] = useSound(ESCALATION_SOUND_URL, { volume: 0.45, interrupt: true });
  const [playGeneralClick] = useSound(GENERAL_CLICK_SOUND_URL, { volume: 0.1, interrupt: true });
  const [playSuccess] = useSound(SUCCESS_SOUND_URL, { volume: 0.2, interrupt: true });
  const [playAudioCheck] = useSound(AUDIO_CHECK_SOUND_URL, { volume: 0.4, interrupt: true });

  const handleClick = useCallback((e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('button, a, [role="button"], .cursor-pointer');
    if (target) {
      // Ausschluss von Elementen mit eigenem Trigger
      const isSpecial = target.textContent?.includes('Archiv öffnen') || 
                        target.querySelector('svg.lucide-x') || 
                        target.closest('.council-simulator'); // Vermeidung von Doppel-Triggern im Simulator-Toggle
      
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
    <SoundContext.Provider value={{ playClick, playHero, playGroupSelect, playTutorialStep, playSecurityNode, playEscalation, playSuccess, playAudioCheck }}>
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
