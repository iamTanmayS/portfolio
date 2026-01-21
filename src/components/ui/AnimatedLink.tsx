import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useCursorHandlers } from '../cursor/CustomCursor';

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  underlineColor?: 'purple' | 'cyan' | 'pink' | 'white';
}

const underlineColors = {
  purple: 'bg-pastel-purple',
  cyan: 'bg-pastel-cyan',
  pink: 'bg-pastel-pink',
  white: 'bg-white',
};

export function AnimatedLink({
  href,
  children,
  external = false,
  className = '',
  underlineColor = 'purple',
}: AnimatedLinkProps) {
  const cursorHandlers = useCursorHandlers('link');

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`
        relative inline-flex items-center gap-1
        text-zinc-300 hover:text-white
        transition-colors duration-200
        group
        ${className}
      `}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      {...cursorHandlers}
    >
      <span className="relative">
        {children}
        {/* Underline animation */}
        <span 
          className={`
            absolute -bottom-0.5 left-0 h-[2px] w-0
            ${underlineColors[underlineColor]}
            group-hover:w-full
            transition-all duration-300 ease-out
          `}
        />
      </span>
      
      {/* External link arrow */}
      {external && (
        <motion.svg
          className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
          viewBox="0 0 12 12"
          fill="none"
          initial={{ x: -5, y: 5 }}
          whileHover={{ x: 0, y: 0 }}
        >
          <path
            d="M3 9L9 3M9 3H4M9 3V8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      )}
    </motion.a>
  );
}
