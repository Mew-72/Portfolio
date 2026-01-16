import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";

const capabilities = [
    {
        title: "Engineering",
        description: "Building robust, scalable applications with modern architecture.",
        skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "System Design"],
        className: "md:col-span-2 md:row-span-2",
        gradient: "from-blue-500/10 to-transparent"
    },
    {
        title: "Design",
        description: "Crafting intuitive, pixel-perfect user experiences.",
        skills: ["Figma", "TailwindCSS", "Framer Motion", "UI/UX Principles", "Accessibility"],
        className: "md:col-span-1 md:row-span-1",
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        title: "DevOps & Tools",
        description: "Streamlining workflows and ensuring reliability.",
        skills: ["Docker", "Git", "CI/CD", "AWS", "Linux"],
        className: "md:col-span-1 md:row-span-1",
        gradient: "from-orange-500/10 to-transparent"
    },
    {
        title: "Core",
        description: "The fundamental building blocks of computer science.",
        skills: ["Data Structures", "Algorithms", "OOP", "Python", "C++"],
        className: "md:col-span-3 md:row-span-1",
        gradient: "from-green-500/10 to-transparent"
    }
];

export function Skills() {
    return (
        <section id="skills" className="min-h-screen w-full relative z-10 py-20 font-['Space_Grotesk'] overflow-hidden">
            <SectionHeader title="Capabilities" />

            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(250px,auto)] gap-6"
                >
                    {capabilities.map((capability) => (
                        <motion.div
                            key={capability.title}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                            }}
                            className={`relative group p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/10 transition-colors duration-500 ${capability.className}`}
                        >
                            {/* Subtle Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground mb-3 font-['Syne'] tracking-tight">{capability.title}</h3>
                                    <p className="text-muted-foreground/80 leading-relaxed mb-8 max-w-sm">{capability.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {capability.skills.map((skill, skillIdx) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 + (skillIdx * 0.05), duration: 0.3 }}
                                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-foreground/80 transition-colors duration-200 cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
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
