import { MenuBar } from "@/components/ui/glow-menu";

export function Navbar() {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto shadow-2xl rounded-2xl">
                <MenuBar />
            </div>
        </div>
    );
}
