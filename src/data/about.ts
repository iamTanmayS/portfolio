/**
 * About Section Data
 *
 * Systems-focused narrative with complete skill coverage.
 * Professional, grounded, and experience-driven.
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
    role: 'Software Engineer | Backend, Systems & Application Development',
    philosophy:
        'I focus on building software that behaves predictably, can be reasoned about, and evolves safely over time.',
    location: 'India',
};

// ================================
// Narrative
// ================================
export const narrative = {
    intro: `I work on backend systems with a focus on APIs, data integrity, and predictable behavior under real-world conditions.`,

    focus: [
        {
            label: 'System Design',
            description:
                'Clear boundaries, predictable behavior, and maintainable service architecture',
        },
        {
            label: 'API Engineering',
            description:
                'REST APIs, authentication flows, and contract-driven integration',
        },
        {
            label: 'Reliability & Quality',
            description:
                'Validation, testing, error handling, and safe change',
        },
        {
            label: 'End-to-End Ownership',
            description:
                'From implementation to testing, documentation, and iteration',
        },
    ],

    story: `I started by building user-facing applications, which taught me how product decisions translate into real usage and constraints. Over time, I became more interested in what happens behind the scenes—how requests flow through systems, how data is validated, and how failures surface.

As I worked on more production-facing features, my focus shifted toward backend development and system behavior. I spent time understanding authentication flows, API contracts, real-time coordination, and the impact of small changes on overall stability. Debugging issues in live systems taught me the value of clear logging, predictable state changes, and defensive design.

Today, I approach development by thinking in terms of systems rather than features. I try to understand the full lifecycle of a change: how it’s introduced, how it behaves under edge cases, and how it will be maintained months later. I prefer simple, explicit solutions that are easy to reason about and safe to evolve.`,
};

// ================================
// Skills
// ================================
export const skillCategories: SkillCategory[] = [
    {
        id: 'frontend',
        title: 'Frontend & Client Applications',
        accent: '#67e8f9',
        skills: [
            {
                id: 'react',
                name: 'React',
                description: 'Component-based UI development and state management',
                icon: 'Layers',
            },
            {
                id: 'react-native',
                name: 'React Native',
                description: 'Cross-platform mobile application development',
                icon: 'Smartphone',
            },
            {
                id: 'typescript',
                name: 'TypeScript',
                description: 'Type-safe application development',
                icon: 'FileCode',
            },
            {
                id: 'html-css',
                name: 'HTML & CSS',
                description: 'Responsive layouts and modern styling',
                icon: 'Palette',
            },
        ],
    },
    {
        id: 'backend',
        title: 'Backend & APIs',
        accent: '#a78bfa',
        skills: [
            {
                id: 'nodejs',
                name: 'Node.js',
                description: 'Backend services and API implementation',
                icon: 'Server',
            },
            {
                id: 'express',
                name: 'Express.js',
                description: 'Routing, middleware, and request lifecycle handling',
                icon: 'Route',
            },
            {
                id: 'oauth',
                name: 'OAuth 2.0',
                description: 'Authentication and authorization workflows',
                icon: 'Key',
            },
            {
                id: 'websockets',
                name: 'WebSockets',
                description: 'Real-time client–server communication',
                icon: 'Activity',
            },
        ],
    },
    {
        id: 'data',
        title: 'Data & Persistence',
        accent: '#f9a8d4',
        skills: [
            {
                id: 'postgres',
                name: 'PostgreSQL',
                description: 'Relational modeling and transactional operations',
                icon: 'Database',
            },
            {
                id: 'python',
                name: 'Python',
                description: 'Scripting, automation, and backend utilities',
                icon: 'Code',
            },
            {
                id: 'validation',
                name: 'Data Validation',
                description: 'Input validation and error handling',
                icon: 'CheckCircle',
            },
        ],
    },
    {
        id: 'tooling',
        title: 'Tools & Workflow',
        accent: '#a1a1aa',
        skills: [
            {
                id: 'git',
                name: 'Git & GitHub',
                description: 'Version control and collaborative workflows',
                icon: 'GitBranch',
            },
            {
                id: 'postman',
                name: 'Postman',
                description: 'API testing and request validation',
                icon: 'Send',
            },
            {
                id: 'testing',
                name: 'Testing & Debugging',
                description: 'Unit tests, debugging, and validation',
                icon: 'Bug',
            },
            {
                id: 'linux',
                name: 'Linux',
                description: 'Command-line usage and environment familiarity',
                icon: 'Terminal',
            },
        ],
    },
];

// ================================
// How I Work (Principles)
// ================================
export const principles: Principle[] = [
    {
        id: 'correctness',
        title: 'Correctness first',
        description:
            'I focus on predictable behavior, especially around edge cases and failures.',
        icon: 'CheckSquare',
    },
    {
        id: 'contracts',
        title: 'Clear contracts',
        description:
            'APIs and interfaces should be explicit and easy to reason about.',
        icon: 'Network',
    },
    {
        id: 'security',
        title: 'Security as a baseline',
        description:
            'Authentication, authorization, and validation are built in by default.',
        icon: 'Shield',
    },
    {
        id: 'change',
        title: 'Safe change',
        description:
            'I prefer small, testable changes that can be rolled back if needed.',
        icon: 'FileText',
    },
    {
        id: 'observability',
        title: 'Understand before optimizing',
        description:
            'I rely on logs, debugging, and clear signals before making performance decisions.',
        icon: 'Eye',
    },
    {
        id: 'communication',
        title: 'Write it down',
        description:
            'Clear documentation and comments help teams move faster over time.',
        icon: 'Edit',
    },
];

// ================================
// Experience (UNCHANGED)
// ================================
export const experiences: Experience[] = [
    {
        id: 'gatha-global',
        role: 'Technology Intern',
        company: 'Gatha Global Traders',
        period: 'Feb 2025 – Sep 2025',
        current: true,
        impact: [
            'Supported development and integration of application features following defined technical specifications',
            'Performed unit testing, debugging, and validation to ensure stable and secure delivery',
            'Adhered to established processes and tools to maintain quality and consistency',
            'Collaborated with team members to support timely execution and issue resolution',
        ],
    },
    {
        id: 'vroland-techcube',
        role: 'React Native Developer Intern',
        company: 'Vroland Techcube LLP',
        period: 'Oct 2023 – May 2024',
        impact: [
            'Supported delivery of application features through structured development and testing',
            'Translated functional requirements into technical implementations in coordination with stakeholders',
            'Created and maintained technical documentation to support ongoing development',
            'Conducted testing and performance checks to improve reliability and usability',
        ],
    },
];

// ================================
// Personal Edge
// ================================
export const personalEdge = {
    obsessions: [
        'System behavior under real-world conditions',
        'Authentication and trust boundaries',
        'Data integrity and validation',
        'Reducing accidental complexity',
    ],
    approach: `I try to think in terms of systems rather than isolated features. My goal is to make changes that are easy to understand, easy to test, and safe to maintain over time.`,
    currentlyLearning:
        'System design fundamentals, backend scalability concepts, containerization (Docker), and cloud-native patterns',
};
