import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui';
import { useMotion } from '../../context/AppContext';
import { springs, scrollReveal } from '../../animations';

export function AboutCTA() {
  const { prefersReducedMotion } = useMotion();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '30vh',
        padding: '96px 0 128px',
        marginLeft: 'calc(-50vw + 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 100,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.3), transparent)',
        }}
      />

      <motion.div
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{ textAlign: 'center', padding: '0 24px' }}
      >
        <motion.p
          style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 500,
            fontFamily: "'Outfit', system-ui, sans-serif",
            color: '#e4e4e7',
            marginBottom: 32,
            lineHeight: 1.4,
          }}
        >
          Interested in working together?
        </motion.p>

        <motion.p
          style={{
            fontSize: 18,
            color: '#71717a',
            marginBottom: 40,
            maxWidth: 500,
            margin: '0 auto 40px',
          }}
        >
          Check out my recent work or get in touch.
        </motion.p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToProjects}
            icon={<ArrowRight style={{ width: 18, height: 18 }} />}
            iconPosition="right"
          >
            View Projects
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToContact}
          >
            Get in Touch
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
