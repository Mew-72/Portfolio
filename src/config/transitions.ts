/**
 * Centralized transition configuration for consistent motion across the site.
 * Import these constants instead of using magic numbers in components.
 */

export const TRANSITION = {
    /** Delay between staggered children (seconds) */
    stagger: 0.08,
    /** Default animation duration (seconds) */
    duration: 0.5,
    /** Default easing curve (smooth deceleration) */
    ease: [0.22, 1, 0.36, 1] as const,
    /** Spring configuration for interactive elements */
    spring: {
        stiffness: 300,
        damping: 20
    }
};

/** Variants for staggered container animations */
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: TRANSITION.stagger
        }
    }
};

/** Variants for fade-up entrance animations */
export const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: TRANSITION.duration,
            ease: TRANSITION.ease
        }
    }
};
