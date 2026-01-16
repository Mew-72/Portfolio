import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    className?: string;
}

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
    return (
        <div className={`w-full py-12 px-4 md:px-8 border-b border-white/10 ${className}`}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60 font-['Syne']"
            >
                {title} <span className="text-foreground/30 ml-4 font-light">/</span>
            </motion.h2>
        </div>
    );
}
