import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Wifi } from 'lucide-react';

import { ContactForm } from './contact/ContactForm';
import { SocialGrid } from './contact/SocialGrid';
import { Footer } from './contact/Footer';
import { useMotion } from '../context/AppContext';
import { staggerContainer, staggerItem, springs } from '../animations';

export function Contact() {
  const { prefersReducedMotion } = useMotion();
  const [time, setTime] = useState('');

  // Update local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      data-section="contact"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        background: '#0a0a0f',
        marginLeft: 'calc(-50vw + 50%)',
        paddingTop: 128,
        overflow: 'hidden',
      }}
    >
      {/* Background Ambience */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at 50% 10%, rgba(167, 139, 250, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} 
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          style={{ marginBottom: 80, textAlign: 'center' }}
        >
          {/* Status Badge */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 12, 
            padding: '8px 16px', 
            background: 'rgba(52, 211, 153, 0.1)', 
            borderRadius: 9999,
            border: '1px solid rgba(52, 211, 153, 0.2)',
            marginBottom: 32,
          }}>
            <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
              <motion.span 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399' }}
              />
              <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#34d399' }}>
              Available for new projects
            </span>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(40px, 8vw, 80px)', 
            fontWeight: 700, 
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 24,
            fontFamily: "'Outfit', system-ui, sans-serif"
          }}>
            Let's work together
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#71717a' }}>
            <span style={{ fontSize: 14 }}>Local time: {time}</span>
          </div>
        </motion.div>


        {/* Content Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: 48, // Reduced gap for massive displays
            maxWidth: 1000,
            margin: '0 auto'
          }}
        >
          {/* Left: Form */}
          <div style={{ flex: 1 }}>
             <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
               <div style={{ width: 24, height: 1, background: '#a78bfa' }} />
               Send a message
             </h3>
             <ContactForm />
          </div>

          {/* Right: Social */}
          <div style={{ flex: 0.8 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
               <div style={{ width: 24, height: 1, background: '#67e8f9' }} />
               Socials
             </h3>
            <SocialGrid />
          </div>
        </div>

      </div>

      <Footer />
    </section>
  );
}
