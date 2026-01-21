import { motion } from 'framer-motion';
import { Lightbulb, Target, BookOpen } from 'lucide-react';
import { personalEdge } from '../../data/about';
import { useMotion } from '../../context/AppContext';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';
import { springs, scrollReveal, staggerContainer, staggerItem } from '../../animations';

export function AboutPersonal() {
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('hover');

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '50vh',
        padding: '128px 0',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 80%, rgba(249, 168, 212, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              fontFamily: "'Outfit', system-ui, sans-serif",
              marginBottom: 16,
            }}
          >
            <span className="text-gradient-static">Beyond the Code</span>
          </h2>
          <p style={{ fontSize: 18, color: '#a1a1aa', maxWidth: 600, margin: '0 auto' }}>
            What drives me outside of shipping features.
          </p>
        </motion.div>

        {/* Content grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {/* Obsessions card */}
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 16,
            }}
            whileHover={prefersReducedMotion ? {} : {
              background: 'rgba(255, 255, 255, 0.04)',
              y: -4,
            }}
            {...cursorHandlers}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(251, 191, 36, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <Lightbulb style={{ width: 24, height: 24, color: '#fbbf24' }} />
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                marginBottom: 16,
                fontFamily: "'Outfit', system-ui, sans-serif",
              }}
            >
              Currently Obsessed With
            </h3>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {personalEdge.obsessions.map((item, index) => (
                <motion.li
                  key={index}
                  variants={staggerItem}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 15,
                    color: '#a1a1aa',
                    marginBottom: 10,
                  }}
                >
                  <span style={{ color: '#fbbf24' }}>→</span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Approach card */}
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1 }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 16,
            }}
            whileHover={prefersReducedMotion ? {} : {
              background: 'rgba(255, 255, 255, 0.04)',
              y: -4,
            }}
            {...cursorHandlers}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(167, 139, 250, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <Target style={{ width: 24, height: 24, color: '#a78bfa' }} />
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                marginBottom: 16,
                fontFamily: "'Outfit', system-ui, sans-serif",
              }}
            >
              Problem-Solving Approach
            </h3>
            <p style={{ fontSize: 15, color: '#a1a1aa', lineHeight: 1.7 }}>
              {personalEdge.approach}
            </p>
          </motion.div>

          {/* Currently learning card */}
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2 }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 16,
            }}
            whileHover={prefersReducedMotion ? {} : {
              background: 'rgba(255, 255, 255, 0.04)',
              y: -4,
            }}
            {...cursorHandlers}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(52, 211, 153, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <BookOpen style={{ width: 24, height: 24, color: '#34d399' }} />
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                marginBottom: 16,
                fontFamily: "'Outfit', system-ui, sans-serif",
              }}
            >
              Currently Learning
            </h3>
            <p style={{ fontSize: 15, color: '#a1a1aa', lineHeight: 1.7 }}>
              {personalEdge.currentlyLearning}
            </p>
            <motion.div
              style={{
                marginTop: 16,
                height: 4,
                background: 'rgba(52, 211, 153, 0.1)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '65%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #34d399, #67e8f9)',
                  borderRadius: 2,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
