"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * LiquidCursor Component
 * A fluid liquid blob that surrounds the native cursor with organic motion.
 * Uses SVG gooey filter for the liquid merging effect.
 */

// Spring configs for different blob speeds
const mainSpring = { stiffness: 500, damping: 28, mass: 0.5 };
const trail1Spring = { stiffness: 300, damping: 30, mass: 0.8 };
const trail2Spring = { stiffness: 180, damping: 35, mass: 1.2 };

export function CustomCursor() {
    const { resolvedTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(true);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [velocity, setVelocity] = useState(0);
    const lastPos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(Date.now());

    // Raw mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Main blob - follows quickly
    const mainX = useSpring(mouseX, mainSpring);
    const mainY = useSpring(mouseY, mainSpring);

    // Trail blob 1 - follows with delay
    const trail1X = useSpring(mouseX, trail1Spring);
    const trail1Y = useSpring(mouseY, trail1Spring);

    // Trail blob 2 - follows with more delay
    const trail2X = useSpring(mouseX, trail2Spring);
    const trail2Y = useSpring(mouseY, trail2Spring);

    // Blob color based on theme
    const blobColor = resolvedTheme === "dark" ? "#ffffff" : "#000000";

    // Check for touch device
    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice(
                "ontouchstart" in window || navigator.maxTouchPoints > 0
            );
        };
        checkTouch();
        window.addEventListener("touchstart", () => setIsTouchDevice(true), { once: true });
    }, []);

    // Mouse move handler with velocity tracking
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const now = Date.now();
        const dt = now - lastTime.current;

        if (dt > 0) {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy) / dt;
            setVelocity(Math.min(speed * 10, 1)); // Normalize to 0-1
        }

        lastPos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;

        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    }, [mouseX, mouseY]);

    // Visibility handlers
    const handleMouseEnter = useCallback(() => setIsVisible(true), []);
    const handleMouseLeave = useCallback(() => setIsVisible(false), []);

    // Decay velocity over time
    useEffect(() => {
        const interval = setInterval(() => {
            setVelocity(v => Math.max(0, v - 0.05));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Set up event listeners
    useEffect(() => {
        if (isTouchDevice) return;

        window.addEventListener("mousemove", handleMouseMove);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isTouchDevice, handleMouseMove, handleMouseEnter, handleMouseLeave]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    // Trail opacity based on velocity
    const trail1Opacity = 0.15 + velocity * 0.25;
    const trail2Opacity = 0.1 + velocity * 0.2;

    return (
        <>
            {/* SVG Gooey Filter Definition */}
            <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                    <filter id="gooey-cursor">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Cursor Container with Gooey Filter */}
            <div
                className="fixed inset-0 pointer-events-none z-[9999]"
                style={{ filter: "url(#gooey-cursor)" }}
                aria-hidden="true"
            >
                {/* Main Blob */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        x: mainX,
                        y: mainY,
                        width: 60,
                        height: 60,
                        backgroundColor: blobColor,
                        opacity: isVisible ? 0.4 : 0,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />

                {/* Trail Blob 1 */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        x: trail1X,
                        y: trail1Y,
                        width: 50,
                        height: 50,
                        backgroundColor: blobColor,
                        opacity: isVisible ? trail1Opacity : 0,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />

                {/* Trail Blob 2 */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        x: trail2X,
                        y: trail2Y,
                        width: 33,
                        height: 33,
                        backgroundColor: blobColor,
                        opacity: isVisible ? trail2Opacity : 0,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />
            </div>
        </>
    );
}
