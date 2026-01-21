import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useCursor, useMotion } from '../../context/AppContext';

export function CustomCursor() {
  const { cursor, setCursorType, updateCursorPosition, isTouchDevice } = useCursor();
  const { prefersReducedMotion } = useMotion();
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Faster following for inner dot
  const springConfig = { damping: 25, stiffness: 400 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  
  // Slower, smoother following for outer ring
  const ringSpringConfig = { damping: 20, stiffness: 150 };
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);
  
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

    const handleMouseLeave = () => {
      // Hide cursor when mouse leaves window
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isTouchDevice, updatePosition]);

  // Don't render on touch devices or with reduced motion
  if (isTouchDevice) return null;

  // Cursor size variants based on type
  const getDotSize = () => {
    switch (cursor.type) {
      case 'button': return 60;
      case 'link': return 40;
      case 'text': return 80;
      case 'hover': return 50;
      case 'hidden': return 0;
      default: return 12;
    }
  };

  const getRingSize = () => {
    switch (cursor.type) {
      case 'button': return 80;
      case 'link': return 60;
      case 'text': return 100;
      case 'hover': return 70;
      case 'hidden': return 0;
      default: return 40;
    }
  };

  const getColors = () => {
    switch (cursor.type) {
      case 'button':
        return {
          dot: 'rgba(167, 139, 250, 0.8)',
          ring: 'rgba(167, 139, 250, 0.3)',
        };
      case 'link':
        return {
          dot: 'rgba(103, 232, 249, 0.8)',
          ring: 'rgba(103, 232, 249, 0.3)',
        };
      case 'text':
        return {
          dot: 'rgba(249, 168, 212, 0.1)',
          ring: 'rgba(249, 168, 212, 0.3)',
        };
      default:
        return {
          dot: 'rgba(56, 219, 183, 0.9)',
          ring: 'rgba(167, 139, 250, 0.2)',
        };
    }
  };

  const dotSize = getDotSize();
  const ringSize = getRingSize();
  const colors = getColors();

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border-2 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderColor: colors.ring,
          backgroundColor: cursor.type === 'text' ? colors.dot : 'transparent',
        }}
        animate={{
          scale: cursor.type === 'hidden' ? 0 : 1,
          opacity: cursor.isVisible ? 1 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.2,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] rounded-full flex items-center justify-center"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          backgroundColor: cursor.type === 'text' ? 'transparent' : colors.dot,
        }}
        animate={{
          scale: cursor.type === 'hidden' ? 0 : 1,
          opacity: cursor.isVisible ? 1 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.15,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {/* Text label for text cursor type */}
        <AnimatePresence>
          {cursor.type === 'text' && cursor.text && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-xs font-medium text-white whitespace-nowrap"
            >
              {cursor.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
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
