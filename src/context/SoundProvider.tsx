import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import type { SoundType } from '../hooks/useSoundEffects';

// ================================
// Types
// ================================
interface SoundContextType {
  playSound: (type: SoundType) => void;
  isMuted: boolean;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
}

// ================================
// Context
// ================================
const SoundContext = createContext<SoundContextType | undefined>(undefined);

// ================================
// Provider
// ================================
interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const { playSound: playSoundEffect } = useSoundEffects(isMuted);

  const playSound = (type: SoundType) => {
    if (!isMuted) {
      playSoundEffect(type);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const setMuted = (muted: boolean) => {
    setIsMuted(muted);
  };

  const value: SoundContextType = {
    playSound,
    isMuted,
    toggleMute,
    setMuted,
  };

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

// ================================
// Hook
// ================================
export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
