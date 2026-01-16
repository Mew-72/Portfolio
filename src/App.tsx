import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About' // "What I Do"
import { Projects } from './components/Projects' // "Selected Works"
import { Skills } from './components/Skills' // "Developer / Designer"
import { Footer } from './components/Footer' // "Let's Make It Happen"
import { ThemeProvider } from 'next-themes'
import { ScrollPath } from './components/ui/scroll-path'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative w-full min-h-screen text-foreground bg-background transition-colors duration-300 overflow-x-hidden font-sans selection:bg-white/20">
        <Navbar />

        <main className="flex flex-col w-full">
          <Hero />

          {/* Scroll-linked path container */}
          <div className="relative w-full">
            <ScrollPath />
            <div className="relative z-10">
              <About />
              <Projects />
              <Skills />
              <Footer />
            </div>
          </div>
        </main>

      </div>
    </ThemeProvider>
  )
}

export default App
