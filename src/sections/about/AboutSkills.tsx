import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import * as Icons from 'lucide-react';
import { skillCategories } from '../../data/about';
import type { SkillCategory, Skill } from '../../data/about';
import { useMotion } from '../../context/AppContext';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';
import { springs } from '../../animations';
import '../../components/ui/GlassIcons.css'; // Import styles for .icon-btn
import { GlowCard } from '../../components/ui/GlowCard';

// ================================
// Skill Card with 3D Tilt
// ================================
interface SkillCardProps {
  skill: Skill;
  accent: string;
}

function SkillCard({ skill, accent }: SkillCardProps) {
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('button');
  const cardRef = useRef<HTMLDivElement>(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, springs.snappy);
  const springRotateY = useSpring(rotateY, springs.snappy);
  
  // Magnetic effect
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springMagnetX = useSpring(magnetX, springs.magnetic);
  const springMagnetY = useSpring(magnetY, springs.magnetic);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    rotateX.set(-y * 8);
    rotateY.set(x * 8);
    magnetX.set(x * 3);
    magnetY.set(y * 3);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    magnetX.set(0);
    magnetY.set(0);
  };

  // Get icon component dynamically. 
  const IconComponent = Icons[skill.icon as keyof typeof Icons] as React.ComponentType<{ style?: React.CSSProperties }> || Icons.Code;

  // Map hex accent to closest gradient color for GlassIcon
  const colorMap: Record<string, string> = {
    '#a78bfa': 'purple',
    '#67e8f9': 'cyan',
    '#f9a8d4': 'pink',
    '#fbbf24': 'orange',
    '#34d399': 'green',
    '#a1a1aa': 'indigo',
  };
  const glassColor = colorMap[accent] || 'blue';

  const gradientMapping: Record<string, string> = {
    blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
    purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
    red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
    indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
    orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
    green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
    pink: 'linear-gradient(hsl(320, 90%, 50%), hsl(305, 90%, 50%))',
    cyan: 'linear-gradient(hsl(180, 90%, 40%), hsl(165, 90%, 40%))',
  };

  return (
    <GlowCard
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      borderRadius={12}
      glowColor={colorMap[accent] === 'purple' ? '#a78bfa' : 
                 colorMap[accent] === 'cyan' ? '#67e8f9' :
                 colorMap[accent] === 'pink' ? '#f9a8d4' :
                 colorMap[accent] === 'orange' ? '#fbbf24' :
                 colorMap[accent] === 'green' ? '#34d399' : '#a1a1aa'}
      style={{
        position: 'relative',
        padding: 20,
        cursor: 'default',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
        x: springMagnetX,
        y: springMagnetY,
      }}
      whileHover={prefersReducedMotion ? {} : {
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px ${accent}20`,
      }}
      transition={springs.snappy}
      {...cursorHandlers}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Glass Icon - Scaled down */}
        <div style={{ fontSize: '10px' }}> {/* Scale factor for 4.5em icon */}
           <div className="icon-btn" style={{ cursor: 'default', pointerEvents: 'none' }}>
              <span className="icon-btn__back" style={{ background: gradientMapping[glassColor] || glassColor }}></span>
              <span className="icon-btn__front">
                <span className="icon-btn__icon" aria-hidden="true">
                  <IconComponent style={{ width: '60%', height: '60%', color: '#fff' }} />
                </span>
              </span>
           </div>
        </div>

        <div>
           {/* Text Content */}
          <h4 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
            {skill.name}
          </h4>
          <p style={{ fontSize: 13, color: '#a1a1aa', lineHeight: 1.4 }}>
            {skill.description}
          </p>
        </div>
      </div>
    </GlowCard>
  );
}

// ================================
// Skill Category
// ================================
interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, ...springs.snappy }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: category.accent,
          marginBottom: 16,
        }}
      >
        {category.title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {category.skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} accent={category.accent} />
        ))}
      </div>
    </motion.div>
  );
}

// ================================
// Main Component
// ================================
export function AboutSkills() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        padding: '128px 0',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(167, 139, 250, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={springs.snappy}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              fontFamily: "'Outfit', system-ui, sans-serif",
              marginBottom: 16,
            }}
          >
            <span className="text-gradient-static">Skills & Capabilities</span>
          </h2>
          <p style={{ fontSize: 18, color: '#a1a1aa', maxWidth: 600, margin: '0 auto' }}>
            A breadth of skills built through years of curiosity and building real products.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 48,
          }}
        >
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
