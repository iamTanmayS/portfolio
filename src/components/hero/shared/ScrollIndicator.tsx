import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useMotion } from '../../../context/AppContext';

/**
 * Scroll indicator at bottom of hero
 * Subtle animation prompting users to scroll
 */
export function ScrollIndicator() {
  const { prefersReducedMotion } = useMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
      }}
    >
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: '#52525b',
        }}
      >
        <span
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 500,
          }}
        >
          Scroll to explore
        </span>
        <ArrowDown style={{ width: 16, height: 16, opacity: 0.7 }} />
      </motion.div>
    </motion.div>
  );
}
