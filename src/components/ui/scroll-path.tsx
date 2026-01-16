"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * ScrollPath Component
 * A Lusion-style scroll-linked SVG path that draws progressively as the user scrolls.
 * Now features swirls, loops, and branching paths.
 */
export function ScrollPath() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress: ["start center"] delays start until container top is at viewport center
    // This prevents the path from "running ahead"
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    // Softer spring physics to match smooth scrolling
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    // Main path draws from 0 to 1 as user scrolls
    const mainPathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

    // Branch path starts drawing after main path is 30% done
    const branchPathLength = useTransform(smoothProgress, [0.3, 1], [0, 1]);

    // Stroke width increases as user scrolls
    const strokeWidth = useTransform(scrollYProgress, [0, 1], [1, 3]);
    const branchStrokeWidth = useTransform(scrollYProgress, [0.3, 1], [0.5, 2]);

    // Opacity
    const strokeOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0.15, 0.4, 0.5]);
    const branchOpacity = useTransform(scrollYProgress, [0.25, 0.35, 1], [0, 0.3, 0.4]);

    // Accent points
    const accents = [
        { progress: 0.15, x: 15, y: 12 },
        { progress: 0.35, x: 85, y: 25 },
        { progress: 0.55, x: 20, y: 45 },
        { progress: 0.75, x: 75, y: 65 },
        { progress: 0.9, x: 50, y: 88 },
    ];



    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block"
            aria-hidden="true"
        >
            <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
            >
                {/* Main flowing path with swirls and loops */}
                <motion.path
                    d="
                        M 10 0
                        Q 5 5, 15 8
                        Q 30 10, 25 15
                        C 15 18, 5 20, 20 25
                        Q 40 28, 60 22
                        C 80 18, 90 25, 75 32
                        Q 55 40, 70 45
                        C 90 50, 85 55, 65 58
                        Q 40 62, 25 55
                        C 10 50, 5 58, 20 65
                        Q 45 72, 30 78
                        C 20 82, 30 88, 48 86
                        Q 60 85, 68 89
                        C 68 93, 85 100, -60 102

                    "

                    stroke="currentColor"
                    className="text-foreground/30 dark:text-white/40"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        pathLength: mainPathLength,
                        strokeWidth,
                        opacity: strokeOpacity,
                    }}
                />

                {/* Branching path - splits off from main around 30% */}
                <motion.path
                    d="
                        M 75 32
                        Q 88 35, 92 42
                        C 95 52, 88 60, 80 65
                        Q 72 70, 78 78
                        C 85 85, 90 90, 85 85
                        L 100 100
                    "

                    stroke="currentColor"
                    className="text-foreground/20 dark:text-white/30"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        pathLength: branchPathLength,
                        strokeWidth: branchStrokeWidth,
                        opacity: branchOpacity,
                    }}

                />
            </svg>

            {/* Accent bubbles at key points */}
            {accents.map((accent, idx) => (
                <AccentBubble
                    key={`bubble-${idx}`}
                    progress={smoothProgress}
                    targetProgress={accent.progress}
                    style={{
                        top: `${accent.y}%`,
                        left: `${accent.x}%`,
                    }}
                />
            ))}
        </div>
    );
}


// Large accent bubble that appears at a specific scroll progress
function AccentBubble({
    progress,
    targetProgress,
    style
}: {
    progress: ReturnType<typeof useSpring>;
    targetProgress: number;
    style: React.CSSProperties;
}) {
    // Bubble swells in and slowly fades
    const opacity = useTransform(
        progress,
        [targetProgress - 0.15, targetProgress, targetProgress + 0.25],
        [0, 0.5, 0]
    );

    const scale = useTransform(
        progress,
        [targetProgress - 0.15, targetProgress, targetProgress + 0.25],
        [0.5, 1.2, 0.8]
    );

    return (
        <motion.div
            className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 blur-2xl dark:from-primary/20 dark:to-blue-500/20"
            style={{
                ...style,
                opacity,
                scale,
            }}
        />
    );
}
