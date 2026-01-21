import { useRef, useState } from 'react';
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursorHandlers } from '../cursor/CustomCursor';
import { useMotion } from '../../context/AppContext';
import { springs } from '../../animations';

// ================================
// Types
// ================================
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// ================================
// Size Definitions
// ================================
const sizes: Record<ButtonSize, { padding: string; fontSize: string; height: number }> = {
  sm: { padding: '0 16px', fontSize: '14px', height: 36 },
  md: { padding: '0 24px', fontSize: '16px', height: 44 },
  lg: { padding: '0 32px', fontSize: '18px', height: 52 },
};

// ================================
// Component
// ================================
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const cursorHandlers = useCursorHandlers('button');
  const { prefersReducedMotion } = useMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Ripple state
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  // Magnetic effect
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, springs.magnetic);
  const springY = useSpring(magnetY, springs.magnetic);
  
  // Gradient position for primary
  const gradientX = useMotionValue(0);
  const springGradient = useSpring(gradientX, { stiffness: 100, damping: 20 });
  const backgroundPosition = useTransform(springGradient, [-1, 1], ['0% 50%', '100% 50%']);
  
  // Handle magnetic effect
  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || disabled) return;
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate offset (capped at 8px)
    const offsetX = Math.min(Math.max((e.clientX - centerX) * 0.15, -8), 8);
    const offsetY = Math.min(Math.max((e.clientY - centerY) * 0.15, -4), 4);
    
    magnetX.set(offsetX);
    magnetY.set(offsetY);
    
    // Gradient follows cursor for primary
    if (variant === 'primary') {
      const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      gradientX.set(normalizedX);
    }
  };
  
  const handleMouseLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
    gradientX.set(0);
  };
  
  // Ripple effect on click
  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Create ripple
    if (!prefersReducedMotion && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const id = Date.now();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setRipples(prev => [...prev, { id, x, y }]);
      
      // Remove after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    }
    
    onClick?.(e);
  };

  // ================================
  // Variant Styles
  // ================================
  const getVariantStyles = () => {
    const base = {
      borderRadius: '9999px',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      position: 'relative' as const,
      overflow: 'hidden',
      border: 'none',
      outline: 'none',
      ...sizes[size],
    };

    switch (variant) {
      case 'primary':
        return {
          ...base,
          background: 'linear-gradient(135deg, #a78bfa 0%, #67e8f9 50%, #f9a8d4 100%)',
          backgroundSize: '200% 100%',
          color: '#0a0a0f',
          boxShadow: `
            0 4px 15px rgba(167, 139, 250, 0.4),
            0 1px 3px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
        };
      case 'secondary':
        return {
          ...base,
          background: 'rgba(34, 34, 46, 0.8)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          border: '1px solid rgba(167, 139, 250, 0.3)',
          boxShadow: `
            0 4px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        };
      case 'ghost':
        return {
          ...base,
          background: 'transparent',
          color: '#a1a1aa',
          border: '1px solid #3f3f46',
          boxShadow: 'none',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled || isLoading}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...variantStyles,
        x: springX,
        y: springY,
        backgroundPosition: variant === 'primary' ? backgroundPosition : undefined,
      }}
      whileHover={prefersReducedMotion ? {} : {
        scale: 1.02,
        boxShadow: variant === 'primary' 
          ? '0 8px 30px rgba(167, 139, 250, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          : variant === 'secondary'
          ? '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
      whileTap={prefersReducedMotion ? {} : {
        scale: 0.97,
        boxShadow: variant === 'primary'
          ? '0 2px 10px rgba(167, 139, 250, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.2)'
          : '0 1px 5px rgba(0, 0, 0, 0.2)',
      }}
      transition={springs.snappy}
      className={className}
      {...cursorHandlers}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            borderRadius: '50%',
            background: variant === 'primary' 
              ? 'rgba(255, 255, 255, 0.4)' 
              : 'rgba(167, 139, 250, 0.3)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 400, height: 400, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Shine overlay for primary */}
      {variant === 'primary' && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Loading spinner */}
      {isLoading && (
        <motion.div
          style={{
            width: 16,
            height: 16,
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Icon left */}
      {icon && iconPosition === 'left' && !isLoading && (
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      )}

      {/* Label */}
      <span className="truncate max-w-full whitespace-nowrap">{children}</span>

      {/* Icon right */}
      {icon && iconPosition === 'right' && !isLoading && (
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      )}
    </motion.button>
  );
}
