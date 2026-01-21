import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useMotion } from '../../context/AppContext';
import { staggerContainer, staggerItem, springs } from '../../animations';

export function BlogsIntro() {
  const { prefersReducedMotion } = useMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
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
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Cursor proximity glow - more muted than Projects */}
      <motion.div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          x: smoothGlowX,
          y: smoothGlowY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Background gradient - calmer, more muted */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(103, 232, 249, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
        animate={prefersReducedMotion ? {} : {
          background: [
            'radial-gradient(ellipse at 50% 60%, rgba(103, 232, 249, 0.04) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 40%, rgba(167, 139, 250, 0.05) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 60%, rgba(103, 232, 249, 0.04) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        style={{ 
          position: 'relative', 
          zIndex: 10,
          maxWidth: 800,
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
            background: 'rgba(103, 232, 249, 0.08)',
            border: '1px solid rgba(103, 232, 249, 0.15)',
            borderRadius: 9999,
            backdropFilter: 'blur(8px)',
          }}
        >
          <BookOpen style={{ width: 16, height: 16, color: '#67e8f9' }} />
          <span style={{ fontSize: 14, color: '#a5f3fc', fontWeight: 500 }}>
            Thoughts & Notes
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={staggerItem}
          style={{
            fontSize: 'clamp(40px, 7vw, 64px)',
            fontWeight: 700,
            fontFamily: "'Outfit', system-ui, sans-serif",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          <span className="text-gradient">Writing</span>
        </motion.h2>

        {/* Framing line */}
        <motion.p
          variants={staggerItem}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#a1a1aa',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Thoughts on systems, engineering, and learning. 
          I write to understand things better and share what I discover along the way.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          variants={staggerItem}
          style={{
            marginTop: 56,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: '#52525b',
          }}
        >
          <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Scroll to read
          </span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 24,
              height: 40,
              borderRadius: 12,
              border: '2px solid #3f3f46',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: 8,
            }}
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 4,
                height: 8,
                borderRadius: 2,
                background: '#71717a',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
