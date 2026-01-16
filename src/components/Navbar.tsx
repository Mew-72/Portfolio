import { MenuBar, ThemeToggle } from "@/components/ui/glow-menu";

export function Navbar() {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-4">
                <MenuBar />
                <div className="bg-background/80 backdrop-blur-md p-2 rounded-full border border-border/40 shadow-lg">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
