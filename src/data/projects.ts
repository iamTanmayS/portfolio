/**
 * Projects Data
 * 
 * Rich content for the Projects section.
 * Each project has problem/solution, media, tech stack, and learnings.
 */

export interface ProjectMedia {
    type: 'image' | 'video';
    url: string;
    poster?: string; // For videos
    alt: string;
}

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    category: 'ai-ml' | 'full-stack' | 'blockchain' | 'tools' | 'experimental';
    featured: boolean;

    // Rich content
    problem: string;
    solution: string;
    learnings: string[];

    // Media
    thumbnail: string;
    media: ProjectMedia[];

    // Tech
    techStack: string[];

    // Links
    liveUrl?: string;
    githubUrl?: string;
    caseStudyUrl?: string;

    // Metadata
    year: string;
    duration?: string;
    role?: string;
}

// ================================
// Categories
// ================================
export const projectCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-ml', label: 'AI / ML' },
    { id: 'full-stack', label: 'Full-Stack' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'tools', label: 'Tools' },
    { id: 'experimental', label: 'Experimental' },
] as const;

// ================================
// Projects Data
// ================================
export const projects: Project[] = [
    {
        id: 'ai-design-system',
        title: 'AI-Powered Design System',
        tagline: 'Generative UI components that adapt to user behavior',
        description: 'A comprehensive design system with AI-assisted component generation. Features automatic color palette creation, responsive layouts, and accessibility compliance checking.',
        category: 'ai-ml',
        featured: true,

        problem: 'Design systems are static. They require constant manual updates to stay relevant, and designers spend hours on repetitive tasks like color matching and responsive adjustments.',
        solution: 'Built a design system that uses machine learning to understand design patterns and generate contextually appropriate components. The AI analyzes usage patterns and suggests optimizations.',
        learnings: [
            'Training ML models on design data requires careful curation',
            'Real-time inference needs aggressive caching strategies',
            'User trust is earned through explainable AI decisions',
        ],

        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80', alt: 'Design System Dashboard' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80', alt: 'Component Library' },
        ],

        techStack: ['React', 'TypeScript', 'OpenAI', 'Tailwind', 'Figma API'],

        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',

        year: '2024',
        duration: '3 months',
        role: 'Lead Developer',
    },
    {
        id: 'realtime-collab',
        title: 'Real-time Collaboration Platform',
        tagline: 'Figma-like workspace for distributed teams',
        description: 'A collaborative workspace built with WebSocket technology. Supports live cursors, shared editing, and version history with conflict resolution.',
        category: 'full-stack',
        featured: true,

        problem: 'Remote teams struggle with real-time collaboration. Existing tools either lack real-time features or have poor conflict resolution, leading to lost work.',
        solution: 'Implemented CRDTs (Conflict-free Replicated Data Types) for seamless real-time editing. Built a custom presence system showing live cursors and user states.',
        learnings: [
            'CRDTs are powerful but require careful implementation',
            'Presence features dramatically improve collaboration UX',
            'WebSocket connection management is critical at scale',
        ],

        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', alt: 'Collaboration Interface' },
        ],

        techStack: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis', 'Y.js'],

        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',

        year: '2024',
        duration: '4 months',
        role: 'Full-Stack Developer',
    },
    {
        id: 'defi-protocol',
        title: 'DeFi Lending Protocol',
        tagline: 'Decentralized lending with dynamic interest rates',
        description: 'A DeFi protocol enabling peer-to-peer lending with algorithmic interest rates based on supply and demand.',
        category: 'blockchain',
        featured: true,

        problem: 'Traditional lending is slow, requires intermediaries, and excludes many due to credit requirements. DeFi can democratize access but current protocols lack sophistication.',
        solution: 'Designed a lending protocol with dynamic interest curves, flash loan protection, and a liquidation system that minimizes bad debt while being fair to borrowers.',
        learnings: [
            'Smart contract security requires multiple audit rounds',
            'Gas optimization is a constant balancing act',
            'Tokenomics must align incentives across all participants',
        ],

        thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80', alt: 'DeFi Dashboard' },
        ],

        techStack: ['Solidity', 'Hardhat', 'React', 'ethers.js', 'The Graph'],

        githubUrl: 'https://github.com',

        year: '2023',
        duration: '6 months',
        role: 'Smart Contract Developer',
    },
    {
        id: 'motion-library',
        title: 'Motion Graphics Library',
        tagline: 'Production-ready animations for React',
        description: 'A React library for creating complex motion graphics and animations. Includes timeline editor, spring physics, and gesture handling.',
        category: 'tools',
        featured: false,

        problem: 'Creating polished animations in React requires extensive boilerplate. Existing libraries are either too simple or too complex for production use.',
        solution: 'Built a library that abstracts complexity while exposing power when needed. Declarative API for simple cases, imperative escape hatches for complex sequences.',
        learnings: [
            'API design is the hardest part of library development',
            'Performance requires understanding browser internals',
            'Documentation is as important as code quality',
        ],

        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80', alt: 'Animation Editor' },
        ],

        techStack: ['React', 'GSAP', 'Three.js', 'WebGL'],

        githubUrl: 'https://github.com',

        year: '2024',
        role: 'Creator',
    },
    {
        id: 'dev-portfolio',
        title: 'Developer Portfolio Template',
        tagline: 'Premium animated portfolio with dark mode and CMS',
        description: 'An open-source portfolio template with premium animations, dark mode, and CMS integration. Built for developers who want to stand out.',
        category: 'full-stack',
        featured: false,

        problem: 'Developer portfolios often look generic or over-animated. Finding the balance between polish and authenticity is hard.',
        solution: 'Created a template that feels premium through intentional motion design, not animation quantity. Every interaction has purpose.',
        learnings: [
            'Motion design is about restraint, not excess',
            'Dark themes require careful color calibration',
            'Performance and aesthetics can coexist',
        ],

        thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80', alt: 'Portfolio Preview' },
        ],

        techStack: ['Astro', 'React', 'MDX', 'Tailwind'],

        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',

        year: '2024',
        role: 'Creator',
    },
    {
        id: 'ml-pipeline',
        title: 'ML Pipeline Orchestrator',
        tagline: 'Visual workflow builder for ML experiments',
        description: 'A visual tool for building and monitoring ML pipelines. Drag-and-drop interface with real-time experiment tracking.',
        category: 'ai-ml',
        featured: false,

        problem: 'ML workflows are complex and often undocumented. Data scientists spend more time on infrastructure than on actual modeling.',
        solution: 'Built a visual pipeline builder that generates reproducible workflows. Integrated experiment tracking, artifact management, and one-click deployment.',
        learnings: [
            'Visual programming requires careful UX design',
            'ML infrastructure is as important as models',
            'Reproducibility must be baked in, not bolted on',
        ],

        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', alt: 'Pipeline Editor' },
        ],

        techStack: ['Python', 'React', 'FastAPI', 'Docker', 'MLflow'],

        githubUrl: 'https://github.com',

        year: '2023',
        role: 'Lead Developer',
    },
];

// ================================
// Helpers
// ================================
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) =>
    category === 'all' ? projects : projects.filter(p => p.category === category);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
