import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor, useMotion } from '../../context/AppContext';

interface CursorGradientProps {
  className?: string;
}

export function CursorGradient({ className = '' }: CursorGradientProps) {
  const { cursor, isTouchDevice } = useCursor();
  const { prefersReducedMotion } = useMotion();
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth spring-based position
  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);
  
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;
    
    x.set(cursor.x);
    y.set(cursor.y);
  }, [cursor.x, cursor.y, x, y, isTouchDevice, prefersReducedMotion]);

  if (isTouchDevice) {
    // Static gradient for touch devices
    return (
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 20%, rgba(167, 139, 250, 0.15), transparent)',
        }}
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Primary gradient blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          x: useTransform(x, (val) => val - 300),
          y: useTransform(y, (val) => val - 300),
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Secondary glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          x: useTransform(x, (val) => val - 200),
          y: useTransform(y, (val) => val - 200),
          background: 'radial-gradient(circle, rgba(103, 232, 249, 0.1) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
