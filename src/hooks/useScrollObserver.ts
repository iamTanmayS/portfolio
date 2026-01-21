import { useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';

interface ScrollObserverOptions {
    threshold?: number;
    rootMargin?: string;
}

export function useScrollObserver(options: ScrollObserverOptions = {}) {
    const { setActiveSection } = useApp();
    const { threshold = 0, rootMargin = '-10% 0px -80% 0px' } = options;
    const observerRef = useRef<IntersectionObserver | null>(null);

    const observe = useCallback((elements: Element[]) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('data-section');
                        if (sectionId) {
                            setActiveSection(sectionId);
                        }
                    }
                });
            },
            { threshold, rootMargin }
        );

        elements.forEach((el) => {
            observerRef.current?.observe(el);
        });
    }, [setActiveSection, threshold, rootMargin]);

    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return { observe };
}

export function useSectionObserver() {
    const { observe } = useScrollObserver();

    useEffect(() => {
        // Wait for DOM to be ready
        const timeout = setTimeout(() => {
            const sections = document.querySelectorAll('[data-section]');
            if (sections.length > 0) {
                observe(Array.from(sections));
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [observe]);
}

// Hook to get scroll direction
export function useScrollDirection() {
    const lastScrollY = useRef(0);
    const scrollDirection = useRef<'up' | 'down'>('down');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollDirection;
}
