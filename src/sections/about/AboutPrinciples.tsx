// ================================
// AboutPrinciples
// ================================
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as Icons from 'lucide-react';
import { principles } from '../../data/about';
import { useMotion } from '../../context/AppContext';
import { springs, staggerContainer, staggerItem } from '../../animations';
import { GlassIcons } from '../../components/ui/GlassIcons';
import { GlowCard } from '../../components/ui/GlowCard';
import './AboutPrinciples.css';

export function AboutPrinciples() {
  const { prefersReducedMotion } = useMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Map icon name to color for GlassIcons
  const getIconColor = (index: number) => {
    const colors = ['purple', 'blue', 'pink', 'orange', 'cyan', 'green'];
    return colors[index % colors.length];
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '80vh',
        padding: '128px 0',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#0a0a0f',
        overflow: 'hidden',
      }}
    >
       {/* Background Elements */}
       <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              fontFamily: "'Outfit', system-ui, sans-serif",
              marginBottom: 24,
            }}
          >
            <span className="text-gradient">How I Work</span>
          </h2>
          <p style={{ fontSize: 18, color: '#a1a1aa', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
             Core principles that guide my engineering decisions and problem-solving approach.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
          }}
        >
          {principles.map((principle, index) => {
             const IconComponent = Icons[principle.icon as keyof typeof Icons] as React.ComponentType<{ style?: React.CSSProperties }> || Icons.Lightbulb;
             
             return (
              <GlowCard
                key={principle.id}
                variants={staggerItem}
                borderRadius={24}
                style={{
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                }}
                whileHover={prefersReducedMotion ? {} : {
                  y: -5,
                }}
              >
                {/* Icon Wrapper using GlassIcons */}
                <div style={{ alignSelf: 'flex-start' }}>
                   <GlassIcons
                      items={[{
                        icon: <IconComponent style={{ width: '60%', height: '60%', color: '#fff' }} />,
                        color: getIconColor(index),
                        label: '',
                        customClass: 'principle-icon'
                      }]}
                      className="principle-glass-icon-wrapper"
                   />
                   {/* We only render one icon, and we want it to behave like a visual element, not a clickable list */}
                </div>

                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12, fontFamily: "'Outfit', system-ui, sans-serif" }}>
                    {principle.title}
                  </h3>
                  <p style={{ fontSize: 16, color: '#a1a1aa', lineHeight: 1.6 }}>
                    {principle.description}
                  </p>
                </div>
              </GlowCard>
             );
          })}
        </motion.div>
      </div>
    </section>
  );
}
