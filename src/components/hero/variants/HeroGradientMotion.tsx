import { motion } from 'framer-motion';

/**
 * Hero Variant 2: Animated Grid × Bold Typography
 * 
 * Creates visual rhythm and structure with strong typography focus.
 * Features:
 * - Infinite diagonal grid drift animation
 * - Pure grid lines (no shapes, no noise)
 * - Bold centered statement
 * - Architectural, precise feel
 */
export function HeroAnimatedGrid() {

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
      {/* Typography Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Bold Statement */}
        <h2
          style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 700,
            fontFamily: "'Outfit', system-ui, sans-serif",
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          I design{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #67e8f9 50%, #f9a8d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            systems
          </span>
          ,
          <br />
          not screens.
        </h2>

        {/* Subline */}
        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#71717a',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          Architecture with intent. Engineering with taste.
        </p>
      </motion.div>
    </motion.div>
  );
}
