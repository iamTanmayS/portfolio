

import { AboutCTA } from './about/AboutCTA';
import { AboutIntro } from './about/AboutIntro';
import { AboutNarrative } from './about/AboutNarrative';
import { AboutSkills } from './about/AboutSkills';
import { AboutExperience } from './about/AboutExperience';
import { AboutPersonal } from './about/AboutPersonal';
import { AboutPrinciples } from './about/AboutPrinciples';

/**
 * About Section
 * 
 * A full-page, scroll-based About section with 7 distinct segments.
 * Each segment has its own visual and motion identity.
 */
export function About() {
  return (
    <section
      id="home"
      data-section="home"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
   
     
      
      {/* B. Narrative / Story Section */}
      <AboutNarrative />
      
      {/* C. Skills & Capabilities Matrix */}
      <AboutSkills />
      
      {/* D. How I Work / Principles */}
      <AboutPrinciples />
      
      {/* E. Experience Snapshot */}
      <AboutExperience />
      
      {/* F. Personal Edge */}
      <AboutPersonal />
      
      {/* G. Soft CTA */}
      <AboutCTA />
    </section>
  );
}
