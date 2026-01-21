/**
 * Motion System
 * 
 * Defines all animation variants, springs, and timing
 * to ensure consistent, premium-feeling motion across the site.
 */

// ================================
// Spring Configs
// ================================
export const springs = {
    // Fast, snappy interactions
    snappy: { type: 'spring', stiffness: 400, damping: 30 } as const,

    // Smooth, bouncy for emphasis
    bouncy: { type: 'spring', stiffness: 300, damping: 20, mass: 1 } as const,

    // Gentle, slow for ambient motion
    gentle: { type: 'spring', stiffness: 100, damping: 20 } as const,

    // Very soft, for background elements
    soft: { type: 'spring', stiffness: 50, damping: 15 } as const,

    // Magnetic pull effect
    magnetic: { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 } as const,
} as const;

// ================================
// Timing (for non-spring animations)
// ================================
export const timing = {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8,
} as const;

// ================================
// Easing Curves
// ================================
export const easings = {
    // Apple-like easing
    smooth: [0.25, 0.1, 0.25, 1],
    // Overshoot for emphasis
    overshoot: [0.34, 1.56, 0.64, 1],
    // Sharp in, smooth out
    easeOut: [0, 0, 0.2, 1],
    // Smooth in, sharp out
    easeIn: [0.4, 0, 1, 1],
} as const;

// ================================
// Stagger Children
// ================================
export const stagger = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
} as const;

// ================================
// Page/Section Transition Variants
// ================================
export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springs.snappy,
    },
} as const;

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: timing.normal },
    },
} as const;

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: springs.bouncy,
    },
} as const;

// ================================
// Stagger Container Variants
// ================================
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger.normal,
            delayChildren: 0.1,
        },
    },
} as const;

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springs.snappy,
    },
} as const;

// ================================
// Button Variants
// ================================
export const buttonVariants = {
    idle: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: springs.snappy,
    },
    tap: {
        scale: 0.98,
        transition: { duration: timing.fast },
    },
    disabled: {
        opacity: 0.5,
        scale: 1,
    },
} as const;

// ================================
// Navbar Variants
// ================================
export const navbarVariants = {
    collapsed: {
        width: 120,
        height: 48,
        transition: springs.bouncy,
    },
    hover: {
        width: 140,
        height: 48,
        transition: springs.magnetic,
    },
    expanded: {
        width: 'auto',
        height: 56,
        transition: springs.bouncy,
    },
} as const;

// ================================
// Card Hover Variants
// ================================
export const cardVariants = {
    idle: {
        scale: 1,
        boxShadow: '0 0 0 rgba(167, 139, 250, 0)',
    },
    hover: {
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        transition: springs.snappy,
    },
} as const;

// ================================
// Modal Variants
// ================================
export const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: timing.normal },
    },
    exit: {
        opacity: 0,
        transition: { duration: timing.fast },
    },
} as const;

export const modalContent = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: springs.bouncy,
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        y: 10,
        transition: { duration: timing.fast },
    },
} as const;

// ================================
// Scroll Reveal Variants
// ================================
export const scrollReveal = {
    hidden: {
        opacity: 0,
        y: 60,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ...springs.snappy,
            delay: 0.1,
        },
    },
} as const;

// ================================
// Parallax Config
// ================================
export const parallax = {
    slow: 0.5,   // Moves slower than scroll
    normal: 1,   // Moves with scroll
    fast: 1.5,   // Moves faster than scroll
} as const;
