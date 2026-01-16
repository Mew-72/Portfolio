import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { capabilities, Skill } from "@/data/skills";
import { staggerContainer, fadeUpVariant } from "@/config/transitions";

// Visual indicator for skill proficiency
const ProficiencyDot = ({ level }: { level: Skill["proficiency"] }) => {
    const colors = {
        expert: "bg-green-500",
        proficient: "bg-blue-500",
        familiar: "bg-muted-foreground/50"
    };
    return <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors[level]} mr-2`} />;
};

export function Skills() {
    return (
        <section id="skills" className="min-h-[60vh] w-full relative z-10 py-20 font-['Space_Grotesk'] overflow-hidden">
            <SectionHeader title="Capabilities" />

            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(250px,auto)] gap-6"
                >
                    {capabilities.map((capability) => (
                        <motion.div
                            key={capability.title}
                            variants={fadeUpVariant}
                            className={`relative group p-8 rounded-3xl border border-border/10 bg-secondary/5 backdrop-blur-sm overflow-hidden hover:border-border/20 transition-colors duration-500 ${capability.className}`}
                        >
                            {/* Subtle Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground mb-3 font-['Syne'] tracking-tight">{capability.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm">{capability.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {capability.skills.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="flex items-center px-4 py-1.5 rounded-full border border-border/10 bg-secondary/10 text-sm text-foreground/90"
                                        >
                                            <ProficiencyDot level={skill.proficiency} />
                                            {skill.name}
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

