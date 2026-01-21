import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { useMotion } from '../../context/AppContext';

// Omit conflicting props from HTMLAttributes
interface GlowCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'style'>, MotionProps {
  children: React.ReactNode;
  style?: any; // Allow Motion styles
  /**
   * The glow color. Defaults to purple/blue mix if handled by CSS, 
   * or provide a specific hex/rgba.
   */
  glowColor?: string;
  className?: string;
  /**
   * Border radius in px. Defaults to 16.
   */
  borderRadius?: number;
}

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(({ 
  children, 
  glowColor = "#a78bfa", 
  className = "", 
  borderRadius = 16,
  style,
  ...props 
}, ref) => {
  const { prefersReducedMotion } = useMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    
    // Chain external handler if provided
    props.onMouseMove?.(e);
  }

  // Define mask for the glow effect
  const maskImage = useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const styleWithGlow = { maskImage, WebkitMaskImage: maskImage };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative border border-white/10 bg-[#181820]/80 overflow-hidden ${className}`}
      style={{ 
        borderRadius: borderRadius as number | string,
        ...style 
      }}
      {...props}
    >
      {/* Glow effect layer - Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={styleWithGlow}
      >
        {/* The gradient border itself (Spotlight) */}
        <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 blur-sm"
            style={{ 
                background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}40, transparent 40%)`,
                zIndex: 0 
            }}
        />
        {/* Sharp border line (Spotlight) */}
        <div 
             className="absolute inset-0"
             style={{
                borderRadius,
                padding: '1px',
                background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                pointerEvents: 'none',
             }}
        />
      </motion.div>

      {/* Continuous "Beam" Border Effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
            borderRadius,
            padding: '2px', // Thicker border for prominence
            background: 'transparent',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
        }}
      >
         <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${glowColor} 310deg, ${glowColor} 360deg)`,
                opacity: 0.5, // Much more visible default state
            }}
            className="group-hover:opacity-100 transition-opacity duration-300"
         />
      </div>

      {/* Inner Content */}
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
});
