import {useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorHandlers } from '../cursor/CustomCursor';

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'glow';
  showTooltip?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function IconButton({
  icon,
  label,
  onClick,
  href,
  external = false,
  size = 'md',
  variant = 'default',
  showTooltip = true,
  className = '',
}: IconButtonProps) {
  const cursorHandlers = useCursorHandlers('button');
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.span
      className={`
        relative inline-flex items-center justify-center
        rounded-full
        ${sizeClasses[size]}
        ${variant === 'default' 
          ? 'bg-dark-600/50 border border-zinc-700 hover:border-pastel-purple/50 hover:bg-dark-500/50' 
          : 'bg-gradient-to-br from-pastel-purple/20 to-pastel-cyan/20 border border-pastel-purple/30 hover:shadow-glow-sm'
        }
        text-zinc-400 hover:text-white
        transition-all duration-200
        ${className}
      `}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...cursorHandlers}
    >
      <span className={iconSizeClasses[size]}>{icon}</span>
      
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 
              px-2 py-1 text-xs font-medium
              bg-dark-700 text-white rounded-md
              border border-zinc-700
              whitespace-nowrap z-50"
          >
            {label}
            {/* Arrow */}
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 
              w-2 h-2 bg-dark-700 border-l border-t border-zinc-700
              rotate-45" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} aria-label={label} className="focus:outline-none">
      {content}
    </button>
  );
}
