"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const projects = [
    {
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "E-Commerce",
        desc: "Next.js + Stripe"
    },
    {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Analytics Hub",
        desc: "Python + React"
    },
    {
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Mobile App",
        desc: "React Native"
    },
    {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Agency Site",
        desc: "Gatsby"
    },
    {
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Tech Blog",
        desc: "Astro"
    },
];

const ExpandOnHover = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(2);

    return (
        <div className="w-full py-12 flex items-center justify-center">
            <div className="flex w-full max-w-6xl items-center justify-center gap-2 px-4 h-[400px]">
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out h-full shadow-lg",
                            expandedIndex === idx ? "w-[400px] flex-grow" : "w-16 opacity-70 hover:opacity-100"
                        )}
                        onMouseEnter={() => setExpandedIndex(idx)}
                        onMouseLeave={() => setExpandedIndex(2)} // Reset to middle or keep last? Let's reset to middle for symmetry
                    >
                        <img
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                            src={project.image}
                            alt={project.title}
                            style={{
                                filter: expandedIndex === idx ? "brightness(1)" : "brightness(0.6) grayscale(0.5)",
                                transform: expandedIndex === idx ? "scale(1.1)" : "scale(1)"
                            }}
                        />

                        <div className={cn(
                            "absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 flex flex-col justify-end",
                            expandedIndex === idx ? "opacity-100" : "opacity-0"
                        )}>
                            <h3 className="text-white text-2xl font-bold tracking-tight mb-1">{project.title}</h3>
                            <p className="text-white/80 text-sm font-medium uppercase tracking-widest">{project.desc}</p>
                        </div>

                        {/* Vertical Text for collapsed state */}
                        <div className={cn(
                            "absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
                            expandedIndex === idx ? "opacity-0" : "opacity-100"
                        )}>
                            <span className="text-white/80 font-mono text-sm tracking-widest rotate-[-90deg] whitespace-nowrap">
                                {project.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpandOnHover;
