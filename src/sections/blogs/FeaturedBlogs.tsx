import { motion } from 'framer-motion';
import { useBlogs } from '../../context/BlogContext';
import { FeaturedBlogCard } from '../../components/cards/FeaturedBlogCard';


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
          <FeaturedBlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </section>
  );
}
