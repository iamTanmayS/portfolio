import { motion } from 'framer-motion';
import { useMotion } from '../../../context/AppContext';

/**
 * Hero Variant 3: Kinetic Typography
 * 
 * Editorial, bold, memorable.
 * Features:
 * - Pure typography focus
 * - Subtle letter-spacing animation
 * - Minimal, meditative motion
 * - No visual elements, no shapes
 */
export function HeroKineticType() {
  const { prefersReducedMotion } = useMotion();

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow - just one, minimal */}
      <div
        style={{
          position: 'absolute',
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse, rgba(167, 139, 250, 0.04) 0%, transparent 70%)',
          top: '30%',
          left: '20%',
          pointerEvents: 'none',
        }}
      />

      {/* Kinetic Typography Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 1000,
        }}
      >
        {/* Main kinetic text */}
        <motion.h2
          style={{
            fontSize: 'clamp(36px, 7vw, 64px)',
            fontWeight: 600,
            fontFamily: "'Outfit', system-ui, sans-serif",
            lineHeight: 1.3,
            color: '#fff',
            marginBottom: 32,
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            animate={prefersReducedMotion ? {} : {
              letterSpacing: ['0em', '0.02em', '0em'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Frontend
          </motion.span>{' '}
          <motion.span
            style={{ 
              display: 'inline-block',
              color: '#a1a1aa',
            }}
            animate={prefersReducedMotion ? {} : {
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            systems
          </motion.span>{' '}
          <motion.span
            style={{ display: 'inline-block' }}
            animate={prefersReducedMotion ? {} : {
              letterSpacing: ['0em', '0.015em', '0em'],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          >
            that
          </motion.span>
          <br />
          <motion.span
            style={{ 
              display: 'inline-block',
              background: 'linear-gradient(135deg, #a78bfa 0%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={prefersReducedMotion ? {} : {
              letterSpacing: ['-0.01em', '0.01em', '-0.01em'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            scale
          </motion.span>
          <motion.span
            style={{ 
              display: 'inline-block',
              color: '#52525b',
            }}
            animate={prefersReducedMotion ? {} : {
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          >
            —technically
          </motion.span>
          <br />
          <motion.span
            style={{ 
              display: 'inline-block',
              color: '#71717a',
              fontWeight: 400,
            }}
            animate={prefersReducedMotion ? {} : {
              letterSpacing: ['0.01em', '0.03em', '0.01em'],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          >
            and mentally.
          </motion.span>
        </motion.h2>

        {/* Minimal footer text */}
        <motion.p
          animate={prefersReducedMotion ? {} : {
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fontSize: 14,
            color: '#52525b',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 500,
          }}
        >
          Crafted with intention
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
