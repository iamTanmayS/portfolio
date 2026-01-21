import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNav, useCursor, useMotion } from '../../context/AppContext';
import { useCursorHandlers } from '../cursor/CustomCursor';
import { springs, navbarVariants } from '../../animations';

// ================================
// NavLink Component
// ================================
interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

function NavLink({ href, label, isActive, onClick, index }: NavLinkProps) {
  const cursorHandlers = useCursorHandlers('link');
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClick();
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, ...springs.snappy }}
      style={{
        position: 'relative',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 500,
        color: isActive ? '#fff' : '#a1a1aa',
        textDecoration: 'none',
        borderRadius: '9999px',
        transition: 'color 0.2s',
      }}
      whileHover={{ color: '#fff' }}
      whileTap={{ scale: 0.98 }}
      {...cursorHandlers}
    >
      {label}
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="navActiveIndicator"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(167, 139, 250, 0.15)',
            borderRadius: '9999px',
            zIndex: -1,
          }}
          transition={springs.bouncy}
        />
      )}
    </motion.a>
  );
}

// ================================
// Main Navbar Component
// ================================
// ================================
// Main Navbar Component
// ================================
import { useLocation, useNavigate } from 'react-router-dom';

export function DynamicIsland() {
  const { isNavExpanded, setNavExpanded, activeSection, sections } = useNav();
  const { cursor, isTouchDevice } = useCursor();
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('button');
  
  const location = useLocation();
  const navigate = useNavigate();
  const isBlogPage = location.pathname.startsWith('/blog/');

  // ... (refs and effects remain active) -> Need to preserve lines 79-150
  const navRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Magnetic effect
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const smoothY = useSpring(magnetY, springs.magnetic);
  
  // Glow intensity based on proximity
  const glowIntensity = useMotionValue(0);
  const smoothGlow = useSpring(glowIntensity, springs.gentle);

  // ================================
  // Scroll Detection
  // ================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ================================
  // Cursor Proximity Detection
  // ================================
  useEffect(() => {
    if (isTouchDevice || !navRef.current) return;

    const nav = navRef.current;
    const rect = nav.getBoundingClientRect();
    const threshold = 60;
    
    const navCenterX = rect.left + rect.width / 2;
    const navCenterY = rect.top + rect.height / 2;
    
    const distX = cursor.x - navCenterX;
    const distY = cursor.y - navCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    
    const near = distance < threshold + rect.width / 2;
    setIsNear(near);

    if (near && !isNavExpanded) {
      // Magnetic pull toward cursor
      magnetX.set(distX * 0.08);
      magnetY.set(distY * 0.08);
      // Glow increases as cursor gets closer
      glowIntensity.set(1 - (distance / (threshold + rect.width / 2)));
    } else {
      magnetX.set(0);
      magnetY.set(0);
      glowIntensity.set(isNavExpanded ? 0.8 : 0);
    }
  }, [cursor.x, cursor.y, isTouchDevice, isNavExpanded, magnetX, magnetY, glowIntensity]);

  // ================================
  // Click Outside to Close
  // ================================
  useEffect(() => {
    if (!isNavExpanded) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setNavExpanded(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isNavExpanded, setNavExpanded]);

  // ================================
  // Handlers
  // ================================
  const handleToggle = () => setNavExpanded(!isNavExpanded);
  
  const handleNavClick = (sectionId: string) => {
    setNavExpanded(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Timeout to allow navigation to settle before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const currentSection = sections.find((s) => s.id === activeSection) || sections[0];
  // Determine active section override for blog pages
  const effectiveActiveSection = isBlogPage && activeSection === 'home' ? 'blogs' : activeSection;


  // ================================
  // Dynamic Styles
  // ================================
  const getNavState = () => {
    if (isNavExpanded) return 'expanded';
    if (isNear) return 'expanded';
    return 'collapsed';
  };

  return (
    <motion.nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        zIndex: 100,
        x: '-50%', // Centered via static transform for stability
        y: smoothY,
      }}
      initial={{ y: -100, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ delay: 0.3, ...springs.bouncy }}
    >
      <motion.div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9999px',
          background: scrolled ? 'rgba(18, 18, 26, 0.95)' : 'rgba(18, 18, 26, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(167, 139, 250, 0.15)',
          overflow: 'hidden',
          cursor: isNavExpanded ? 'default' : 'pointer',
          boxShadow: scrolled ? '0 10px 40px rgba(0, 0, 0, 0.3)' : 'none',
        }}
        variants={navbarVariants}
        animate={getNavState()}
        onClick={!isNavExpanded ? handleToggle : undefined}
        onMouseEnter={() => setNavExpanded(true)}
        onMouseLeave={() => setNavExpanded(false)}
        {...cursorHandlers}
      >
        {/* Inner glow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
            opacity: smoothGlow,
          }}
        />

        {/* Outer glow shadow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: '9999px',
            pointerEvents: 'none',
            boxShadow: useTransform(
              smoothGlow,
              [0, 1],
              ['0 0 0px rgba(167, 139, 250, 0)', '0 0 40px rgba(167, 139, 250, 0.4)']
            ),
          }}
        />

        {/* Content */}
        <div style={{ 
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
        }}>
          <AnimatePresence mode="wait">
            {!(isNavExpanded || isNear) ? (
              // ================================
              // Collapsed State
              // ================================
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {/* Breathing dot */}
                <motion.div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #a78bfa, #67e8f9)',
                  }}
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: 500,
                  color: '#d4d4d8',
                }}>
                  {isBlogPage ? 'Blogs' : currentSection.navLabel}
                </span>
              </motion.div>
            ) : (
              // ================================
              // Expanded State
              // ================================
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {sections.map((section, index) => (
                  <NavLink
                    key={section.id}
                    href={`#${section.id}`}
                    label={section.navLabel}
                    isActive={effectiveActiveSection === section.id || (isBlogPage && section.id === 'blogs')}
                    onClick={() => handleNavClick(section.id)}
                    index={index}
                  />
                ))}
                
                {/* Resume CTA - Distinct styling */}
                <motion.a
                  href="/resume.pdf"
                  download="Tanmay_Shukla_Resume.pdf"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sections.length * 0.05, ...springs.snappy }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginLeft: 8,
                    padding: '6px 14px',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#0a0a0f',
                    background: 'linear-gradient(135deg, #a78bfa 0%, #67e8f9 100%)',
                    borderRadius: 9999,
                    textDecoration: 'none',
                  }}
                  {...cursorHandlers}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Resume
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Gradient border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            padding: 1,
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(103, 232, 249, 0.1), rgba(249, 168, 212, 0.2))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
            opacity: isNear || isNavExpanded ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}
        />
      </motion.div>
    </motion.nav>
  );
}
