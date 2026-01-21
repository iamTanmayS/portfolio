import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { resumeData } from '../data/resume';
import { useMotion } from '../context/AppContext';
import { useCursorHandlers } from '../components/cursor/CustomCursor';
import { springs, scrollReveal } from '../animations';

export function Resume() {
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('button');
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // Magnetic effect for button
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const smoothX = useSpring(magnetX, springs.magnetic);
  const smoothY = useSpring(magnetY, springs.magnetic);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    magnetX.set(x * 0.15);
    magnetY.set(y * 0.15);
  };
  
  const handleMouseLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  return (
    <section
      id="resume"
      data-section="resume"
      style={{
        position: 'relative',
        width: '100vw',
        padding: '100px 24px',
        background: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle gradient accent */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(167, 139, 250, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'rgba(167, 139, 250, 0.08)',
            border: '1px solid rgba(167, 139, 250, 0.15)',
          }}
        >
          <FileText style={{ width: 24, height: 24, color: '#a78bfa' }} />
        </motion.div>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            fontSize: 18,
            color: '#a1a1aa',
            lineHeight: 1.6,
          }}
        >
          Prefer a traditional overview?
        </motion.p>

        {/* CTA Button */}
        <motion.a
          ref={buttonRef}
          href={resumeData.pdfUrl}
          download={resumeData.fileName}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 28px',
            fontSize: 15,
            fontWeight: 600,
            color: '#0a0a0f',
            background: 'linear-gradient(135deg, #a78bfa 0%, #67e8f9 100%)',
            borderRadius: 12,
            textDecoration: 'none',
            overflow: 'hidden',
            x: smoothX,
            y: smoothY,
          }}
          {...cursorHandlers}
        >
          {/* Shimmer effect */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            }}
            animate={prefersReducedMotion ? {} : {
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          />
          
          <Download style={{ width: 18, height: 18, position: 'relative', zIndex: 1 }} />
          <span style={{ position: 'relative', zIndex: 1 }}>Download Resume</span>
        </motion.a>

        {/* Meta info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 13,
            color: '#52525b',
          }}
        >
          {resumeData.fileType} • Updated {resumeData.lastUpdated}
        </motion.p>
      </motion.div>
    </section>
  );
}
