import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
// ================================
// Types
// ================================
export type CursorType = 'default' | 'hover' | 'button' | 'link' | 'text' | 'hidden';

export interface CursorState {
  x: number;
  y: number;
  type: CursorType;
  text?: string;
  isVisible: boolean;
}

export interface SectionMeta {
  id: string;
  title: string;
  accent: 'purple' | 'cyan' | 'pink';
  navLabel: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface AppContextType {
  // Cursor
  cursor: CursorState;
  setCursorType: (type: CursorType, text?: string) => void;
  updateCursorPosition: (x: number, y: number) => void;
  
  // Active Section
  activeSection: string;
  setActiveSection: (id: string) => void;
  
  // Sections Metadata
  sections: SectionMeta[];
  
  // Reduced Motion
  prefersReducedMotion: boolean;
  
  // Touch Device
  isTouchDevice: boolean;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
  dismissToast: (id: string) => void;
  
  // Navbar
  isNavExpanded: boolean;
  setNavExpanded: (expanded: boolean) => void;
}

// ================================
// Default Values
// ================================
const defaultSections: SectionMeta[] = [
  { id: 'home', title: 'Home', accent: 'cyan', navLabel: 'Home' },
  { id: 'projects', title: 'Projects', accent: 'pink', navLabel: 'Projects' },
  { id: 'blogs', title: 'Writing', accent: 'cyan', navLabel: 'Writing' },
  { id: 'album', title: 'Album', accent: 'pink', navLabel: 'Album' },
  { id: 'contact', title: 'Contact', accent: 'purple', navLabel: 'Contact' },
];

const defaultCursor: CursorState = {
  x: 0,
  y: 0,
  type: 'default',
  isVisible: false,
};

// ================================
// Context
// ================================
const AppContext = createContext<AppContextType | undefined>(undefined);

// ================================
// Provider
// ================================
export function AppProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<CursorState>(defaultCursor);
  const [activeSection, setActiveSection] = useState('home');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isNavExpanded, setNavExpanded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
    window.addEventListener('touchstart', () => setIsTouchDevice(true), { once: true });
  }, []);

  // Cursor methods
  const setCursorType = useCallback((type: CursorType, text?: string) => {
    setCursor(prev => ({ ...prev, type, text }));
  }, []);

  const updateCursorPosition = useCallback((x: number, y: number) => {
    setCursor(prev => ({ ...prev, x, y, isVisible: true }));
  }, []);

  // Toast methods
  const showToast = useCallback((message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = { id, message, type, duration };
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const value: AppContextType = {
    cursor,
    setCursorType,
    updateCursorPosition,
    activeSection,
    setActiveSection,
    sections: defaultSections,
    prefersReducedMotion,
    isTouchDevice,
    toasts,
    showToast,
    dismissToast,
    isNavExpanded,
    setNavExpanded,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ================================
// Hook
// ================================
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Convenience hooks
export const useCursor = () => {
  const { cursor, setCursorType, updateCursorPosition, isTouchDevice } = useApp();
  return { cursor, setCursorType, updateCursorPosition, isTouchDevice };
};

export const useSection = () => {
  const { activeSection, setActiveSection, sections } = useApp();
  return { activeSection, setActiveSection, sections };
};

export const useToast = () => {
  const { toasts, showToast, dismissToast } = useApp();
  return { toasts, showToast, dismissToast };
};

export const useMotion = () => {
  const { prefersReducedMotion } = useApp();
  return { prefersReducedMotion };
};

export const useNav = () => {
  const { isNavExpanded, setNavExpanded, activeSection, sections } = useApp();
  return { isNavExpanded, setNavExpanded, activeSection, sections };
};
