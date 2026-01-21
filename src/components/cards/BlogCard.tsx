import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../data/blogs';
import { useMotion } from '../../context/AppContext';
import { useCursorHandlers } from '../cursor/CustomCursor';
import { GlowCard } from '../ui/GlowCard';
import { springs, staggerItem } from '../../animations';

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export function BlogCard({ blog }: BlogCardProps) {
  const navigate = useNavigate();
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('link');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Subtle tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, springs.gentle);
  const smoothRotateY = useSpring(rotateY, springs.gentle);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    rotateX.set((y - 0.5) * -4);
    rotateY.set((x - 0.5) * 4);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(`/blog/${blog.slug}`);
  };

  return (
    <GlowCard
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      variants={staggerItem}
      glowColor="#67e8f9"
      borderRadius={16}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        cursor: 'pointer',
        rotateX: prefersReducedMotion ? 0 : smoothRotateX,
        rotateY: prefersReducedMotion ? 0 : smoothRotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      whileHover={{ y: -2 }}
      transition={springs.snappy}
      {...cursorHandlers}
    >
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {blog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 8px',
                fontSize: 11,
                fontWeight: 500,
                color: '#a5f3fc',
                background: 'rgba(103, 232, 249, 0.1)',
                borderRadius: 9999,
                textTransform: 'capitalize',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h4
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#fafafa',
            lineHeight: 1.4,
            marginBottom: 8,
            fontFamily: "'Outfit', system-ui, sans-serif",
          }}
        >
          {blog.title}
        </h4>
        
        {/* Excerpt */}
        <p
          style={{
            fontSize: 14,
            color: '#71717a',
            lineHeight: 1.6,
            marginBottom: 16,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {blog.excerpt}
        </p>
        
        {/* Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 12,
            color: '#52525b',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock style={{ width: 12, height: 12 }} />
            {blog.readingTime}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar style={{ width: 12, height: 12 }} />
            {new Date(blog.publishDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </GlowCard>
  );
}
