import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, MessageCircle, ChevronDown, Github, Linkedin, Terminal } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

// Typewriter hook
const useTypewriter = (words, speed = 80, pause = 2000) => {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const delay = isDeleting ? speed / 2 : speed

    const timeout = setTimeout(() => {
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), pause)
        return
      }
      if (isDeleting && text === '') {
        setIsDeleting(false)
        setWordIndex((i) => i + 1)
        return
      }
      setText((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      )
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, speed, pause])

  return text
}

// Floating 3D card avatar
const AvatarCard = () => (
  <motion.div
    className="relative w-64 h-64 md:w-80 md:h-80"
    animate={{ y: [-8, 8, -8] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  >
    {/* Outer glow */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-2xl" />

    {/* Profile Image */}
    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/30 glow-cyan">
      <img
        src="/Restu Hendra Pramono.png"
        alt="Profile"
        className="w-full h-full object-cover scale-100 hover:scale-125 transition-all duration-700"
        style={{objectPosition:"center top"}}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
    </div>

    {/* Status badge */}
    <motion.div
      className="absolute -top-3 -right-3 glass px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-cyan-500/30"
      animate={{ y: [-4, 4, -4] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
    >
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="font-mono text-xs text-cyan-300">
        Available
      </span>
    </motion.div>

    {/* Tech badge */}
    <motion.div
      className="absolute -bottom-4 -left-6 glass px-3 py-2 rounded-xl border border-blue-500/30"
      animate={{ y: [4, -4, 4] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
    >
      <div className="flex items-center gap-2">
        <Terminal size={12} className="text-cyan-400" />
        <span className="font-mono text-xs text-slate-300">
          ESP32 · PLC · React
        </span>
      </div>
    </motion.div>
  </motion.div>
)

const Hero = () => {
  const roles = [
    'Mechatronics Engineer',
    'IoT Developer',
    'Automation Specialist',
    'Embedded System Dev',
    'Web-Based HMI Builder',
  ]
  const typedRole = useTypewriter(roles, 70, 2200)

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            {/* Tag line */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-cyan-500/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-cyan-400 tracking-widest">PORTFOLIO 2025</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="text-white">{personalInfo.name.split(' ')[0]}</span>
              <br />
              <span className="gradient-text text-glow">
                {personalInfo.name.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              className="h-8 mb-6 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="font-mono text-lg text-slate-400">
                {'> '}
                <span className="text-cyan-300">{typedRole}</span>
                <span className="text-cyan-400 animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {personalInfo.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href={personalInfo.cv_url}
                download
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all glow-cyan hover:scale-105 active:scale-95"
              >
                <Download size={16} />
                Download CV
              </a>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 glass-light rounded-xl text-cyan-300 font-semibold text-sm border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle size={16} />
                Contact Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-slate-600 text-xs font-mono">FIND ME ON</span>
              <div className="flex items-center gap-2">
                {[
                  { icon: Github, href: personalInfo.github },
                  { icon: Linkedin, href: personalInfo.linkedin },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg glass-light text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all hover:scale-110"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <AvatarCard />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="font-mono text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}

export default Hero
