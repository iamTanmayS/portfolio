import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useCursor, useMotion } from '../../context/AppContext';
import { staggerContainer, staggerItem, springs } from '../../animations';

export function ProjectsIntro() {
  const { prefersReducedMotion } = useMotion();
  const { cursor } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
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
        minHeight: '80vh',
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
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 168, 212, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: smoothGlowX,
          y: smoothGlowY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Background gradient */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 60%, rgba(167, 139, 250, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
        animate={prefersReducedMotion ? {} : {
          background: [
            'radial-gradient(ellipse at 30% 60%, rgba(167, 139, 250, 0.08) 0%, transparent 60%)',
            'radial-gradient(ellipse at 70% 40%, rgba(103, 232, 249, 0.08) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 60%, rgba(167, 139, 250, 0.08) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

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
        {/* Icon badge */}
        <motion.div
          variants={staggerItem}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            marginBottom: 32,
            background: 'rgba(167, 139, 250, 0.1)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            borderRadius: 9999,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Layers style={{ width: 16, height: 16, color: '#a78bfa' }} />
          <span style={{ fontSize: 14, color: '#c4b5fd', fontWeight: 500 }}>
            Selected Work
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={staggerItem}
          style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 700,
            fontFamily: "'Outfit', system-ui, sans-serif",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          <span className="text-gradient">Projects</span>
        </motion.h2>

        {/* Framing line */}
        <motion.p
          variants={staggerItem}
          style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            color: '#a1a1aa',
            maxWidth: 700,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          I build systems that solve real problems. Here's a selection of work 
          that demonstrates my approach to engineering and design.
        </motion.p>

        {/* Scroll indicator */}
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
              transition={{ duration: 1.5, repeat: Infinity }}
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
