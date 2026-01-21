import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchHashnodePost } from '../services/hashnode';
import type { Blog } from '../data/blogs';
import { useCursorHandlers } from '../components/cursor/CustomCursor';
import '../styles/BlogArticle.css';

/*
  DESIGN SYSTEM
  =============
  
  Column Width: 680px (optimal for 60-75 characters per line)
  
  Vertical Rhythm (8px base unit):
  - Section gap: 80px (10 units)
  - Paragraph gap: 32px (4 units)
  - Heading top margin: 64px (8 units)
  - Heading bottom margin: 24px (3 units)
  
  Typography:
  - Body: 18px / 1.9 line-height
  - H1: 42px / 1.15 line-height
  - H2: 28px / 1.3 line-height
  - H3: 22px / 1.4 line-height
*/

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const buttonHandlers = useCursorHandlers('button');

  useEffect(() => {
    // Disable custom cursor for this page
    document.body.classList.add('custom-cursor-disabled');
    return () => {
      document.body.classList.remove('custom-cursor-disabled');
    };
  }, []);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const data = await fetchHashnodePost(slug);
        if (data) {
          setPost(data);
          document.title = `${data.title} | Portfolio`;
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  // Loading state
  if (isLoading) {
    return (
      <div className="blog-loading">
        <div className="blog-loading-spinner" />
      </div>
    );
  }

  // Error state or missing post
  if (error || !post) {
    return (
      <div className="blog-error">
        <p className="blog-error-text">{error || 'Article not found'}</p>
        <button onClick={() => navigate('/')} className="blog-back-link" {...buttonHandlers}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-wrapper">
        <div className="blog-inner">
          <article>
            {/* BACK NAVIGATION */}
            <nav className="blog-nav">
              <button
                onClick={() => navigate('/')}
                className="blog-nav-button"
                {...buttonHandlers}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="blog-nav-text">Back</span>
              </button>
            </nav>

            {/* ARTICLE HEADER */}
            <header className="blog-header">
              <h1 className="blog-title">
                {post.title}
              </h1>

              {post.subtitle && (
                <p className="blog-subtitle">
                  {post.subtitle}
                </p>
              )}

              <div className="blog-meta">
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="blog-meta-separator">·</span>
                <span>{post.readingTime}</span>
              </div>

              <div className="blog-tags">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="blog-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* COVER IMAGE */}
            {post.coverImage && (
              <figure className="blog-cover">
                <img 
                  src={post.coverImage} 
                  alt=""
                  className="blog-cover-image"
                />
              </figure>
            )}

            {/* ARTICLE CONTENT */}
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* FOOTER */}
            <footer className="blog-footer">
              <div className="blog-footer-content">
                <span className="blog-footer-end">End</span>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="blog-footer-top"
                  {...buttonHandlers}
                >
                  Back to top ↑
                </button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
