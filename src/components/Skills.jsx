import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data/portfolioData'

const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'embedded', label: 'Embedded' },
  { id: 'automation', label: 'Automation' },
  { id: 'iot', label: 'IoT' },
  { id: 'web', label: 'Web Dev' },
  { id: 'design', label: 'Design' },
]

const SkillBar = ({ skill, inView, delay }) => {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="font-mono text-xs text-cyan-400">{skill.level}%</span>
      </div>
      {/* Track */}
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
            boxShadow: '0 0 8px rgba(34,211,238,0.4)',
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, delay: delay + 1.4, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

const SkillHexCard = ({ skill, index, inView }) => (
  <motion.div
    className="relative flex flex-col items-center gap-2 p-4 glass-light rounded-xl border border-slate-700/50 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-300 group cursor-default"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    whileHover={{ y: -4 }}
  >
    {/* Circular progress */}
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(30,41,59,1)" strokeWidth="4" />
        <motion.circle
          cx="32" cy="32" r="26"
          fill="none"
          stroke="url(#skillGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={2 * Math.PI * 26}
          animate={inView ? { strokeDashoffset: 2 * Math.PI * 26 * (1 - skill.level / 100) } : {}}
          transition={{ duration: 1.5, delay: index * 0.06 + 0.3, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl">{skill.icon}</span>
      </div>
    </div>

    <div className="text-center">
      <div className="text-white text-xs font-semibold group-hover:text-cyan-300 transition-colors">
        {skill.name}
      </div>
      <div className="text-cyan-400 font-mono text-xs mt-0.5">{skill.level}%</div>
    </div>
  </motion.div>
)

const Skills = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6" />
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Kombinasi keahlian hardware dan software untuk mengembangkan solusi terintegrasi yang inovatif.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                activeCategory === id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'glass-light text-slate-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/30'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Skills layout: bars on left, hex cards on right */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Progress bars */}
          <div className="glass rounded-2xl p-6 neon-border space-y-5">
            <h3 className="font-display text-sm font-bold text-cyan-400 tracking-wider mb-6">
              PROFICIENCY LEVELS
            </h3>
            {filtered.map((skill, i) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                inView={inView}
                delay={i * 0.08}
              />
            ))}
          </div>

          {/* Circular cards */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-cyan-400 tracking-wider mb-4">
              SKILL OVERVIEW
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {filtered.map((skill, i) => (
                <SkillHexCard key={skill.name} skill={skill} index={i} inView={inView} />
              ))}
            </div>

            {/* Summary card */}
            <motion.div
              className="mt-4 p-5 glass rounded-2xl border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <p className="font-mono text-xs text-slate-500 mb-3">// Tech Stack Focus</p>
              <div className="flex flex-wrap gap-2">
                {['Industry 4.0', 'Smart Factory', 'Real-Time Systems', 'IoT Ecosystem', 'Edge Computing', 'Web HMI'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
