import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';

export function Footer() {
  const cursorHandlers = useCursorHandlers('button');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ marginTop: 128, paddingBottom: 32 }}>
      <div 
        style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Copyright */}
        <div style={{ fontSize: 14, color: '#71717a' }}>
          © {new Date().getFullYear()} Portfolio. Built with React & Motion.
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          {...cursorHandlers}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            color: '#a1a1aa',
            fontSize: 14,
            cursor: 'pointer',
          }}
          whileHover={{ color: '#fff', y: -2 }}
        >
          Back to Top
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  );
}
