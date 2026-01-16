import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer id="contact" className="w-full relative z-10 pb-12 pt-0">
            <SectionHeader title="Let's Make It Happen" className="!border-b-0" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center text-center">

                <motion.a
                    href="mailto:mayank.thakan7@gmail.com"
                    className="group relative inline-block my-20"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-[8vw] leading-none font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300 font-['Syne']">
                        SAY HELLO
                    </span>
                    <span className="absolute -bottom-4 left-0 w-full h-1 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.a>

                <div className="w-full border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm uppercase tracking-widest font-['Space_Grotesk']">
                    <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
                    <div className="flex gap-8">
                        {/* Social Links with Hover Underline */}
                        <motion.a whileHover={{ y: -3 }} href="https://www.linkedin.com/in/mayank-kumar77/" className="group relative hover:text-foreground transition-colors">
                            <span>LinkedIn</span>
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.a>
                        <motion.a whileHover={{ y: -3 }} href="http://github.com/Mew-72/" className="group relative hover:text-foreground transition-colors">
                            <span>GitHub</span>
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.a>
                        <motion.a whileHover={{ y: -3 }} href="https://www.instagram.com/m4yhem_mk/" className="group relative hover:text-foreground transition-colors">
                            <span>Instagram</span>
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
