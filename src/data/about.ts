/**
 * About Section Data
 * 
 * Centralized content for the About page.
 * Updated to reflect real experience, projects, and tech stack.
 */

export interface Skill {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface SkillCategory {
    id: string;
    title: string;
    skills: Skill[];
    accent: string;
}

export interface Principle {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    period: string;
    impact: string[];
    current?: boolean;
}

// ================================
// Identity
// ================================
export const identity = {
    name: 'Tanmay Shukla',
    role: 'Full Stack Developer',
    philosophy: 'Build systems that are simple, reliable, and scalable.',
    location: 'India',
};

// ================================
// Narrative
// ================================
export const narrative = {
    intro: `I approach development with a systems-first mindset.
I care about how things work end-to-end, not just how they look or compile.`,

    focus: [
        { label: 'Clean Code', description: 'Readable, maintainable, predictable' },
        { label: 'Real-world Systems', description: 'Built for actual users and constraints' },
        { label: 'Security', description: 'Authentication, authorization, and data safety' },
        { label: 'Reliability', description: 'Testing, validation, and edge cases' },
    ],

    story: `I started with frontend development and gradually moved deeper into backend systems,
authentication flows, APIs, and data handling.

Through internships and personal projects, I’ve worked on production-like systems involving
email workflows, fraud prevention, real-time communication, and admin dashboards.

I enjoy understanding the full picture—from UI decisions to backend trade-offs—and building
solutions that hold up beyond demos.`,
};

// ================================
// Skills
// ================================
export const skillCategories: SkillCategory[] = [
    {
        id: 'frontend',
        title: 'Frontend Development',
        accent: '#67e8f9',
        skills: [
            { id: 'react', name: 'React', description: 'Component-based UI, hooks', icon: 'Layers' },
            { id: 'react-native', name: 'React Native', description: 'Cross-platform mobile apps', icon: 'Smartphone' },
            { id: 'typescript', name: 'TypeScript', description: 'Type-safe JavaScript', icon: 'FileCode' },
            { id: 'css', name: 'CSS', description: 'Responsive layouts, UI polish', icon: 'Palette' },
        ],
    },
    {
        id: 'backend',
        title: 'Backend & APIs',
        accent: '#a78bfa',
        skills: [
            { id: 'nodejs', name: 'Node.js', description: 'REST APIs, server logic', icon: 'Server' },
            { id: 'express', name: 'Express.js', description: 'API routing & middleware', icon: 'Route' },
            { id: 'oauth', name: 'OAuth 2.0', description: 'Secure authentication flows', icon: 'Key' },
            { id: 'realtime', name: 'WebSockets', description: 'Real-time communication', icon: 'Activity' },
        ],
    },
    {
        id: 'data',
        title: 'Data & Persistence',
        accent: '#f9a8d4',
        skills: [
            { id: 'postgres', name: 'PostgreSQL', description: 'Relational data modeling', icon: 'Database' },
            { id: 'mongodb', name: 'MongoDB', description: 'Document-based storage', icon: 'Layers3' },
            { id: 'validation', name: 'Data Validation', description: 'Integrity & consistency', icon: 'CheckCircle' },
        ],
    },
    {
        id: 'tools',
        title: 'Tools & Workflow',
        accent: '#a1a1aa',
        skills: [
            { id: 'git', name: 'Git', description: 'Version control', icon: 'GitBranch' },
            { id: 'postman', name: 'Postman', description: 'API testing', icon: 'Send' },
            { id: 'testing', name: 'Testing', description: 'Debugging & validation', icon: 'Bug' },
            { id: 'docs', name: 'Documentation', description: 'Clear technical docs', icon: 'FileText' },
        ],
    },
];

// ================================
// Principles
// ================================
export const principles: Principle[] = [
    {
        id: 'clarity',
        title: 'Clarity first',
        description: 'Readable code scales better than clever code. I optimize for understanding.',
        icon: 'Eye',
    },
    {
        id: 'systems',
        title: 'Think end-to-end',
        description: 'Frontend, backend, data, and users are part of the same system.',
        icon: 'Network',
    },
    {
        id: 'security',
        title: 'Security by design',
        description: 'Auth, permissions, and data handling are never afterthoughts.',
        icon: 'Shield',
    },
    {
        id: 'ownership',
        title: 'Own the outcome',
        description: 'I take responsibility from confirmation to edge cases.',
        icon: 'CheckSquare',
    },
];

// ================================
// Experience
// ================================
export const experiences: Experience[] = [
    {
        id: "Gath Global Traders",
        role: 'Web Developer Intern',
        company: 'Gatha Global Traders',
        period: 'Feb 2025 – Sep 2025',
        current: true,
        impact: [
            'Worked on React Native features for production apps',
            'Improved UI responsiveness and stability',
            'Assisted in testing, debugging, and feature integration',
        ],
    },
    {
        id: 'Vroland Tech Cube',
        role: 'React Native Developer Intern',
        company: 'Vroland Techcube LLP',
        period: 'Oct 2023 – May 2024',
        impact: [
            'Built responsive UI components using React Native',
            'Developed admin dashboard with CRUD operations',
            'Integrated backend APIs and improved data handling',
        ],
    },
];

// ================================
// Personal Edge
// ================================
export const personalEdge = {
    obsessions: [
        'Real-world system design',
        'Authentication & security flows',
        'Clean UI with solid backend logic',
        'Understanding how things break',
    ],
    approach: `I prefer depth over noise. When something fails, 
I trace it back to the root cause instead of patching symptoms.`,
    currentlyLearning: 'Deeper backend architecture & system design',
};
