export interface Project {
    title: string;
    category: string;
    role: string; // Added for context
    description: string;
    image: string;
    tags: string[];
    className: string;
    gradient: string;
    link?: string;
}

export const works: Project[] = [
    {
        title: "E-Commerce System",
        category: "Full Stack",
        role: "Lead Developer",
        description: "A complete localized shopping experience with Stripe integration.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        className: "md:col-span-2",
        gradient: "from-blue-500/10 to-transparent"
    },
    {
        title: "Analytics Dashboard",
        category: "Data Visualization",
        role: "Solo Project",
        description: "Real-time insights for SaaS platforms.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Python", "D3.js"],
        className: "md:col-span-1",
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        title: "Agency Portfolio",
        category: "Web Design",
        role: "Frontend Developer",
        description: "Award-winning design implementation.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Gatsby", "GSAP"],
        className: "md:col-span-1",
        gradient: "from-orange-500/10 to-transparent"
    },
    {
        title: "Social Platform",
        category: "Mobile App",
        role: "Full Stack Developer",
        description: "Connecting communities through seamless mobile UX.",
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["React Native", "Firebase"],
        className: "md:col-span-2",
        gradient: "from-pink-500/10 to-transparent"
    }
];
