/**
 * Blogs Data
 * 
 * Rich content for the Blogs/Writing section.
 * Each blog has content, tags, reading time, and metadata.
 */

export interface Blog {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    excerpt: string;
    content: string; // HTML content for now
    tags: string[];
    publishDate: string;
    readingTime: string;
    featured: boolean;
    coverImage?: string;
}

// ================================
// Blog Tags
// ================================
export const blogTags = [
    { id: 'all', label: 'All Posts' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'systems', label: 'Systems' },
    { id: 'learning', label: 'Learning' },
    { id: 'career', label: 'Career' },
    { id: 'tools', label: 'Tools' },
] as const;

// ================================
// Blogs Data
// ================================
export const blogs: Blog[] = [
    {
        id: 'building-systems-that-scale',
        slug: 'building-systems-that-scale',
        title: 'Building Systems That Scale',
        subtitle: 'Lessons from designing distributed architectures',
        excerpt: 'Scaling isn\'t about handling more traffic—it\'s about designing systems that gracefully evolve with changing requirements while maintaining simplicity.',
        content: `
      <p>When engineers talk about scale, they often focus on the wrong metrics. Requests per second, database connections, server count—these are symptoms, not causes. True scalability is about designing systems that can evolve without accumulating technical debt faster than you can pay it down.</p>
      
      <h2>The Three Pillars of Scalable Design</h2>
      
      <p>After years of building and maintaining distributed systems, I've found that scalability rests on three fundamental pillars:</p>
      
      <h3>1. Locality of Change</h3>
      <p>A well-designed system allows changes to be made locally. When you modify component A, you shouldn't need to understand or touch components B through Z. This sounds obvious, but it's surprisingly rare in practice. The key is defining clear boundaries and contracts between components.</p>
      
      <h3>2. Observable Behavior</h3>
      <p>You can't scale what you can't see. Before adding more servers, understand where time is actually spent. Before optimizing a database, know which queries matter. Observability isn't a luxury—it's the foundation of informed decisions.</p>
      
      <h3>3. Incremental Improvement</h3>
      <p>The best scaling strategies are reversible and incremental. If your "scaling solution" requires a big bang migration, you're likely over-engineering. Start with the simplest change that could possibly work, measure the results, and iterate.</p>
      
      <h2>Practical Patterns</h2>
      
      <p>Some patterns that consistently help with scalability:</p>
      
      <ul>
        <li><strong>Async by default:</strong> Synchronous operations create coupling in time. Where possible, use queues, events, and eventual consistency.</li>
        <li><strong>Caching strategically:</strong> Cache at the right layer. Application-level caching often provides better ROI than database-level optimization.</li>
        <li><strong>Feature flags:</strong> Decouple deployment from release. Ship dark, enable gradually, rollback instantly.</li>
      </ul>
      
      <h2>The Human Factor</h2>
      
      <p>Technical scalability is necessary but not sufficient. The real constraint is often cognitive load—how much complexity can your team hold in their heads? Systems that require full-stack knowledge to make any change don't scale, regardless of their architecture.</p>
      
      <p>The best scaling investment isn't infrastructure—it's documentation, onboarding, and ruthless simplification.</p>
    `,
        tags: ['engineering', 'systems'],
        publishDate: '2024-12-15',
        readingTime: '8 min read',
        featured: true,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    },
    {
        id: 'learning-in-public',
        slug: 'learning-in-public',
        title: 'Learning in Public',
        subtitle: 'Why sharing your journey accelerates growth',
        excerpt: 'The fastest way to learn isn\'t consuming content—it\'s creating it. Sharing what you learn creates accountability, feedback loops, and unexpected opportunities.',
        content: `
      <p>For years, I consumed tutorials, courses, and documentation in private. I'd read about a technology, try a few examples, and move on. The knowledge felt solid in the moment but evaporated within weeks. Then I started writing about what I learned, and everything changed.</p>
      
      <h2>The Teaching Effect</h2>
      
      <p>There's a well-documented phenomenon in cognitive science: teaching consolidates learning. When you explain something to others, you're forced to confront the gaps in your understanding. The vague parts become embarrassingly obvious.</p>
      
      <p>But you don't need students to get this benefit. Writing publicly creates the same pressure. Knowing that someone might read your explanation—and might expect it to be coherent—changes how you process information.</p>
      
      <h2>Building a Learning Habit</h2>
      
      <p>Learning in public doesn't require a polished blog or a large following. It can be as simple as:</p>
      
      <ul>
        <li>Tweet threads explaining concepts you just learned</li>
        <li>GitHub repos documenting your experiments</li>
        <li>Short posts about problems you solved</li>
        <li>Notes on books and articles you're reading</li>
      </ul>
      
      <p>The key is consistency, not quality. Your early content will be rough—that's expected and valuable. It shows growth over time.</p>
      
      <h2>Unexpected Benefits</h2>
      
      <p>Beyond faster learning, sharing publicly creates serendipity:</p>
      
      <ul>
        <li><strong>Connections:</strong> People working on similar problems find you</li>
        <li><strong>Corrections:</strong> Experts point out your mistakes (a gift, not an insult)</li>
        <li><strong>Opportunities:</strong> Job offers, collaboration invites, speaking requests</li>
      </ul>
      
      <h2>Getting Started</h2>
      
      <p>If you've never shared your learning publicly, start tomorrow. Pick something you learned this week and write 200 words about it. Don't optimize for perfection—optimize for publishing. The rest follows naturally.</p>
    `,
        tags: ['learning', 'career'],
        publishDate: '2024-11-28',
        readingTime: '5 min read',
        featured: true,
        coverImage: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80',
    },
    {
        id: 'tool-philosophy',
        slug: 'tool-philosophy',
        title: 'On Choosing Tools',
        subtitle: 'A framework for technology decisions',
        excerpt: 'The best tool isn\'t the most powerful or the most popular—it\'s the one that solves your specific problem with the least friction and future regret.',
        content: `
      <p>Every few months, a new framework claims to solve all our problems. The hype cycle is exhausting, and FOMO is real. How do you make technology choices that won't haunt you?</p>
      
      <h2>The Decision Framework</h2>
      
      <p>When evaluating any tool, I ask three questions:</p>
      
      <h3>1. What problem does this actually solve?</h3>
      <p>Be specific. "It's faster" or "It's more modern" aren't problems. "Our bundle size exceeds 2MB and hurts mobile users" is a problem. If you can't articulate the problem precisely, you're not ready to choose a solution.</p>
      
      <h3>2. What's the escape hatch?</h3>
      <p>Every tool creates lock-in. The question isn't whether you'll be locked in, but how expensive it will be to escape. Prefer tools with gradual adoption paths and clear migration strategies.</p>
      
      <h3>3. Who maintains this in 3 years?</h3>
      <p>Open source projects die. Companies pivot. Developer enthusiasm wanes. Consider the long-term health of the ecosystem, not just current popularity. Sometimes boring technology is the right choice.</p>
      
      <h2>Red Flags</h2>
      
      <ul>
        <li>Solving problems you don't have yet</li>
        <li>Requiring rewrites of working code</li>
        <li>Single-person maintainer for critical dependencies</li>
        <li>Configuration complexity disproportionate to benefits</li>
      </ul>
      
      <h2>The Meta-Skill</h2>
      
      <p>More important than any single tool choice is developing taste—the ability to quickly recognize when something fits your context. This comes from experience, from making mistakes, and from studying how others make decisions.</p>
      
      <p>The goal isn't to always choose the "best" tool. It's to make decisions you can live with, learn from, and evolve.</p>
    `,
        tags: ['tools', 'engineering'],
        publishDate: '2024-10-12',
        readingTime: '6 min read',
        featured: true,
        coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
    },
    {
        id: 'debugging-mindset',
        slug: 'debugging-mindset',
        title: 'The Debugging Mindset',
        subtitle: 'Approaching problems systematically',
        excerpt: 'Debugging isn\'t about finding bugs—it\'s about building mental models. The best debuggers aren\'t the fastest coders; they\'re the most curious investigators.',
        content: `
      <p>Some developers seem to debug effortlessly. They glance at an error, make a few targeted changes, and move on. What separates them from those who thrash for hours? It's not intelligence or experience alone—it's mindset.</p>
      
      <h2>The Scientific Method</h2>
      
      <p>Effective debugging follows a pattern:</p>
      
      <ol>
        <li><strong>Observe:</strong> What exactly is happening? What did you expect?</li>
        <li><strong>Hypothesize:</strong> What could cause this specific behavior?</li>
        <li><strong>Test:</strong> Design an experiment that confirms or refutes your hypothesis</li>
        <li><strong>Iterate:</strong> Refine your model based on results</li>
      </ol>
      
      <p>Most debugging frustration comes from skipping steps. We jump from observation to random changes, hoping something works. This occasionally succeeds but teaches nothing.</p>
      
      <h2>Common Traps</h2>
      
      <ul>
        <li><strong>Assumption blindness:</strong> "That can't be it" blocks investigation of actual causes</li>
        <li><strong>Tunnel vision:</strong> Focusing on one area while the bug lives elsewhere</li>
        <li><strong>Temporal confusion:</strong> Assuming recent changes caused old bugs</li>
      </ul>
      
      <h2>Practical Techniques</h2>
      
      <p>Tools that consistently help:</p>
      
      <ul>
        <li>Rubber duck debugging—explaining the problem forces clarity</li>
        <li>Binary search—halving the problem space with each test</li>
        <li>Minimal reproduction—stripping away complexity reveals root causes</li>
        <li>Taking breaks—fresh eyes catch what tired ones miss</li>
      </ul>
      
      <p>Debugging is a skill that transfers across languages, frameworks, and domains. Invest in it deliberately.</p>
    `,
        tags: ['engineering', 'learning'],
        publishDate: '2024-09-20',
        readingTime: '5 min read',
        featured: false,
    },
    {
        id: 'documentation-as-design',
        slug: 'documentation-as-design',
        title: 'Documentation as Design',
        subtitle: 'Writing docs before writing code',
        excerpt: 'The act of documenting often reveals design flaws that coding wouldn\'t catch until much later. Docs aren\'t an afterthought—they\'re a design tool.',
        content: `
      <p>Most documentation is written after the fact, bolted onto finished code as an obligation. This approach wastes the most valuable aspect of documentation: its ability to improve design.</p>
      
      <h2>Docs-First Development</h2>
      
      <p>Before writing implementation code, try writing:</p>
      
      <ul>
        <li>The README explaining what this does and why</li>
        <li>The API documentation showing how others use it</li>
        <li>The tutorial walking through common scenarios</li>
      </ul>
      
      <p>These artifacts force you to think from the user's perspective. Confusing explanations reveal confusing designs. If you can't explain the API simply, simplify the API.</p>
      
      <h2>Benefits</h2>
      
      <ul>
        <li><strong>Faster iteration:</strong> Changing prose is cheaper than changing code</li>
        <li><strong>Better names:</strong> Writing forces you to name things clearly</li>
        <li><strong>Scope control:</strong> Documented scope is easier to defend</li>
      </ul>
      
      <p>Documentation isn't overhead—it's thinking made visible.</p>
    `,
        tags: ['engineering', 'tools'],
        publishDate: '2024-08-15',
        readingTime: '4 min read',
        featured: false,
    },
    {
        id: 'career-leverage',
        slug: 'career-leverage',
        title: 'Finding Career Leverage',
        subtitle: 'Working smarter in tech',
        excerpt: 'Career growth isn\'t linear effort—it\'s about finding leverage points where small investments create disproportionate returns.',
        content: `
      <p>Early in my career, I believed effort correlated directly with outcomes. Work harder, get more. This is true to a point, but past that point, leverage matters more than hours.</p>
      
      <h2>Types of Leverage</h2>
      
      <h3>Skill Leverage</h3>
      <p>Some skills multiply your effectiveness. Communication lets you influence without authority. Writing scales your ideas. Teaching creates allies. These "soft" skills often have harder impact than technical expertise.</p>
      
      <h3>Position Leverage</h3>
      <p>Where you work matters. The same person with the same skills achieves different outcomes in different contexts. Seek environments where your strengths are valued and your growth is supported.</p>
      
      <h3>Network Leverage</h3>
      <p>Relationships compound. Every person you help genuinely might help you later—or connect you to someone who can. This isn't transactional; it's how communities work.</p>
      
      <h2>Finding Your Leverage</h2>
      
      <p>Ask: Where do I have unfair advantages? What comes easy to me that's hard for others? What problems do I uniquely understand? Build there.</p>
    `,
        tags: ['career', 'learning'],
        publishDate: '2024-07-08',
        readingTime: '4 min read',
        featured: false,
    },
];

// ================================
// Helpers
// ================================
export const getFeaturedBlogs = () => blogs.filter(b => b.featured);
export const getAllBlogs = () => blogs;
export const getBlogBySlug = (slug: string) => blogs.find(b => b.slug === slug);
export const getBlogsByTag = (tag: string) =>
    tag === 'all' ? blogs : blogs.filter(b => b.tags.includes(tag));
