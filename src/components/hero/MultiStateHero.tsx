import { motion, AnimatePresence } from 'framer-motion';
import { useHeroRotation } from './hooks/useHeroRotation';
import { HeroGridIdentity, HeroAnimatedGrid, HeroKineticType } from './variants';
import { ScrollIndicator } from './shared/ScrollIndicator';
import { useMotion } from '../../context/AppContext';


// Hero variants array
const heroVariants = [
  { key: 'identity', Component: HeroGridIdentity },
  { key: 'grid', Component: HeroAnimatedGrid },
  { key: 'kinetic', Component: HeroKineticType },
];

// Transition configuration - smooth crossfade
const heroTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1] as const, // Smooth easing
};

/**
 * MultiStateHero
 * 
 * Main orchestrator for the multi-state hero system.
 * Features:
 * - Auto-rotates through 3 hero variants every 5 seconds
 * - Smooth cross-fade transitions
 * - Pauses on reduced motion preference
 * - Scroll indicator at bottom
 */
export function MultiStateHero() {
  const { prefersReducedMotion } = useMotion();
  
  const { currentVariant } = useHeroRotation({
    variants: heroVariants.length,
    interval: 5000,
    pauseOnInteraction: true,
  });

  const { key, Component } = heroVariants[currentVariant];

  return (
    <section
      id="hero"
      data-section="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        marginLeft: 'calc(-50vw + 50%)',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)',
      }}
    >
      {/* Infinite Animated Gradient Grid Background - CSS-based for reliability */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-100px',
          width: 'calc(100% + 200px)',
          height: 'calc(100% + 200px)',
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: `
            linear-gradient(to right, rgba(167, 139, 250, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(103, 232, 249, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          filter: 'drop-shadow(0 0 3px rgba(167, 139, 250, 0.4)) drop-shadow(0 0 6px rgba(103, 232, 249, 0.3))',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, 60],
          y: [0, 60],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Glow overlay for grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Centered text content (full width) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Component />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Constant Lanyard 3D card - positioned on right side */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'auto',
        }}
      >
        
      </div>

      {/* Variant indicators */}
      {!prefersReducedMotion && (
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
            zIndex: 20,
          }}
        >
          {heroVariants.map((_, index) => (
            <motion.div
              key={index}
              style={{
                width: currentVariant === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: currentVariant === index 
                  ? 'rgba(167, 139, 250, 0.8)' 
                  : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
              }}
              animate={{
                scale: currentVariant === index ? 1 : 0.9,
              }}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 150,
          background: 'linear-gradient(to top, #0a0a0f 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />
    </section>
  );
}
