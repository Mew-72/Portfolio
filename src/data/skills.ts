export interface Skill {
    name: string;
    proficiency: "expert" | "proficient" | "familiar";
}

export interface Capability {
    title: string;
    description: string;
    skills: Skill[];
    className: string;
    gradient: string;
}

export const capabilities: Capability[] = [
    {
        title: "Engineering",
        description: "Building robust, scalable applications with modern architecture.",
        skills: [
            { name: "React", proficiency: "expert" },
            { name: "Next.js", proficiency: "expert" },
            { name: "TypeScript", proficiency: "expert" },
            { name: "Node.js", proficiency: "proficient" },
            { name: "PostgreSQL", proficiency: "proficient" },
            { name: "System Design", proficiency: "familiar" }
        ],
        className: "md:col-span-2 md:row-span-2",
        gradient: "from-blue-500/10 to-transparent"
    },
    {
        title: "Design",
        description: "Crafting intuitive, pixel-perfect user experiences.",
        skills: [
            { name: "Figma", proficiency: "proficient" },
            { name: "TailwindCSS", proficiency: "expert" },
            { name: "Framer Motion", proficiency: "proficient" },
            { name: "UI/UX Principles", proficiency: "proficient" },
            { name: "Accessibility", proficiency: "familiar" }
        ],
        className: "md:col-span-1 md:row-span-1",
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        title: "DevOps & Tools",
        description: "Streamlining workflows and ensuring reliability.",
        skills: [
            { name: "Docker", proficiency: "proficient" },
            { name: "Git", proficiency: "expert" },
            { name: "CI/CD", proficiency: "proficient" },
            { name: "AWS", proficiency: "familiar" },
            { name: "Linux", proficiency: "proficient" }
        ],
        className: "md:col-span-1 md:row-span-1",
        gradient: "from-orange-500/10 to-transparent"
    },
    {
        title: "Core",
        description: "The fundamental building blocks of computer science.",
        skills: [
            { name: "Data Structures", proficiency: "expert" },
            { name: "Algorithms", proficiency: "expert" },
            { name: "OOP", proficiency: "expert" },
            { name: "Python", proficiency: "proficient" },
            { name: "C++", proficiency: "proficient" }
        ],
        className: "md:col-span-3 md:row-span-1",
        gradient: "from-green-500/10 to-transparent"
    }
];
