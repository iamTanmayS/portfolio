import { motion } from 'framer-motion';
import { narrative } from '../../data/about';
import { useMotion } from '../../context/AppContext';
import { scrollReveal, staggerContainer, staggerItem, springs } from '../../animations';

export function AboutNarrative() {
  const { prefersReducedMotion } = useMotion();

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '80vh',
        padding: '128px 0',
        marginLeft: 'calc(-50vw + 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.1), transparent)',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Intro quote */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ marginBottom: 80, textAlign: 'center' }}
        >
          <p
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 500,
              fontFamily: "'Outfit', system-ui, sans-serif",
              color: '#e4e4e7',
              lineHeight: 1.4,
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            "{narrative.intro}"
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 64,
            alignItems: 'start',
          }}
        >
          {/* Story column */}
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#a78bfa',
                marginBottom: 24,
              }}
            >
              The Story
            </h3>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: 16,
                padding: 32,
                backdropFilter: 'blur(8px)',
              }}
            >
              {narrative.story.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, ...springs.snappy }}
                  viewport={{ once: true }}
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: '#a1a1aa',
                    marginBottom: index < narrative.story.split('\n\n').length - 1 ? 24 : 0,
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Focus areas column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#67e8f9',
                marginBottom: 24,
              }}
            >
              What I Optimize For
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {narrative.focus.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 12,
                    padding: 24,
                    cursor: 'default',
                  }}
                  whileHover={prefersReducedMotion ? {} : {
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderColor: 'rgba(103, 232, 249, 0.2)',
                    x: 4,
                  }}
                  transition={springs.snappy}
                >
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: '#fff',
                      marginBottom: 8,
                    }}
                  >
                    {item.label}
                  </h4>
                  <p style={{ fontSize: 14, color: '#71717a' }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
