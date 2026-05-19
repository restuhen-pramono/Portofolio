import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Zap } from 'lucide-react'
import { useScrollProgress } from '../hooks/useScrollProgress'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = ({ isDark, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScrollProgress()

  const scrolled = scrollY > 50

  // Smooth scroll
  const handleNav = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-cyan-500/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center glow-cyan-sm group-hover:scale-110 transition-transform">
                <Zap size={14} className="text-white" />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-[10px] tracking-[0.25em] uppercase text-cyan-400 font-medium">
                  Hello I Am
                </span>

                <span className="font-display font-bold text-sm tracking-wider text-white">
                  Pramono
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1)
                return (
                  <button
                    key={label}
                    onClick={() => handleNav(href)}
                    className={`relative px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-lg ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                        transition={{ type: 'spring', duration: 0.4 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                )
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-lg glass-light text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Contact CTA */}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity glow-cyan-sm"
              >
                <span>Let's Talk</span>
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg glass-light text-slate-300"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 glass border-b border-cyan-500/10 p-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map(({ label, href }, i) => (
                  <motion.button
                    key={label}
                    onClick={() => handleNav(href)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all text-left font-medium"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="font-mono text-cyan-500 text-xs">0{i + 1}</span>
                    {label}
                  </motion.button>
                ))}
                <div className="pt-2 border-t border-slate-800 mt-2">
                  <button
                    onClick={() => handleNav('#contact')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
