import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui';
import { scrollReveal } from '../../animations';

export function ProjectsCTA() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'calc(-50vw + 50%)',
        padding: '96px 0',
      }}
    >
      <div style={{ maxWidth: 800, padding: '0 24px', textAlign: 'center' }}>
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div 
            style={{ 
              width: 1, 
              height: 60, 
              background: 'linear-gradient(to bottom, transparent, #a78bfa)', 
              margin: '0 auto 32px' 
            }} 
          />
          
          <h2 style={{ 
            fontSize: 'clamp(24px, 4vw, 36px)', 
            fontWeight: 600, 
            color: '#fff',
            marginBottom: 24,
            fontFamily: "'Outfit', system-ui, sans-serif"
          }}>
            Building something ambitious?
          </h2>
          
          <p style={{ 
            fontSize: 18, 
            color: '#a1a1aa', 
            marginBottom: 40,
            lineHeight: 1.6 
          }}>
            I'm always interested in complex engineering challenges and creating systems that scale.
            Let's discuss how I can contribute to your team.
          </p>

          <Button 
            variant="primary" 
            size="lg" 
            onClick={scrollToContact}
            icon={<ArrowRight />}
            iconPosition="right"
          >
            Start a Conversation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
