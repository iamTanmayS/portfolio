import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor, useMotion } from '../../context/AppContext';

export function CustomCursor() {
  const { cursor, setCursorType, updateCursorPosition, isTouchDevice } = useCursor();
  const { prefersReducedMotion } = useMotion();
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Snappy following for precision
  const springConfig = { damping: 28, stiffness: 500 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  
  const animationFrameId = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    cursorX.set(mousePosition.current.x);
    cursorY.set(mousePosition.current.y);
    updateCursorPosition(mousePosition.current.x, mousePosition.current.y);
  }, [cursorX, cursorY, updateCursorPosition]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isTouchDevice, updatePosition]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  // More compact, UX-friendly sizes
  const getCursorConfig = () => {
    switch (cursor.type) {
      case 'button':
        return {
          dotSize: 6,
          ringSize: 28,
          ringOpacity: 0.4,
          dotColor: 'rgba(167, 139, 250, 1)',
          ringColor: 'rgba(167, 139, 250, 0.3)',
          scale: 1.2,
        };
      case 'link':
        return {
          dotSize: 4,
          ringSize: 24,
          ringOpacity: 0.35,
          dotColor: 'rgba(103, 232, 249, 1)',
          ringColor: 'rgba(103, 232, 249, 0.25)',
          scale: 1.1,
        };
      case 'hover':
        return {
          dotSize: 5,
          ringSize: 20,
          ringOpacity: 0.3,
          dotColor: 'rgba(167, 139, 250, 0.9)',
          ringColor: 'rgba(167, 139, 250, 0.2)',
          scale: 1,
        };
      case 'hidden':
        return {
          dotSize: 0,
          ringSize: 0,
          ringOpacity: 0,
          dotColor: 'transparent',
          ringColor: 'transparent',
          scale: 0,
        };
      default:
        return {
          dotSize: 4,
          ringSize: 0,
          ringOpacity: 0,
          dotColor: 'rgba(103, 232, 249, 1)',
          ringColor: 'transparent',
          scale: 1,
        };
    }
  };

  const config = getCursorConfig();

  return (
    <>
      {/* Outer Ring - Only visible on interactions */}
      {config.ringSize > 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border"
          style={{
            x: dotX,
            y: dotY,
            width: config.ringSize,
            height: config.ringSize,
            marginLeft: -config.ringSize / 2,
            marginTop: -config.ringSize / 2,
            borderColor: config.ringColor,
            borderWidth: 2,
          }}
          animate={{
            scale: cursor.type === 'hidden' ? 0 : config.scale,
            opacity: cursor.isVisible ? config.ringOpacity : 0,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      )}

      {/* Inner Dot - Precise cursor point */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: config.dotSize,
          height: config.dotSize,
          marginLeft: -config.dotSize / 2,
          marginTop: -config.dotSize / 2,
          backgroundColor: config.dotColor,
          boxShadow: `0 0 8px ${config.dotColor}`,
        }}
        animate={{
          scale: cursor.type === 'hidden' ? 0 : 1,
          opacity: cursor.isVisible ? 1 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.15,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </>
  );
}

// Hook to handle cursor interactions on elements
export function useCursorHandlers(type: 'button' | 'link' | 'text' | 'hover' = 'hover', text?: string) {
  const { setCursorType, isTouchDevice } = useCursor();

  if (isTouchDevice) {
    return {};
  }

  return {
    onMouseEnter: () => setCursorType(type, text),
    onMouseLeave: () => setCursorType('default'),
  };
}
