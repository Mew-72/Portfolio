import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase);
}

interface NavItem {
    label: string;
    href: string;
    shape: string;
}

const navItems: NavItem[] = [
    { label: "Home", href: "#home", shape: "1" },
    { label: "About Me", href: "#about", shape: "2" },
    { label: "Projects", href: "#projects", shape: "3" },
    { label: "Skills", href: "#skills", shape: "4" },
    { label: "Contact", href: "#contact", shape: "2" },
];

export function KineticNavigation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const menuTlRef = useRef<gsap.core.Timeline | null>(null);
    const isFirstRender = useRef(true);

    const toggleTheme = useCallback(() => {
        setTheme(theme === "light" ? "dark" : "light");
    }, [theme, setTheme]);

    // Initial Setup & Hover Effects
    useEffect(() => {
        if (!containerRef.current) return;

        try {
            if (!gsap.parseEase("main")) {
                CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
                gsap.defaults({ ease: "main", duration: 0.7 });
            }
        } catch {
            gsap.defaults({ ease: "power2.out", duration: 0.7 });
        }

        const ctx = gsap.context(() => {
            const menuItems =
                containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
            const shapesContainer = containerRef.current!.querySelector(
                ".ambient-background-shapes"
            );

            menuItems.forEach((item) => {
                const shapeIndex = item.getAttribute("data-shape");
                const shape = shapesContainer
                    ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`)
                    : null;

                if (!shape) return;

                const shapeEls = shape.querySelectorAll(".shape-element");

                const onEnter = () => {
                    if (shapesContainer) {
                        shapesContainer
                            .querySelectorAll(".bg-shape")
                            .forEach((s) => s.classList.remove("active"));
                    }
                    shape.classList.add("active");

                    gsap.fromTo(
                        shapeEls,
                        { scale: 0.5, opacity: 0, rotation: -10 },
                        {
                            scale: 1,
                            opacity: 1,
                            rotation: 0,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: "back.out(1.7)",
                            overwrite: "auto",
                        }
                    );
                };

                const onLeave = () => {
                    gsap.to(shapeEls, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => shape.classList.remove("active"),
                        overwrite: "auto",
                    });
                };

                item.addEventListener("mouseenter", onEnter);
                item.addEventListener("mouseleave", onLeave);

                (item as any)._cleanup = () => {
                    item.removeEventListener("mouseenter", onEnter);
                    item.removeEventListener("mouseleave", onLeave);
                };
            });
        }, containerRef);

        return () => {
            ctx.revert();
            if (containerRef.current) {
                const items =
                    containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
                items.forEach((item: any) => item._cleanup && item._cleanup());
            }
        };
    }, []);

    // Build the menu timeline ONCE on mount (paused at start)
    useEffect(() => {
        if (!containerRef.current) return;

        const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current.querySelector(".menu-content");
        const overlay = containerRef.current.querySelector(".overlay");
        const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");
        const menuLinks = containerRef.current.querySelectorAll(".nav-link");
        const fadeTargets = containerRef.current.querySelectorAll("[data-menu-fade]");
        const menuButton = containerRef.current.querySelector(".nav-close-btn");
        const menuButtonTexts = menuButton?.querySelectorAll("p");
        const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

        const tl = gsap.timeline({
            paused: true,
            onStart: () => {
                if (navWrap) navWrap.setAttribute("data-nav", "open");
            },
            onReverseComplete: () => {
                if (navWrap) {
                    navWrap.setAttribute("data-nav", "closed");
                    gsap.set(navWrap, { display: "none" });
                }
            },
        });

        // Build the full OPEN sequence — reverse() will play this backwards
        tl.set(navWrap, { display: "block" })
            .set(menu, { xPercent: 0 }, "<");

        if (menuButtonTexts) {
            tl.fromTo(
                menuButtonTexts,
                { yPercent: 0 },
                { yPercent: -100, stagger: 0.2 }
            );
        }
        if (menuButtonIcon) {
            tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<");
        }

        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
            .fromTo(
                bgPanels,
                { xPercent: 101 },
                { xPercent: 0, stagger: 0.12, duration: 0.575 },
                "<"
            )
            .fromTo(
                menuLinks,
                { yPercent: 140, rotate: 10 },
                { yPercent: 0, rotate: 0, stagger: 0.05 },
                "<+=0.35"
            );

        if (fadeTargets.length) {
            tl.fromTo(
                fadeTargets,
                { autoAlpha: 0, yPercent: 50 },
                { autoAlpha: 1, yPercent: 0, stagger: 0.04 },
                "<+=0.2"
            );
        }

        menuTlRef.current = tl;

        return () => {
            tl.kill();
            menuTlRef.current = null;
        };
    }, []);

    // Play / Reverse the timeline based on menu state
    useEffect(() => {
        // Skip the initial mount render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (!menuTlRef.current) return;

        if (isMenuOpen) {
            menuTlRef.current.play();
        } else {
            menuTlRef.current.reverse();
        }
    }, [isMenuOpen]);

    // Escape key handler
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        setIsMenuOpen(false);
        // Small delay so close animation plays before scroll
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }, 600);
    };

    return (
        <div ref={containerRef}>
            <div className="kinetic-header-wrapper">
                <header className="kinetic-header">
                    <nav className="kinetic-nav-row">
                        <a
                            href="#home"
                            aria-label="home"
                            className="kinetic-logo"
                            onClick={(e) => handleNavClick(e, "#home")}
                        >
                            M.
                        </a>
                        <div className="kinetic-nav-right">
                            <button
                                className="nav-close-btn"
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                            >
                                <div className="menu-button-text">
                                    <p>Menu</p>
                                    <p>Close</p>
                                </div>
                                <div className="icon-wrap">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        className="menu-button-icon"
                                    >
                                        <path
                                            d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </nav>
                </header>
            </div>

            <section className="fullscreen-menu-container">
                <div data-nav="closed" className="nav-overlay-wrapper">
                    <div className="overlay" onClick={closeMenu}></div>
                    <nav className="menu-content">
                        <div className="menu-bg">
                            <div className="backdrop-layer first"></div>
                            <div className="backdrop-layer second"></div>
                            <div className="backdrop-layer"></div>

                            {/* Abstract shapes container */}
                            <div className="ambient-background-shapes">
                                {/* Shape 1: Floating circles */}
                                <svg
                                    className="bg-shape bg-shape-1"
                                    viewBox="0 0 400 400"
                                    fill="none"
                                >
                                    <circle
                                        className="shape-element"
                                        cx="80"
                                        cy="120"
                                        r="40"
                                        fill="hsl(var(--primary) / 0.12)"
                                    />
                                    <circle
                                        className="shape-element"
                                        cx="300"
                                        cy="80"
                                        r="60"
                                        fill="hsl(var(--muted-foreground) / 0.1)"
                                    />
                                    <circle
                                        className="shape-element"
                                        cx="200"
                                        cy="300"
                                        r="80"
                                        fill="hsl(var(--primary) / 0.08)"
                                    />
                                    <circle
                                        className="shape-element"
                                        cx="350"
                                        cy="280"
                                        r="30"
                                        fill="hsl(var(--muted-foreground) / 0.12)"
                                    />
                                </svg>

                                {/* Shape 2: Wave pattern */}
                                <svg
                                    className="bg-shape bg-shape-2"
                                    viewBox="0 0 400 400"
                                    fill="none"
                                >
                                    <path
                                        className="shape-element"
                                        d="M0 200 Q100 100, 200 200 T 400 200"
                                        stroke="hsl(var(--primary) / 0.15)"
                                        strokeWidth="60"
                                        fill="none"
                                    />
                                    <path
                                        className="shape-element"
                                        d="M0 280 Q100 180, 200 280 T 400 280"
                                        stroke="hsl(var(--muted-foreground) / 0.1)"
                                        strokeWidth="40"
                                        fill="none"
                                    />
                                </svg>

                                {/* Shape 3: Grid dots */}
                                <svg
                                    className="bg-shape bg-shape-3"
                                    viewBox="0 0 400 400"
                                    fill="none"
                                >
                                    <circle className="shape-element" cx="50" cy="50" r="8" fill="hsl(var(--primary) / 0.2)" />
                                    <circle className="shape-element" cx="150" cy="50" r="8" fill="hsl(var(--muted-foreground) / 0.2)" />
                                    <circle className="shape-element" cx="250" cy="50" r="8" fill="hsl(var(--primary) / 0.2)" />
                                    <circle className="shape-element" cx="350" cy="50" r="8" fill="hsl(var(--muted-foreground) / 0.2)" />
                                    <circle className="shape-element" cx="100" cy="150" r="12" fill="hsl(var(--primary) / 0.15)" />
                                    <circle className="shape-element" cx="200" cy="150" r="12" fill="hsl(var(--muted-foreground) / 0.15)" />
                                    <circle className="shape-element" cx="300" cy="150" r="12" fill="hsl(var(--primary) / 0.15)" />
                                    <circle className="shape-element" cx="50" cy="250" r="10" fill="hsl(var(--muted-foreground) / 0.2)" />
                                    <circle className="shape-element" cx="150" cy="250" r="10" fill="hsl(var(--primary) / 0.2)" />
                                    <circle className="shape-element" cx="250" cy="250" r="10" fill="hsl(var(--muted-foreground) / 0.2)" />
                                    <circle className="shape-element" cx="350" cy="250" r="10" fill="hsl(var(--primary) / 0.2)" />
                                    <circle className="shape-element" cx="100" cy="350" r="6" fill="hsl(var(--primary) / 0.2)" />
                                    <circle className="shape-element" cx="200" cy="350" r="6" fill="hsl(var(--muted-foreground) / 0.2)" />
                                    <circle className="shape-element" cx="300" cy="350" r="6" fill="hsl(var(--primary) / 0.2)" />
                                </svg>

                                {/* Shape 4: Organic blobs */}
                                <svg
                                    className="bg-shape bg-shape-4"
                                    viewBox="0 0 400 400"
                                    fill="none"
                                >
                                    <path
                                        className="shape-element"
                                        d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                                        fill="hsl(var(--primary) / 0.1)"
                                    />
                                    <path
                                        className="shape-element"
                                        d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                                        fill="hsl(var(--muted-foreground) / 0.08)"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="menu-content-wrapper">
                            <ul className="menu-list">
                                {navItems.map((item) => (
                                    <li
                                        key={item.label}
                                        className="menu-list-item"
                                        data-shape={item.shape}
                                    >
                                        <a
                                            href={item.href}
                                            className="nav-link w-inline-block"
                                            onClick={(e) => handleNavClick(e, item.href)}
                                        >
                                            <p className="nav-link-text">{item.label}</p>
                                            <div className="nav-link-hover-bg"></div>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Bottom bar: theme toggle + socials */}
                            <div className="kinetic-menu-footer" data-menu-fade>
                                <button
                                    onClick={toggleTheme}
                                    className="kinetic-theme-toggle"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="h-5 w-5" />
                                    ) : (
                                        <Moon className="h-5 w-5" />
                                    )}
                                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                                </button>
                                <div className="kinetic-socials">
                                    <a
                                        href="https://www.linkedin.com/in/mayank-kumar77/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                    <a
                                        href="http://github.com/Mew-72/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                    </a>
                                    <a
                                        href="https://www.instagram.com/m4yhem_mk/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
        </div>
    );
}
