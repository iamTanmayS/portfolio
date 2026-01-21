import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '../components/ui';
import { CursorGradient } from '../components/cursor';
import { useCursorHandlers } from '../components/cursor/CustomCursor';
import { staggerContainer, staggerItem } from '../animations';

export function Hero() {
  const sparkleHandlers = useCursorHandlers('hover');

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      data-section="hero"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginLeft: 'calc(-50vw + 50%)', // Center full-bleed
      }}
    >
      {/* Cursor-reactive background gradient */}
      <CursorGradient />

      {/* Ambient floating orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'rgba(167, 139, 250, 0.08)',
            filter: 'blur(100px)',
            top: '10%',
            left: '15%',
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(103, 232, 249, 0.06)',
            filter: 'blur(80px)',
            bottom: '15%',
            right: '10%',
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(249, 168, 212, 0.05)',
            filter: 'blur(60px)',
            top: '35%',
            right: '25%',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1100,
          margin: '0 auto',
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
            background: 'rgba(167, 139, 250, 0.1)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            borderRadius: 9999,
            backdropFilter: 'blur(8px)',
          }}
          {...sparkleHandlers}
        >
          <Sparkles style={{ width: 16, height: 16, color: '#a78bfa' }} />
          <span style={{ fontSize: 14, color: '#c4b5fd', fontWeight: 500 }}>
            Available for new projects
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={staggerItem}
          style={{
            fontSize: 'clamp(48px, 10vw, 96px)',
            fontWeight: 700,
            fontFamily: "'Outfit', system-ui, sans-serif",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          <span style={{ color: '#fff' }}>I craft </span>
          <span className="text-gradient">digital</span>
          <br />
          <span className="text-gradient">experiences</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={staggerItem}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#a1a1aa',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Frontend developer specializing in React, motion design, and creating 
          interfaces that feel alive. Building products that users love.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <Button variant="primary" size="lg" onClick={scrollToProjects}>
            View My Work
          </Button>
          <Button variant="secondary" size="lg" onClick={scrollToContact}>
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: '#71717a',
          }}
        >
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Scroll
          </span>
          <ArrowDown style={{ width: 16, height: 16 }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
