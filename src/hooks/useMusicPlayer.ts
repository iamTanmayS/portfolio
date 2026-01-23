import { useState, useEffect, useRef, useCallback } from 'react';

// ================================
// Types
// ================================
export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface MusicPlayerState {
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
}

const FADE_DURATION = 1000; // 1 second fade
const STORAGE_KEY = 'portfolio_music_preferences';

// ================================
// Default Tracks
// ================================
const DEFAULT_TRACKS: Track[] = [
  {
    id: 'ambient-1',
    title: 'Ethereal Dreams',
    artist: 'Generated Ambient',
    url: '/audio/music/track1.mp3',
  },
  {
    id: 'ambient-2',
    title: 'Digital Horizons',
    artist: 'Generated Ambient',
    url: '/audio/music/track2.mp3',
  },
];

// ================================
// Hook
// ================================
export function useMusicPlayer(tracks: Track[] = DEFAULT_TRACKS) {
  const [state, setState] = useState<MusicPlayerState>({
    currentTrackIndex: 0,
    isPlaying: false,
    volume: 0.3, // 30% default volume
    isMuted: true, // Muted by default
    duration: 0,
    currentTime: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ================================
  // Initialize Audio Context
  // ================================
  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto';
      
      // Create audio context for advanced controls
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      const source = audioContextRef.current.createMediaElementSource(audioRef.current);
      gainNodeRef.current = audioContextRef.current.createGain();
      
      source.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
      
      // Set initial gain
      gainNodeRef.current.gain.value = 0;

      // Event listeners
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setState(prev => ({
            ...prev,
            currentTime: audioRef.current!.currentTime,
          }));
        }
      });

      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setState(prev => ({
            ...prev,
            duration: audioRef.current!.duration,
          }));
        }
      });

      audioRef.current.addEventListener('ended', () => {
        // Auto-play next track
        nextTrack();
      });
    }
  }, []);

  // ================================
  // Load Preferences from localStorage
  // ================================
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const prefs = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          volume: prefs.volume ?? prev.volume,
          isMuted: prefs.isMuted ?? prev.isMuted,
          currentTrackIndex: prefs.currentTrackIndex ?? prev.currentTrackIndex,
        }));
      }
    } catch (error) {
      console.error('Failed to load music preferences:', error);
    }
  }, []);

  // ================================
  // Save Preferences to localStorage
  // ================================
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          volume: state.volume,
          isMuted: state.isMuted,
          currentTrackIndex: state.currentTrackIndex,
        })
      );
    } catch (error) {
      console.error('Failed to save music preferences:', error);
    }
  }, [state.volume, state.isMuted, state.currentTrackIndex]);

  // ================================
  // Fade In/Out Utility
  // ================================
  const fadeVolume = useCallback(
    (targetVolume: number, duration: number = FADE_DURATION) => {
      if (!gainNodeRef.current || !audioContextRef.current) return;

      // Clear any existing fade
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      const currentGain = gainNodeRef.current.gain.value;
      const steps = 60; // 60 steps for smooth fade
      const stepDuration = duration / steps;
      const gainStep = (targetVolume - currentGain) / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        if (!gainNodeRef.current) return;

        currentStep++;
        const newGain = currentGain + gainStep * currentStep;
        gainNodeRef.current.gain.value = Math.max(0, Math.min(1, newGain));

        if (currentStep >= steps) {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
          }
          gainNodeRef.current.gain.value = targetVolume;

          // If fading to 0, pause the audio
          if (targetVolume === 0 && audioRef.current) {
            audioRef.current.pause();
          }
        }
      }, stepDuration);
    },
    []
  );

  // ================================
  // Play
  // ================================
  const play = useCallback(async () => {
    initializeAudio();

    if (!audioRef.current || !gainNodeRef.current) return;

    // Resume audio context if suspended (browser autoplay policy)
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    // Load track if not loaded
    const currentTrack = tracks[state.currentTrackIndex];
    if (audioRef.current.src !== currentTrack.url) {
      audioRef.current.src = currentTrack.url;
      await audioRef.current.load();
    }

    await audioRef.current.play();
    setState(prev => ({ ...prev, isPlaying: true }));

    // Fade in
    const targetVolume = state.isMuted ? 0 : state.volume;
    fadeVolume(targetVolume);
  }, [state.currentTrackIndex, state.isMuted, state.volume, tracks, initializeAudio, fadeVolume]);

  // ================================
  // Pause
  // ================================
  const pause = useCallback(() => {
    if (!audioRef.current) return;

    setState(prev => ({ ...prev, isPlaying: false }));

    // Fade out then pause
    fadeVolume(0);
  }, [fadeVolume]);

  // ================================
  // Toggle Play/Pause
  // ================================
  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  // ================================
  // Next Track
  // ================================
  const nextTrack = useCallback(() => {
    const nextIndex = (state.currentTrackIndex + 1) % tracks.length;
    setState(prev => ({ ...prev, currentTrackIndex: nextIndex, isPlaying: false }));
    
    // Auto-play next track if currently playing
    if (state.isPlaying) {
      // Small delay for smooth transition
      setTimeout(() => {
        play();
      }, 100);
    }
  }, [state.currentTrackIndex, state.isPlaying, tracks.length, play]);

  // ================================
  // Previous Track
  // ================================
  const previousTrack = useCallback(() => {
    const prevIndex = state.currentTrackIndex === 0 ? tracks.length - 1 : state.currentTrackIndex - 1;
    setState(prev => ({ ...prev, currentTrackIndex: prevIndex, isPlaying: false }));
    
    // Auto-play previous track if currently playing
    if (state.isPlaying) {
      setTimeout(() => {
        play();
      }, 100);
    }
  }, [state.currentTrackIndex, state.isPlaying, tracks.length, play]);

  // ================================
  // Set Volume
  // ================================
  const setVolume = useCallback(
    (volume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      setState(prev => ({ ...prev, volume: clampedVolume }));

      if (gainNodeRef.current && !state.isMuted && state.isPlaying) {
        gainNodeRef.current.gain.value = clampedVolume;
      }
    },
    [state.isMuted, state.isPlaying]
  );

  // ================================
  // Toggle Mute
  // ================================
  const toggleMute = useCallback(() => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));

    if (gainNodeRef.current && state.isPlaying) {
      const targetVolume = state.isMuted ? state.volume : 0;
      fadeVolume(targetVolume, 300); // Faster mute/unmute fade
    }
  }, [state.isMuted, state.volume, state.isPlaying, fadeVolume]);

  // ================================
  // Seek
  // ================================
  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  // ================================
  // Cleanup
  // ================================
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // ================================
  // Return
  // ================================
  return {
    // State
    currentTrack: tracks[state.currentTrackIndex],
    isPlaying: state.isPlaying,
    volume: state.volume,
    isMuted: state.isMuted,
    duration: state.duration,
    currentTime: state.currentTime,
    tracks,

    // Actions
    play,
    pause,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    toggleMute,
    seek,
  };
}
