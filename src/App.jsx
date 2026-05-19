import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// Hooks
import { useTheme } from './hooks/useTheme'

// Components
import LoadingScreen from './components/LoadingScreen'
import ParticleBackground from './components/ParticleBackground'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const { isDark, toggleTheme } = useTheme()
  const [loading, setLoading] = useState(true)

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content - shown after loading */}
      {!loading && (
        <div className="relative min-h-screen">
          {/* Scroll progress bar */}
          <ScrollProgress />

          {/* Particle background */}
          <ParticleBackground />

          {/* Navigation */}
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />

          {/* Page sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
