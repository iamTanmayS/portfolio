import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Copy, Check } from 'lucide-react';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';
import { copyToClipboard } from '../../utils/clipboard';
import { springs, staggerContainer, staggerItem } from '../../animations';
import { GlassIcons } from '../../components/ui/GlassIcons';
import { GlowCard } from '../../components/ui/GlowCard';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: Github, color: '#fff' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin, color: '#0077b5' },
  { name: 'Twitter', url: 'https://twitter.com', icon: Twitter, color: '#1da1f2' },
];

export function SocialGrid() {
  const [copied, setCopied] = useState(false);
  const cursorHandlers = useCursorHandlers('button');

  const handleCopyEmail = async () => {
    const success = await copyToClipboard('hello@example.com');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Email Card (Large) */}
      <GlowCard
        variants={staggerItem}
        onClick={handleCopyEmail}
        {...cursorHandlers}
        borderRadius={16}
        style={{
          padding: 32,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
        }}
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
        transition={springs.snappy}
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
            color: '#a78bfa',
          }}
        >
          <Mail size={24} />
        </div>

        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#a78bfa', marginBottom: 4 }}>
            Drop me an email
          </h3>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#fff', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            hello@example.com
          </p>
        </div>

        {/* Copy Indicator */}
        <div style={{ 
          position: 'absolute', 
          top: 24, 
          right: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: copied ? '#34d399' : '#71717a',
          fontSize: 14,
          fontWeight: 500,
        }}>
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Check size={16} /> Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Copy size={16} /> Copy
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </GlowCard>

      {/* Social Links Row using GlassIcons for 3D effect */}
      <GlassIcons 
        items={socialLinks.map(link => ({
          icon: <link.icon size={14} />,
          color: link.color === '#fff' ? 'purple' : link.color === '#0077b5' ? 'blue' : 'cyan', // Map to available gradients
          label: link.name,
          href: link.url
        }))}
        className="social-icons-grid"
      />
    </motion.div>
  );
}
