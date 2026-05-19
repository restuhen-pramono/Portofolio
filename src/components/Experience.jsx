import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timeline } from '../data/portfolioData'
import { Briefcase, GraduationCap, Trophy, Calendar } from 'lucide-react'

const typeConfig = {
  work: { icon: Briefcase, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', dot: 'bg-cyan-400' },
  education: { icon: GraduationCap, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', dot: 'bg-blue-400' },
  achievement: { icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', dot: 'bg-amber-400' },
}

const TimelineItem = ({ item, index, inView }) => {
  const { icon: Icon, color, bg, border, dot } = typeConfig[item.type]
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Card */}
      <motion.div
        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div className={`glass rounded-2xl p-5 border ${border} group hover-card`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center ${border} border`}>
              <Icon size={16} className={color} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-mono ${color}`}>
              <Calendar size={10} />
              {item.year}
            </div>
          </div>

          <h3 className="font-display text-sm font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
            {item.title}
          </h3>
          <p className={`text-xs font-medium mb-3 ${color}`}>{item.place}</p>
          <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
        </div>
      </motion.div>

      {/* Center dot on desktop */}
      <motion.div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-5 w-4 h-4 rounded-full border-2 border-slate-800 items-center justify-center bg-slate-950 z-10"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
      >
        <div className={`w-2 h-2 rounded-full ${dot}`} />
      </motion.div>

      {/* Mobile dot */}
      <motion.div
        className="md:hidden flex-shrink-0 mt-5 w-3 h-3 rounded-full border border-slate-700 relative"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <div className={`absolute inset-0.5 rounded-full ${dot}`} />
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </div>
  )
}

const Experience = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute left-1/2 top-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >          
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6" />
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Perjalanan akademis dan profesional yang membentuk kompetensi di bidang teknologi industri modern.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {Object.entries(typeConfig).map(([type, cfg]) => {
            const Icon = cfg.icon
            return (
              <div key={type} className="flex items-center gap-2 text-xs text-slate-400">
                <div className={`w-6 h-6 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                  <Icon size={10} className={cfg.color} />
                </div>
                <span className="capitalize">{type}</span>
              </div>
            )
          })}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          />

          {/* Vertical line - mobile */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 to-transparent" />

          {/* Items */}
          <div className="space-y-8 md:space-y-12 pl-10 md:pl-0">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
