import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo, focusAreas, stats } from '../data/portfolioData'
import { useCounter } from '../hooks/useCounter'
import { MapPin, Mail } from 'lucide-react'

const StatCard = ({ label, value, suffix }) => {
  const { count, ref } = useCounter(value, 2000)
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-black gradient-text">
        {count}{suffix}
      </div>
      <div className="text-slate-400 text-xs mt-1 font-mono">{label}</div>
    </div>
  )
}

const FocusCard = ({ area, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className={`relative p-5 rounded-2xl border bg-gradient-to-br ${area.color} ${area.border} group hover-card cursor-default`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: 'inset 0 0 30px rgba(34,211,238,0.05)' }}
      />
      <div className="text-2xl mb-3">{area.icon}</div>
      <h3 className="font-display text-sm font-bold text-white mb-2 tracking-wide">{area.title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed">{area.description}</p>

      {/* Corner accent */}
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 transition-colors" />
    </motion.div>
  )
}

const About = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
            Who <span className="gradient-text">I Am</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Bio */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="glass rounded-2xl p-6 neon-border"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Avatar placeholder with gradient */}
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center justify-center mb-5 relative overflow-hidden">
                <div className="text-5xl">👨‍💻</div>
                {/* Animated scan line */}
                <motion.div
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
                  animate={{ y: [-80, 80] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-1">{personalInfo.name}</h3>
              <p className="text-cyan-400 text-sm font-mono mb-4">{personalInfo.title}</p>

              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-cyan-500 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-cyan-500 flex-shrink-0" />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/50">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {personalInfo.description}
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="glass rounded-2xl p-5 neon-border"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Focus areas */}
          <div className="lg:col-span-3">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Area of <span className="gradient-text">Expertise</span>
              </h3>
              <p className="text-slate-400 text-sm">
                Fokus pada pengembangan sistem terintegrasi yang menghubungkan hardware dan software
                untuk solusi industri modern.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {focusAreas.map((area, i) => (
                <FocusCard key={area.title} area={area} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
