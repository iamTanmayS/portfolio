import { useCallback, useRef, useEffect } from 'react';

// ================================
// Types
// ================================
export type SoundType = 'click' | 'hover' | 'transition' | 'success' | 'error';

interface SoundConfig {
    frequency: number;
    duration: number;
    type: OscillatorType;
    volume: number;
}

// ================================
// Sound Configurations
// ================================
const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
    click: {
        frequency: 800,
        duration: 50,
        type: 'sine',
        volume: 0.15,
    },
    hover: {
        frequency: 1200,
        duration: 30,
        type: 'sine',
        volume: 0.08,
    },
    transition: {
        frequency: 600,
        duration: 200,
        type: 'sine',
        volume: 0.1,
    },
    success: {
        frequency: 1000,
        duration: 150,
        type: 'triangle',
        volume: 0.12,
    },
    error: {
        frequency: 400,
        duration: 100,
        type: 'sawtooth',
        volume: 0.15,
    },
};

// ================================
// Hook
// ================================
export function useSoundEffects(globalMuted: boolean = false) {
    const audioContextRef = useRef<AudioContext | null>(null);
    const lastPlayTimeRef = useRef<{ [key in SoundType]?: number }>({});

    // Minimum time between same sound (prevent spam)
    const MIN_INTERVAL = 100; // ms

    // ================================
    // Initialize Audio Context
    // ================================
    useEffect(() => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    // ================================
    // Play Sound
    // ================================
    const playSound = useCallback(
        (type: SoundType) => {
            if (globalMuted || !audioContextRef.current) return;

            // Throttle repeated sounds
            const now = Date.now();
            const lastPlayTime = lastPlayTimeRef.current[type] || 0;
            if (now - lastPlayTime < MIN_INTERVAL) return;
            lastPlayTimeRef.current[type] = now;

            const config = SOUND_CONFIGS[type];
            const ctx = audioContextRef.current;

            // Resume context if suspended (autoplay policy)
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            // Create nodes
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            // Configure oscillator
            oscillator.type = config.type;
            oscillator.frequency.setValueAtTime(config.frequency, ctx.currentTime);

            // Configure envelope (fade in/out for smoothness)
            const attackTime = 0.01; // 10ms attack
            const releaseTime = config.duration / 1000 - attackTime;

            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(config.volume, ctx.currentTime + attackTime);
            gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + config.duration / 1000);

            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Play
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + config.duration / 1000);
        },
        [globalMuted]
    );

    // ================================
    // Convenience Methods
    // ================================
    const click = useCallback(() => playSound('click'), [playSound]);
    const hover = useCallback(() => playSound('hover'), [playSound]);
    const transition = useCallback(() => playSound('transition'), [playSound]);
    const success = useCallback(() => playSound('success'), [playSound]);
    const error = useCallback(() => playSound('error'), [playSound]);

    return {
        playSound,
        click,
        hover,
        transition,
        success,
        error,
    };
}
