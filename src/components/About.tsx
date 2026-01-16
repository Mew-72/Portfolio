import { HoverPreview } from "@/components/ui/hover-preview";
import { SectionHeader } from "@/components/ui/section-header";

export function About() {
    return (
        <section id="about" className="min-h-screen w-full relative z-10 bg-background pt-20">
            <SectionHeader title="What I Do" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto px-4 py-20">
                {/* Text Content - Zuneda Style */}
                <div className="space-y-12">

                    <div className="group">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors font-['Syne']">Full-Stack Development</h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-['Space_Grotesk']">
                            From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.
                        </p>
                    </div>

                    <div className="group">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors font-['Syne']">UI/UX & Frontend</h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-['Space_Grotesk']">
                            Design is more than looks — it’s about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences.
                        </p>
                    </div>

                    <div className="group">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors font-['Syne']">Optimization</h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-['Space_Grotesk']">
                            Beyond handling data, I’m driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.
                        </p>
                    </div>

                </div>

                {/* Interactive Feature */}
                <div className="relative h-full min-h-[500px] flex items-center justify-center border-l border-white/10 pl-12 invisible lg:visible">
                    <div className="absolute inset-0">
                        <HoverPreview />
                    </div>
                </div>
            </div>
        </section>
    );
}
