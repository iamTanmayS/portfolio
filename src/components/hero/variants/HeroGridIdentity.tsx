import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { identity } from '../../../data/about';
import { useMotion } from '../../../context/AppContext';
import { staggerContainer, staggerItem, springs } from '../../../animations';

/**
 * Hero Variant 1: Grid × Identity
 * 
 * Establishes identity, structure, and calm confidence.
 * Features:
 * - Animated grid lines background
 * - Subtle gradient base
 * - Staggered text reveal
 * - Cursor proximity glow
 */
export function HeroGridIdentity() {
  const { prefersReducedMotion } = useMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Cursor proximity glow
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const smoothGlowX = useSpring(glowX, springs.gentle);
  const smoothGlowY = useSpring(glowY, springs.gentle);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated Grid Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Horizontal grid lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.08,
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0%"
              x2="100%"
              y1={`${(i + 1) * 5}%`}
              y2={`${(i + 1) * 5}%`}
              stroke="url(#gridGradient)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0.5 } : {
                opacity: [0.3, 0.6, 0.3],
                y1: [`${(i + 1) * 5}%`, `${(i + 1) * 5 + 0.5}%`, `${(i + 1) * 5}%`],
                y2: [`${(i + 1) * 5}%`, `${(i + 1) * 5 + 0.5}%`, `${(i + 1) * 5}%`],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
            />
          ))}
          {/* Vertical grid lines */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${(i + 1) * 3.33}%`}
              x2={`${(i + 1) * 3.33}%`}
              y1="0%"
              y2="100%"
              stroke="url(#gridGradient)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0.3 } : {
                opacity: [0.2, 0.5, 0.2],
                x1: [`${(i + 1) * 3.33}%`, `${(i + 1) * 3.33 + 0.3}%`, `${(i + 1) * 3.33}%`],
                x2: [`${(i + 1) * 3.33}%`, `${(i + 1) * 3.33 + 0.3}%`, `${(i + 1) * 3.33}%`],
              }}
              transition={{
                duration: 10 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.05,
              }}
            />
          ))}
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle gradient orbs */}
      <motion.div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'rgba(167, 139, 250, 0.06)',
          filter: 'blur(100px)',
          top: '10%',
          left: '20%',
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'rgba(103, 232, 249, 0.05)',
          filter: 'blur(80px)',
          bottom: '15%',
          right: '15%',
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Cursor proximity glow */}
      <motion.div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          x: smoothGlowX,
          y: smoothGlowY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 900,
          padding: '0 24px',
          textAlign: 'center',
        }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div
          variants={staggerItem}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            marginBottom: 32,
            background: 'rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(52, 211, 153, 0.2)',
            borderRadius: 9999,
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#34d399',
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span style={{ fontSize: 14, color: '#34d399', fontWeight: 500 }}>
            {identity.status}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={staggerItem}
          style={{
            fontSize: 'clamp(48px, 10vw, 80px)',
            fontWeight: 700,
            fontFamily: "'Outfit', system-ui, sans-serif",
            lineHeight: 1.1,
            marginBottom: 16,
            color: '#fff',
          }}
        >
          {identity.name}
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={staggerItem}
          style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 500,
            marginBottom: 32,
          }}
        >
          <span className="text-gradient">{identity.role}</span>
        </motion.p>

        {/* Philosophy */}
        <motion.p
          variants={staggerItem}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#a1a1aa',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          {identity.philosophy}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
