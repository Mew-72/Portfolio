import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const works = [
    {
        title: "E-Commerce System",
        category: "Full Stack",
        description: "A complete localized shopping experience with Stripe integration.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        className: "md:col-span-2",
        gradient: "from-blue-500/10 to-transparent"
    },
    {
        title: "Analytics Dashboard",
        category: "Data Visualization",
        description: "Real-time insights for SaaS platforms.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Python", "D3.js"],
        className: "md:col-span-1",
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        title: "Agency Portfolio",
        category: "Web Design",
        description: "Award-winning design implementation.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Gatsby", "GSAP"],
        className: "md:col-span-1",
        gradient: "from-orange-500/10 to-transparent"
    },
    {
        title: "Social Platform",
        category: "Mobile App",
        description: "Connecting communities through seamless mobile UX.",
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["React Native", "Firebase"],
        className: "md:col-span-2",
        gradient: "from-pink-500/10 to-transparent"
    }
];

export function Projects() {
    return (
        <section id="projects" className="min-h-screen w-full relative z-10 pb-20 font-['Space_Grotesk']">
            <SectionHeader title="Selected Works" />

            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {works.map((work, idx) => (
                        <motion.div
                            key={work.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className={`group relative rounded-3xl overflow-hidden bg-secondary/5 border border-border/10 hover:border-border/20 transition-all duration-500 hover:shadow-xl ${work.className}`}
                        >
                            {/* Image Background with Overlay */}
                            <div className="relative aspect-[16/9] md:aspect-auto md:h-[300px] overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-20 mix-blend-overlay`} />
                                <img
                                    src={work.image}
                                    alt={work.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[0.2] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-8 relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground font-['Syne'] mb-1">{work.title}</h3>
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground">{work.category}</p>
                                    </div>
                                    <div className="p-3 rounded-full bg-background border border-border/10 group-hover:border-foreground/20 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>

                                <p className="text-muted-foreground/80 leading-relaxed mb-6">{work.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {work.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary/20 text-muted-foreground border border-border/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
