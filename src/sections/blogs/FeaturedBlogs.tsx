import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedBlogs, type Blog } from '../../data/blogs';
import { useMotion } from '../../context/AppContext';
import { useBlogs } from '../../context/BlogContext';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';
import { springs, scrollReveal } from '../../animations';
import { GlowCard } from '../../components/ui/GlowCard';

// ================================
// Featured Blog Card
// ================================
interface FeaturedCardProps {
  blog: Blog;
  index: number;
}

function FeaturedCard({ blog, index }: FeaturedCardProps) {
  const navigate = useNavigate();
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('link');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, springs.gentle);
  const smoothRotateY = useSpring(rotateY, springs.gentle);
  
  // Glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    rotateX.set((y - 0.5) * -6);
    rotateY.set((x - 0.5) * 6);
    glowX.set(x * 100);
    glowY.set(y * 100);
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
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15 }}
      glowColor="#67e8f9"
      borderRadius={20}
      style={{
        position: 'relative',
        padding: 32,
        cursor: 'pointer',
        rotateX: prefersReducedMotion ? 0 : smoothRotateX,
        rotateY: prefersReducedMotion ? 0 : smoothRotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      whileHover={{ y: -4 }}
      {...cursorHandlers}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
        {/* Cover image (if available) */}
        {blog.coverImage && (
          <motion.div
            style={{
              width: '100%',
              height: 180,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#1a1a24',
            }}
          >
            <motion.img
              src={blog.coverImage}
              alt={blog.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        )}
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '4px 10px',
                  fontSize: 12,
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
          <h3
            style={{
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 600,
              color: '#fafafa',
              lineHeight: 1.3,
              marginBottom: 8,
              fontFamily: "'Outfit', system-ui, sans-serif",
            }}
          >
            {blog.title}
          </h3>
          
          {/* Subtitle */}
          {blog.subtitle && (
            <p
              style={{
                fontSize: 16,
                color: '#a1a1aa',
                marginBottom: 12,
                fontStyle: 'italic',
              }}
            >
              {blog.subtitle}
            </p>
          )}
          
          {/* Excerpt */}
          <p
            style={{
              fontSize: 15,
              color: '#71717a',
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            {blog.excerpt}
          </p>
          
          {/* Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 13,
              color: '#52525b',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock style={{ width: 14, height: 14 }} />
              {blog.readingTime}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar style={{ width: 14, height: 14 }} />
              {new Date(blog.publishDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          
          {/* Read more indicator */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 20,
              fontSize: 14,
              fontWeight: 500,
              color: '#67e8f9',
            }}
            animate={{ x: isHovered ? 4 : 0 }}
            transition={springs.snappy}
          >
            Read article
            <ArrowRight style={{ width: 16, height: 16 }} />
          </motion.div>
        </div>
      </div>
    </GlowCard>
  );
}

// ================================
// Main Component
// ================================
export function FeaturedBlogs() {
  const { blogs, isLoading } = useBlogs();
  const featuredBlogs = blogs.filter(b => b.featured);

  // Fallback: If no blogs are explicitly featured, show the latest 3
  const displayBlogs = featuredBlogs.length > 0 ? featuredBlogs : blogs.slice(0, 3);

  if (isLoading) {
    return (
      <section
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div style={{ marginBottom: 48 }}>
           {/* Skeleton Header */}
           <div style={{ width: 100, height: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 4, marginBottom: 8 }} />
           <div style={{ width: 250, height: 30, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }} />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 32,
          }}
        >
          {[1, 2, 3].map((i) => (
             <div key={i} style={{ height: 500, background: 'rgba(255,255,255,0.02)', borderRadius: 20 }} />
          ))}
        </div>
      </section>
    );
  }

  if (displayBlogs.length === 0) return null;

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 24px',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          marginBottom: 48,
        }}
      >
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#67e8f9',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}
        >
          Featured
        </h3>
        <p
          style={{
            fontSize: 18,
            color: '#a1a1aa',
          }}
        >
          Selected writings worth your time
        </p>
      </motion.div>

      {/* Featured cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 32,
        }}
      >
        {displayBlogs.map((blog, index) => (
          <FeaturedCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </section>
  );
}
