import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useMotion } from '../../context/AppContext';
import { staggerContainer, staggerItem, springs } from '../../animations';

export function AlbumIntro() {
  const { prefersReducedMotion } = useMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
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
        position: 'relative',
        width: '100vw',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Cursor proximity glow - warm, personal feel */}
      <motion.div
        style={{
          position: 'absolute',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 168, 212, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          x: smoothGlowX,
          y: smoothGlowY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Background gradient - warm, emotional */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(249, 168, 212, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
        animate={prefersReducedMotion ? {} : {
          background: [
            'radial-gradient(ellipse at 50% 60%, rgba(249, 168, 212, 0.04) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 40%, rgba(253, 186, 116, 0.04) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 60%, rgba(249, 168, 212, 0.04) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        style={{ 
          position: 'relative', 
          zIndex: 10,
          maxWidth: 700,
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
        {/* Icon badge */}
        <motion.div
          variants={staggerItem}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            marginBottom: 32,
            background: 'rgba(249, 168, 212, 0.08)',
            border: '1px solid rgba(249, 168, 212, 0.15)',
            borderRadius: 9999,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Camera style={{ width: 16, height: 16, color: '#f9a8d4' }} />
          <span style={{ fontSize: 14, color: '#fbcfe8', fontWeight: 500 }}>
            Life & Moments
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={staggerItem}
          style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 700,
            fontFamily: "'Outfit', system-ui, sans-serif",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          <span className="text-gradient">Album</span>
        </motion.h2>

        {/* Framing line */}
        <motion.p
          variants={staggerItem}
          style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#a1a1aa',
            maxWidth: 550,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Beyond the code—moments, milestones, and memories that shaped the journey. 
          There's a human behind every commit.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
