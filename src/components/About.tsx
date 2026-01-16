import { HoverPreview } from "@/components/ui/hover-preview";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="min-h-screen w-full relative z-10 pt-20">
            <SectionHeader title="What I Do" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto px-4 py-20">
                {/* Text Content - Zuneda Style */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                    className="space-y-12"
                >

                    {[
                        {
                            title: "Full-Stack Development",
                            description: "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users."
                        },
                        {
                            title: "UI/UX & Frontend",
                            description: "Design is more than looks — it’s about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences."
                        },
                        {
                            title: "Optimization",
                            description: "Beyond handling data, I’m driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability."
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                            }}
                            className="group"
                        >
                            <motion.h3
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors font-['Syne'] cursor-default inline-block"
                            >
                                {item.title}
                            </motion.h3>
                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-['Space_Grotesk']">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}

                </motion.div>

                {/* Interactive Feature */}
                <div className="relative h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center border-t border-white/10 pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 visible">
                    <div className="absolute inset-0">
                        <HoverPreview />
                    </div>
                </div>
            </div>
        </section>
    );
}
