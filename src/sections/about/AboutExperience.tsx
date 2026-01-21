import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring as useFramerSpring, useInView } from 'framer-motion';
import { Briefcase, TrendingUp } from 'lucide-react';
import { experiences } from '../../data/about';
import { useMotion } from '../../context/AppContext';
import { springs, scrollReveal } from '../../animations';
import { GlowCard } from '../../components/ui/GlowCard';

// ================================
// Animated Number Counter
// ================================
interface AnimatedNumberProps {
  value: string;
}

function AnimatedNumber({ value }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(value);
  const { prefersReducedMotion } = useMotion();

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const match = value.match(/(\d+)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(match[1], 10);
    const duration = 1500;
    const steps = 30;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += targetNum / steps;
      if (current >= targetNum) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(value.replace(/\d+/, Math.floor(current).toString()));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value, prefersReducedMotion]);

  return <span ref={ref}>{displayValue}</span>;
}

// ================================
// Main Component
// ================================
export function AboutExperience() {
  const { prefersReducedMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the beam
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 80%"],
  });
  
  const scaleY = useFramerSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '60vh',
        padding: '128px 0',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#0a0a0f',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              fontFamily: "'Outfit', system-ui, sans-serif",
              marginBottom: 16,
            }}
          >
            <span className="text-gradient-static">Experience</span>
          </h2>
          <p style={{ fontSize: 18, color: '#a1a1aa', maxWidth: 600, margin: '0 auto' }}>
             Where I've applied these principles in the real world.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} style={{ position: 'relative' }}>
          
          {/* Main vertical line (background) */}
          <div
            style={{
              position: 'absolute',
              left: 24,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
            }}
          />

          {/* Active Beam Line (animated) */}
          <motion.div
            style={{
              position: 'absolute',
              left: 24,
              top: 0,
              bottom: 0, // Fill full height but scale controls visible part
              width: 2,
              background: 'linear-gradient(180deg, #a78bfa 0%, #3b82f6 100%)',
              scaleY: scaleY,
              originY: 0,
              borderRadius: 2,
              zIndex: 1,
              boxShadow: '0 0 15px rgba(167, 139, 250, 0.5)',
            }}
          />

          {/* Experience cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} exp={exp} index={index} prefersReducedMotion={prefersReducedMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Separate component to handle per-item "active" view state
function TimelineItem({ exp, index, prefersReducedMotion }: { exp: any, index: number, prefersReducedMotion: boolean }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { margin: "-20% 0px -50% 0px" }); // Active when near center/top

    return (
        <motion.article
            ref={itemRef}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, ...springs.snappy }}
            style={{
                position: 'relative',
                marginLeft: 56,
            }}
        >
            {/* Timeline dot */}
            <div style={{ position: 'absolute', left: -56, top: 0, width: 48, height: '100%', pointerEvents: 'none' }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        // Item container has marginLeft: 56. So relative to item, the line is at -32.
                        // Let's position explicitly.
                        left: -31, // Line center (-32) + half stroke adjustment
                        // Container padding is 0. Line is at 24px from left. Items start at 56px (margin).
                        // 56 - 24 = 32px gap.
                        top: 24, // Alignment with card top
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        x: '-50%',
                        y: '-50%',
                        border: '2px solid #0a0a0f',
                        zIndex: 2,
                    }}
                    animate={{
                        backgroundColor: isInView ? '#a78bfa' : 'rgba(255, 255, 255, 0.1)',
                        borderColor: isInView ? 'rgba(167, 139, 250, 0.5)' : '#0a0a0f',
                        scale: isInView ? 1.5 : 1,
                        boxShadow: isInView ? '0 0 20px rgba(167, 139, 250, 0.8)' : 'none',
                    }}
                    transition={{ duration: 0.4 }}
                />
            </div>

            {/* Card */}
            <GlowCard
                glowColor={index % 2 === 0 ? '#a78bfa' : '#3b82f6'}
                borderRadius={16}
                style={{
                    padding: 28,
                    cursor: 'default',
                }}
                animate={{
                    borderColor: isInView ? 'rgba(167, 139, 250, 0.3)' : 'transparent', // GlowCard handles border, but we can add extra tint
                    backgroundColor: isInView ? 'rgba(167, 139, 250, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                }}
                whileHover={prefersReducedMotion ? {} : {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    scale: 1.01,
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            {exp.current && (
                                <span
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: 11,
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        color: '#34d399',
                                        background: 'rgba(52, 211, 153, 0.1)',
                                        borderRadius: 9999,
                                        boxShadow: '0 0 10px rgba(52, 211, 153, 0.2)',
                                    }}
                                >
                                    Current
                                </span>
                            )}
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                            {exp.role}
                        </h3>
                        <p style={{ fontSize: 15, color: '#a1a1aa' }}>
                            {exp.company}
                        </p>
                    </div>
                    <span style={{ fontSize: 14, color: '#71717a', whiteSpace: 'nowrap' }}>
                        {exp.period}
                    </span>
                </div>

                {/* Impact highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {exp.impact.map((item: string, i: number) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                fontSize: 14,
                                color: '#a1a1aa',
                            }}
                        >
                            <TrendingUp style={{ width: 14, height: 14, color: isInView ? '#a78bfa' : '#71717a', transition: 'color 0.3s' }} className="flex-shrink-0" />
                            <span>
                                <AnimatedNumber value={item} />
                            </span>
                        </div>
                    ))}
                </div>
            </GlowCard>
        </motion.article>
    );
}

