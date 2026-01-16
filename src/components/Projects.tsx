import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { works } from "@/data/projects";
import { staggerContainer, fadeUpVariant } from "@/config/transitions";

export function Projects() {
    return (
        <section id="projects" className="min-h-[60vh] w-full relative z-10 pb-20 font-['Space_Grotesk']">
            <SectionHeader title="Selected Works" />

            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {works.map((work) => (
                        <motion.div
                            key={work.title}
                            variants={fadeUpVariant}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className={`group relative rounded-3xl overflow-hidden bg-secondary/5 border border-border/10 hover:border-border/20 transition-colors duration-500 hover:shadow-xl hover:shadow-primary/10 ${work.className}`}
                        >
                            {/* Image Background */}
                            <div className="relative aspect-[16/9] md:aspect-auto md:h-[300px] overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-20 mix-blend-overlay`} />
                                <motion.img
                                    src={work.image}
                                    alt={work.title}
                                    width={800}
                                    height={450}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-8 relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground font-['Syne'] mb-1">{work.title}</h3>
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                            {work.role} · {work.category}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-full bg-background border border-border/10 group-hover:border-foreground/20 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed mb-6">{work.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {work.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary/20 text-muted-foreground border border-border/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

