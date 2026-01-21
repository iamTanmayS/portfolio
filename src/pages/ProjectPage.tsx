import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ExternalLink, Github, Calendar, User, 
  Target, Lightbulb, Wrench, Layers, Zap, Shield,
  Database, Server, Globe, CheckCircle2
} from 'lucide-react';
import { getProjectById } from '../data/projects';
import { Button } from '../components/ui/Button';
import { TechStackIcon } from '../components/ui/TechStackIcon';
import '../styles/ProjectPage.css';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = id ? getProjectById(id) : null;

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Portfolio`;
    }
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) {
    return (
      <div className="project-not-found">
        <p>Project not found</p>
        <Button variant="ghost" onClick={() => navigate('/#projects')}>
          Back to Projects
        </Button>
      </div>
    );
  }

  // Derive tech categories from techStack
  const techCategories = deriveTechCategories(project.techStack);

  return (
    <div className="project-page">
      
      {/* SECTION 1: PROJECT HEADER - Identity */}
      <header className="project-shell project-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="project-meta-row">
            <span className="project-category-badge">
              {project.category.replace('-', ' / ')}
            </span>
            <span className="project-year-badge">{project.year}</span>
          </div>

          <h1 className="project-title">{project.title}</h1>
          <p className="project-tagline">{project.tagline}</p>

          <div className="project-tech-chips">
            {project.techStack.map((tech) => (
              <div key={tech} className="project-tech-chip">
                <TechStackIcon tech={tech} size={16} />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* SECTION 2: MEDIA - Proof */}
      <section className="project-shell project-media">
        <div className="project-hero-glow" />
        <motion.div
          className="project-hero-image"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={project.thumbnail} alt={project.title} />
        </motion.div>
      </section>

      {/* SECTION 3: OVERVIEW - What & Why */}
      <section className="project-shell project-overview">
        <div className="project-overview-grid">
          <div className="project-overview-content">
            <h2 className="project-section-title">Overview</h2>
            <div className="project-description">
              <p>{project.description}</p>
            </div>
          </div>

          <aside className="project-quick-stats">
            <div className="project-stat">
              <span className="project-stat-label">
                <User size={14} /> Role
              </span>
              <span className="project-stat-value">{project.role || 'Full-Stack Engineer'}</span>
            </div>
            <div className="project-stat">
              <span className="project-stat-label">
                <Calendar size={14} /> Timeline
              </span>
              <span className="project-stat-value">{project.duration || project.year}</span>
            </div>
            <div className="project-stat">
              <span className="project-stat-label">
                <Layers size={14} /> Type
              </span>
              <span className="project-stat-value">{formatCategory(project.category)}</span>
            </div>
          </aside>
        </div>
      </section>

      {/* SECTION 4: ARCHITECTURE & TECH STACK - How */}
      <section className="project-shell project-architecture">
        <h2 className="project-section-title">Architecture & Tech Stack</h2>
        <p className="project-section-subtitle">
          Full-stack implementation with modern tooling and best practices
        </p>

        <div className="project-tech-grid">
          {/* Frontend */}
          {techCategories.frontend.length > 0 && (
            <div className="project-tech-category">
              <h3 className="project-tech-category-title">
                <Globe size={18} /> Frontend
              </h3>
              <div className="project-tech-list">
                {techCategories.frontend.map((tech) => (
                  <div key={tech} className="project-tech-item">
                    <TechStackIcon tech={tech} size={20} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Backend */}
          {techCategories.backend.length > 0 && (
            <div className="project-tech-category">
              <h3 className="project-tech-category-title">
                <Server size={18} /> Backend
              </h3>
              <div className="project-tech-list">
                {techCategories.backend.map((tech) => (
                  <div key={tech} className="project-tech-item">
                    <TechStackIcon tech={tech} size={20} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Database */}
          {techCategories.database.length > 0 && (
            <div className="project-tech-category">
              <h3 className="project-tech-category-title">
                <Database size={18} /> Database
              </h3>
              <div className="project-tech-list">
                {techCategories.database.map((tech) => (
                  <div key={tech} className="project-tech-item">
                    <TechStackIcon tech={tech} size={20} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Infra */}
          {techCategories.tools.length > 0 && (
            <div className="project-tech-category">
              <h3 className="project-tech-category-title">
                <Wrench size={18} /> Tools & Infrastructure
              </h3>
              <div className="project-tech-list">
                {techCategories.tools.map((tech) => (
                  <div key={tech} className="project-tech-item">
                    <TechStackIcon tech={tech} size={20} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: FEATURES & FLOWS - Depth */}
      <section className="project-shell project-features">
        <h2 className="project-section-title">Core Features</h2>
        <p className="project-section-subtitle">
          Engineering highlights and implementation details
        </p>

        <div className="project-features-grid">
          <FeatureCard
            icon={<Zap size={24} />}
            title="Performance Optimized"
            description="Aggressive caching, code splitting, and lazy loading for sub-second load times"
          />
          <FeatureCard
            icon={<Shield size={24} />}
            title="Security First"
            description="Industry-standard authentication, input validation, and data encryption"
          />
          <FeatureCard
            icon={<CheckCircle2 size={24} />}
            title="Type Safety"
            description="End-to-end TypeScript for compile-time error detection and better DX"
          />
          <FeatureCard
            icon={<Layers size={24} />}
            title="Scalable Architecture"
            description="Modular design, clean separation of concerns, and room for growth"
          />
        </div>
      </section>

      {/* SECTION 6: CHALLENGES & DECISIONS - Thinking */}
      <section className="project-shell project-challenges">
        <h2 className="project-section-title">Engineering Process</h2>

        <div className="project-challenge-grid">
          <div className="project-challenge-card problem">
            <div className="project-challenge-icon">
              <Target size={24} />
            </div>
            <h3 className="project-challenge-heading">The Challenge</h3>
            <p className="project-challenge-text">{project.problem}</p>
          </div>

          <div className="project-challenge-card solution">
            <div className="project-challenge-icon">
              <Lightbulb size={24} />
            </div>
            <h3 className="project-challenge-heading">The Solution</h3>
            <p className="project-challenge-text">{project.solution}</p>
          </div>
        </div>

        {project.learnings.length > 0 && (
          <div className="project-learnings">
            <h3 className="project-learnings-title">Key Takeaways</h3>
            <div className="project-learnings-grid">
              {project.learnings.map((learning, i) => (
                <div key={i} className="project-learning-item">
                  <span className="project-learning-number">0{i + 1}</span>
                  <p>{learning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 7: OUTCOMES & LEARNINGS - Impact */}
      <section className="project-shell project-outcomes">
        <h2 className="project-section-title">Impact & Growth</h2>
        <div className="project-outcomes-content">
          <div className="project-outcome-card">
            <h4>What I Learned</h4>
            <p>
              This project deepened my understanding of {project.techStack.slice(0, 3).join(', ')}, 
              reinforced best practices in system design, and improved my ability to balance 
              technical debt with feature velocity.
            </p>
          </div>
          <div className="project-outcome-card">
            <h4>What's Next</h4>
            <p>
              Future improvements include enhanced performance monitoring, additional test coverage, 
              and exploring {project.category === 'ai-ml' ? 'advanced ML techniques' : 'new architecture patterns'}.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: ACTION BAR - Bottom Only */}
      <nav className="project-action-bar">
        <div className="project-action-content">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('/#projects')}
          >
            All Projects
          </Button>

          <div className="project-action-buttons">
            {project.githubUrl && (
              <Button
                variant="secondary"
                icon={<Github size={18} />}
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                Source Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="primary"
                icon={<ExternalLink size={18} />}
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

// Helper: Feature Card Component
function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="project-feature-card">
      <div className="project-feature-icon">{icon}</div>
      <h4 className="project-feature-title">{title}</h4>
      <p className="project-feature-description">{description}</p>
    </div>
  );
}

// Helper: Format category
function formatCategory(category: string): string {
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Helper: Categorize tech stack
function deriveTechCategories(techStack: string[]) {
  const categories = {
    frontend: [] as string[],
    backend: [] as string[],
    database: [] as string[],
    tools: [] as string[],
  };

  const frontendKeywords = ['react', 'vue', 'next', 'tailwind', 'css', 'html', 'framer', 'gsap'];
  const backendKeywords = ['node', 'python', 'fastapi', 'express', 'graphql'];
  const databaseKeywords = ['postgres', 'redis', 'mongo', 'database', 'sql'];

  techStack.forEach(tech => {
    const lower = tech.toLowerCase();
    if (frontendKeywords.some(k => lower.includes(k))) {
      categories.frontend.push(tech);
    } else if (backendKeywords.some(k => lower.includes(k))) {
      categories.backend.push(tech);
    } else if (databaseKeywords.some(k => lower.includes(k))) {
      categories.database.push(tech);
    } else {
      categories.tools.push(tech);
    }
  });

  return categories;
}
