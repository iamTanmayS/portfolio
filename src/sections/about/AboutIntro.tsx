import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { identity } from '../../data/about';
import { useCursor, useMotion } from '../../context/AppContext';
import { staggerContainer, staggerItem, springs } from '../../animations';

export function AboutIntro() {
  const { prefersReducedMotion } = useMotion();
  const { cursor } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Cursor proximity glow
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const smoothGlowX = useSpring(glowX, springs.gentle);
  const smoothGlowY = useSpring(glowY, springs.gentle);
  
  // Update glow position based on cursor
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
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Cursor proximity glow */}
      <motion.div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: smoothGlowX,
          y: smoothGlowY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Background gradient orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(103, 232, 249, 0.05)',
            filter: 'blur(100px)',
            top: '20%',
            right: '15%',
          }}
          animate={prefersReducedMotion ? {} : {
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(249, 168, 212, 0.04)',
            filter: 'blur(80px)',
            bottom: '25%',
            left: '20%',
          }}
          animate={prefersReducedMotion ? {} : {
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ 
          position: 'relative', 
          zIndex: 10,
          maxWidth: 900,
          padding: '0 24px',
          textAlign: 'center',
          y: prefersReducedMotion ? 0 : y,
          opacity: prefersReducedMotion ? 1 : opacity,
        }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Availability status */}
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

        {/* Scroll hint */}
        <motion.div
          variants={staggerItem}
          style={{
            marginTop: 64,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: '#52525b',
          }}
        >
          <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Scroll to explore
          </span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles style={{ width: 20, height: 20 }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
