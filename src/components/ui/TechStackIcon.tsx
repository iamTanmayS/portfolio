import { 
  Code2, Database, Globe, Cpu, Layout, Server, 
  Terminal, Shield, Zap, Box, Layers, PenTool,
  GitBranch, Smartphone, Cloud, Lock
} from 'lucide-react';
import React from 'react';

// Map of tech names to Lucide icons
const iconMap: Record<string, React.ElementType> = {
  // Frontend / Frameworks
  'React': Code2,
  'Next.js': Globe,
  'TypeScript': Code2,
  'JavaScript': Code2,
  'Vue': Layout,
  'Tailwind': PenTool,
  'HTML': Layout,
  'CSS': Layout,
  'Framer Motion': Zap,
  'GSAP': Zap,
  
  // Backend / Database
  'Node.js': Server,
  'Python': Terminal,
  'PostgreSQL': Database,
  'Redis': Database,
  'MongoDB': Database,
  'GraphQL': GitBranch,
  'FastAPI': Zap,
  
  // AI / ML
  'OpenAI': Cpu,
  'TensorFlow': Cpu,
  'PyTorch': Cpu,
  'MLflow': Layers,
  
  // Infra / Tools
  'Docker': Box,
  'AWS': Cloud,
  'Firebase': Cloud,
  'Git': GitBranch,
  'Figma': PenTool,
  'Solidity': Lock,
  'Smart Contracts': Shield,
};

// Fallback icon
const DefaultIcon = Code2;

interface TechStackIconProps {
  tech: string;
  size?: number;
  className?: string;
}

export function TechStackIcon({ tech, size = 16, className = '' }: TechStackIconProps) {
  // Normalize the key lookup
  const key = Object.keys(iconMap).find(k => 
    k.toLowerCase() === tech.toLowerCase() || 
    tech.toLowerCase().includes(k.toLowerCase())
  );
  
  const IconComponent = key ? iconMap[key] : DefaultIcon;

  return <IconComponent size={size} className={className} />;
}
