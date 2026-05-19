import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MessageCircle, ArrowUp, Zap } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

const socials = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
  { icon: MessageCircle, href: `https://wa.me/${personalInfo.whatsapp}`, label: 'WhatsApp' },
]

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-slate-800/60 mt-12">
      {/* Gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <span className="font-display font-bold text-white">
                RM<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              Mechatronics Engineer passionate about Industry 4.0, IoT, and Smart Factory solutions.
              Building the bridge between physical and digital worlds.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg glass-light text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all hover:scale-110"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick nav */}
          <div>
            <h4 className="font-mono text-xs text-cyan-500 tracking-widest mb-4">NAVIGATION</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-mono text-xs text-cyan-500 tracking-widest mb-4">CONTACT</h4>
            <div className="space-y-2 text-sm text-slate-500">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.location}</p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to opportunities
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/60">
          <p className="text-slate-600 text-xs font-mono text-center sm:text-left">
            © {new Date().getFullYear()} {personalInfo.name}. Crafted with ⚡ React + Vite + Tailwind
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            className="flex items-center gap-2 px-4 py-2 glass-light rounded-xl text-slate-400 hover:text-cyan-400 text-xs font-mono border border-slate-700 hover:border-cyan-500/30 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <ArrowUp size={12} />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
