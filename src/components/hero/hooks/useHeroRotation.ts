import { useState, useEffect, useCallback } from 'react';
import { useMotion } from '../../../context/AppContext';

interface UseHeroRotationOptions {
    variants: number;
    interval?: number;
    pauseOnInteraction?: boolean;
}

interface UseHeroRotationReturn {
    currentVariant: number;
    setVariant: (index: number) => void;
    isPaused: boolean;
    pause: () => void;
    resume: () => void;
    next: () => void;
    previous: () => void;
}

/**
 * Hook for managing hero variant auto-rotation
 * 
 * Features:
 * - Auto-cycles through variants at specified interval
 * - Pauses on reduced motion preference
 * - Manual override support
 * - Clean teardown on unmount
 */
export function useHeroRotation({
    variants,
    interval = 5000,
    pauseOnInteraction = true,
}: UseHeroRotationOptions): UseHeroRotationReturn {
    const { prefersReducedMotion } = useMotion();
    const [currentVariant, setCurrentVariant] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [userPaused, setUserPaused] = useState(false);

    // Auto-rotation effect
    useEffect(() => {
        // Don't rotate if reduced motion or paused
        if (prefersReducedMotion || isPaused || userPaused) return;

        const timer = setInterval(() => {
            setCurrentVariant((prev) => (prev + 1) % variants);
        }, interval);

        return () => clearInterval(timer);
    }, [variants, interval, prefersReducedMotion, isPaused, userPaused]);

    // Manual variant selection
    const setVariant = useCallback((index: number) => {
        if (index >= 0 && index < variants) {
            setCurrentVariant(index);
            if (pauseOnInteraction) {
                setUserPaused(true);
                // Resume after 10 seconds of no interaction
                setTimeout(() => setUserPaused(false), 10000);
            }
        }
    }, [variants, pauseOnInteraction]);

    // Navigation helpers
    const next = useCallback(() => {
        setCurrentVariant((prev) => (prev + 1) % variants);
    }, [variants]);

    const previous = useCallback(() => {
        setCurrentVariant((prev) => (prev - 1 + variants) % variants);
    }, [variants]);

    // Pause/resume controls
    const pause = useCallback(() => setIsPaused(true), []);
    const resume = useCallback(() => {
        setIsPaused(false);
        setUserPaused(false);
    }, []);

    return {
        currentVariant,
        setVariant,
        isPaused: isPaused || userPaused || prefersReducedMotion,
        pause,
        resume,
        next,
        previous,
    };
}
