import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { getFeaturedProjects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { useMotion } from '../../context/AppContext';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';
import { springs, scrollReveal } from '../../animations';

// ================================
// Featured Project Card
// ================================
import { GlowCard } from '../../components/ui/GlowCard';

interface FeaturedCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

function FeaturedCard({ project, index }: FeaturedCardProps) {
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('button');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, springs.snappy);
  const springRotateY = useSpring(rotateY, springs.snappy);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    rotateX.set(-y * 5);
    rotateY.set(x * 5);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <GlowCard
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.15, ...springs.snappy }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 48,
        alignItems: 'center',
        padding: '64px 0',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
        background: 'transparent', // Override default bg
        border: 'none', // Remove default border if any
      }}
      {...cursorHandlers}
    >
      {/* Media Side */}
      <motion.div
        style={{
          order: isEven ? 1 : 2,
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          aspectRatio: '16/10',
          background: 'rgba(18, 18, 26, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
        whileHover={prefersReducedMotion ? {} : {
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(167, 139, 250, 0.2)',
        }}
      >
        {/* Thumbnail / Video */}
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          animate={isHovered && !prefersReducedMotion ? { scale: 1.05 } : { scale: 1 }}
          transition={springs.snappy}
        />
        
        {/* Play overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.3)',
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Play style={{ width: 24, height: 24, color: '#0a0a0f', marginLeft: 4 }} />
          </div>
        </motion.div>

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(10, 10, 15, 0.8), transparent)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Content Side */}
      <div style={{ order: isEven ? 2 : 1, padding: '0 16px' }}>
        {/* Category + Year */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span
            style={{
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#a78bfa',
              background: 'rgba(167, 139, 250, 0.1)',
              borderRadius: 9999,
            }}
          >
            {project.category.replace('-', ' / ')}
          </span>
          <span style={{ fontSize: 13, color: '#71717a' }}>{project.year}</span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            fontFamily: "'Outfit', system-ui, sans-serif",
            color: '#fff',
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontSize: 18,
            color: '#a1a1aa',
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {project.tagline}
        </p>

        {/* Tech Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                color: '#d4d4d8',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 6,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 16 }}>
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                fontSize: 14,
                fontWeight: 600,
                color: '#0a0a0f',
                background: 'linear-gradient(135deg, #a78bfa 0%, #67e8f9 100%)',
                borderRadius: 9999,
                textDecoration: 'none',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink style={{ width: 16, height: 16 }} />
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                fontSize: 14,
                fontWeight: 600,
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 9999,
                textDecoration: 'none',
              }}
              whileHover={{ background: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Github style={{ width: 16, height: 16 }} />
              GitHub
            </motion.a>
          )}
        </div>
      </div>
    </GlowCard>
  );
}

// ================================
// Main Component
// ================================
interface FeaturedProjectsProps {
  onOpenModal: (project: Project) => void;
}

export function FeaturedProjects({ onOpenModal }: FeaturedProjectsProps) {
  const featuredProjects = getFeaturedProjects();

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        padding: '64px 0',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ marginBottom: 48 }}
        >
          <h3
            style={{
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#71717a',
              marginBottom: 8,
            }}
          >
            Featured
          </h3>
          <div
            style={{
              width: 60,
              height: 2,
              background: 'linear-gradient(90deg, #a78bfa, #67e8f9)',
              borderRadius: 1,
            }}
          />
        </motion.div>

        {/* Featured cards */}
        {featuredProjects.map((project, index) => (
          <FeaturedCard
            key={project.id}
            project={project}
            index={index}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </section>
  );
}
