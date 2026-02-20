"use client";

import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";

export function Hero() {
    return (
        <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-background" id="home">
            <div className="absolute inset-0 z-0">
                <BackgroundPaths title="" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 mt-20 flex flex-col justify-center h-full pointer-events-none">

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <motion.h1
                        animate={{ y: [0, -20, 0], letterSpacing: ["-0.05em", "-0.02em", "-0.05em"] }}
                        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                        className="text-[12vw] leading-[0.85] font-bold uppercase tracking-tighter text-foreground font-['Syne'] mix-blend-exclusion dark:mix-blend-normal"
                    >
                        PORT- <br /> FOLIO
                    </motion.h1>
                </motion.div>

                {/* Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-12 w-full overflow-hidden"
                >
                    <div className="flex whitespace-nowrap">
                        <motion.div
                            animate={{ x: [0, -1000] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                            className="flex gap-8"
                        >
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-8">
                                    <span className="text-xl md:text-2xl font-light tracking-widest text-muted-foreground uppercase font-['Space_Grotesk']">Creative Developer</span>
                                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                                    <span className="text-xl md:text-2xl font-light tracking-widest text-muted-foreground uppercase font-['Space_Grotesk']">UI/UX Designer</span>
                                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                                    <span className="text-xl md:text-2xl font-light tracking-widest text-muted-foreground uppercase font-['Space_Grotesk']">Problem Solver</span>
                                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                                </div>
                            ))}
                        </motion.div>
                        <motion.div
                            animate={{ x: [0, -1000] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                            className="flex gap-8"
                        >
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-8">
                                    <span className="text-xl md:text-2xl font-light tracking-widest text-muted-foreground uppercase font-['Space_Grotesk']">Creative Developer</span>
                                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                                    <span className="text-xl md:text-2xl font-light tracking-widest text-muted-foreground uppercase font-['Space_Grotesk']">UI/UX Designer</span>
                                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                                    <span className="text-xl md:text-2xl font-light tracking-widest text-muted-foreground uppercase font-['Space_Grotesk']">Problem Solver</span>
                                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { delay: 1.5, duration: 1 },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute bottom-12 right-4 md:right-8 flex flex-col items-center gap-2"
                >
                    <span className="mb-2 text-xs uppercase tracking-widest text-white/50 writing-vertical-rl">Scroll</span>
                    <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-full h-1/2 bg-white"
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}


