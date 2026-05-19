import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Cpu, Globe, ChevronRight } from 'lucide-react'
import { projects } from '../data/portfolioData'

// SVG dummy project preview images
const ProjectImage = ({ type, color }) => {
  const gradients = {
    factory: ['#06b6d4', '#2563eb'],
    headband: ['#8b5cf6', '#4f46e5'],
    dashboard: ['#0d9488', '#06b6d4'],
    conveyor: ['#3b82f6', '#06b6d4'],
    monitoring: ['#6366f1', '#3b82f6'],
  }
  const [c1, c2] = gradients[type] || ['#06b6d4', '#2563eb']

  const illustrations = {
    factory: (
      <g>
        {/* Factory HMI mockup */}
        <rect x="60" y="40" width="180" height="120" rx="8" fill="#0f172a" stroke={c1} strokeWidth="1.5" />
        <rect x="66" y="46" width="168" height="88" rx="4" fill="#020617" />
        {/* HMI elements */}
        <rect x="72" y="52" width="50" height="30" rx="3" fill={c1} opacity="0.2" stroke={c1} strokeWidth="1" />
        <text x="97" y="70" fill={c1} fontSize="8" textAnchor="middle" fontFamily="monospace">STATUS</text>
        <circle cx="97" cy="77" r="4" fill="#22c55e" />
        <rect x="130" y="52" width="50" height="30" rx="3" fill={c1} opacity="0.2" stroke={c1} strokeWidth="1" />
        <text x="155" y="64" fill={c1} fontSize="6" textAnchor="middle" fontFamily="monospace">TEMP</text>
        <text x="155" y="75" fill="white" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">72°C</text>
        {/* Chart */}
        <rect x="72" y="90" width="108" height="36" rx="3" fill="#0f172a" stroke={c1} strokeWidth="0.5" opacity="0.5" />
        <polyline points="76,120 84,110 92,115 100,105 108,112 116,102 124,108 132,98 140,104 148,95 156,100 164,92 172,97" fill="none" stroke={c1} strokeWidth="1.5" />
        {/* Conveyor animation lines */}
        <line x1="66" y1="142" x2="234" y2="142" stroke={c2} strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />
      </g>
    ),
    headband: (
      <g>
        {/* EEG headband illustration */}
        <ellipse cx="160" cy="90" rx="70" ry="50" fill="none" stroke={c1} strokeWidth="2" />
        <path d="M90 90 Q160 60 230 90" fill="none" stroke={c2} strokeWidth="3" strokeLinecap="round" />
        {/* EEG wave */}
        <polyline points="80,130 90,130 95,110 100,150 108,120 115,140 120,130 130,130 135,115 140,145 145,130 160,130 165,100 170,160 175,130 180,130 185,120 190,140 195,130 220,130" fill="none" stroke={c1} strokeWidth="1.5" />
        {/* Sensors on headband */}
        {[110, 160, 210].map((x, i) => (
          <circle key={i} cx={x} cy="72" r="5" fill={c2} opacity="0.8" />
        ))}
        <text x="160" y="175" fill={c1} fontSize="9" textAnchor="middle" fontFamily="monospace">NEURAL SIGNAL DETECTED</text>
      </g>
    ),
    dashboard: (
      <g>
        {/* IoT dashboard */}
        <rect x="50" y="35" width="200" height="130" rx="8" fill="#0f172a" stroke={c1} strokeWidth="1" />
        {/* Header */}
        <rect x="50" y="35" width="200" height="20" rx="8" fill={c1} opacity="0.2" />
        <text x="150" y="49" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace">IoT MONITORING DASHBOARD</text>
        {/* Cards */}
        {[0,1,2,3].map((i) => (
          <rect key={i} x={58 + (i % 2) * 96} y={60 + Math.floor(i/2) * 50} width="88" height="42" rx="5" fill="#1e293b" stroke={c1} strokeWidth="0.5" />
        ))}
        <text x="102" y="78" fill={c1} fontSize="6" textAnchor="middle" fontFamily="monospace">TEMPERATURE</text>
        <text x="102" y="92" fill="white" fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold">38.2°C</text>
        <text x="198" y="78" fill="#06d6a0" fontSize="6" textAnchor="middle" fontFamily="monospace">HUMIDITY</text>
        <text x="198" y="92" fill="white" fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold">67%</text>
        <text x="102" y="128" fill="#f59e0b" fontSize="6" textAnchor="middle" fontFamily="monospace">PRESSURE</text>
        <text x="102" y="142" fill="white" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">1013 hPa</text>
        <text x="198" y="128" fill={c2} fontSize="6" textAnchor="middle" fontFamily="monospace">ENERGY</text>
        <text x="198" y="142" fill="white" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">4.7 kWh</text>
      </g>
    ),
    conveyor: (
      <g>
        {/* Conveyor system */}
        <rect x="40" y="120" width="220" height="20" rx="5" fill="#1e293b" stroke={c1} strokeWidth="1" />
        <circle cx="60" cy="130" r="14" fill="#0f172a" stroke={c1} strokeWidth="2" />
        <circle cx="60" cy="130" r="6" fill={c1} opacity="0.6" />
        <circle cx="240" cy="130" r="14" fill="#0f172a" stroke={c1} strokeWidth="2" />
        <circle cx="240" cy="130" r="6" fill={c1} opacity="0.6" />
        {/* Belt */}
        <line x1="60" y1="116" x2="240" y2="116" stroke={c2} strokeWidth="3" strokeDasharray="8 4" />
        <line x1="60" y1="144" x2="240" y2="144" stroke={c2} strokeWidth="3" strokeDasharray="8 4" />
        {/* Products on conveyor */}
        <rect x="100" y="104" width="24" height="16" rx="3" fill="#06b6d4" opacity="0.8" />
        <rect x="155" y="104" width="24" height="16" rx="3" fill="#22c55e" opacity="0.8" />
        <rect x="195" y="104" width="24" height="16" rx="3" fill="#ef4444" opacity="0.8" />
        {/* PLC box */}
        <rect x="110" y="50" width="80" height="50" rx="5" fill="#1e293b" stroke={c1} strokeWidth="1.5" />
        <text x="150" y="65" fill={c1} fontSize="7" textAnchor="middle" fontFamily="monospace" fontWeight="bold">PLC</text>
        <text x="150" y="77" fill="#94a3b8" fontSize="5" textAnchor="middle" fontFamily="monospace">OMRON CP1L</text>
        {/* Status LEDs */}
        <circle cx="120" cy="88" r="4" fill="#22c55e" />
        <circle cx="135" cy="88" r="4" fill="#f59e0b" />
        <circle cx="150" cy="88" r="4" fill="#22c55e" />
        <line x1="150" y1="100" x2="150" y2="120" stroke={c1} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      </g>
    ),
    monitoring: (
      <g>
        {/* Website monitoring */}
        <rect x="55" y="40" width="190" height="130" rx="8" fill="#0f172a" stroke={c1} strokeWidth="1" />
        {/* Browser chrome */}
        <rect x="55" y="40" width="190" height="18" rx="8" fill="#1e293b" />
        <circle cx="70" cy="49" r="3" fill="#ef4444" />
        <circle cx="80" cy="49" r="3" fill="#f59e0b" />
        <circle cx="90" cy="49" r="3" fill="#22c55e" />
        <rect x="100" y="43" width="120" height="12" rx="6" fill="#0f172a" />
        <text x="160" y="52" fill="#64748b" fontSize="6" textAnchor="middle" fontFamily="monospace">industrial-monitor.io</text>
        {/* Charts */}
        <rect x="62" y="64" width="85" height="50" rx="4" fill="#1e293b" />
        <polyline points="68,108 75,90 82,100 90,82 98,92 106,75 113,85 120,70 127,80 134,65 141,72" fill="none" stroke={c1} strokeWidth="1.5" />
        <rect x="152" y="64" width="85" height="50" rx="4" fill="#1e293b" />
        {[0,1,2,3].map((i) => (
          <rect key={i} x={158 + i*17} y={114 - 15 - i*10} width="12" height={15 + i*10} rx="2" fill={c2} opacity={0.5 + i*0.15} />
        ))}
        {/* Table */}
        <rect x="62" y="120" width="175" height="42" rx="4" fill="#1e293b" />
        {[0,1,2].map((i) => (
          <line key={i} x1="62" y1={130 + i*10} x2="237" y2={130 + i*10} stroke="#334155" strokeWidth="0.5" />
        ))}
        <text x="85" y="128" fill={c1} fontSize="5" fontFamily="monospace">NODE</text>
        <text x="140" y="128" fill={c1} fontSize="5" fontFamily="monospace">STATUS</text>
        <text x="195" y="128" fill={c1} fontSize="5" fontFamily="monospace">VALUE</text>
      </g>
    ),
  }

  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c2} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={`url(#grad-${type})`} />
      {/* Grid */}
      <g opacity="0.05" stroke={c1} strokeWidth="0.5">
        {[0,1,2,3,4,5].map(i => <line key={i} x1={i*60} y1="0" x2={i*60} y2="200" />)}
        {[0,1,2,3].map(i => <line key={i} x1="0" y1={i*50} x2="300" y2={i*50} />)}
      </g>
      {illustrations[type]}
    </svg>
  )
}

const ProjectCard = ({ project, index, inView }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="group relative glass rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-900">
        <ProjectImage type={project.image} color={project.color} />
        {/* Overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-slate-950/60 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 glass rounded-xl text-white text-xs font-medium border border-white/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={12} /> Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-xs font-medium hover:opacity-90 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} /> Demo
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white text-xs font-mono">
            ★ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-mono text-xs text-cyan-500 mb-1">{project.subtitle}</p>
        <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-xs bg-slate-800 text-slate-300 border border-slate-700 font-mono"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-700/50">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-white text-xs transition-colors"
          >
            <Github size={12} /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors ml-auto"
          >
            Live Demo <ChevronRight size={12} />
          </a>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </motion.div>
  )
}

const Projects = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6" />
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Koleksi proyek yang mendemonstrasikan keahlian di bidang otomasi, IoT, dan pengembangan sistem industri cerdas.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://github.com/rizky-maulana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass-light rounded-xl text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/30 transition-all text-sm font-medium group"
          >
            <Github size={16} />
            View All Projects on GitHub
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
