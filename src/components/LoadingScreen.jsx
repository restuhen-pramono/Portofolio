import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | done

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setPhase('done')
            setTimeout(onComplete, 600)
          }, 300)
          return 100
        }
        // Accelerate near end
        const increment = prev < 70 ? Math.random() * 8 + 3 : Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Animated logo */}
            <div className="relative w-24 h-24">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Middle ring */}
              <motion.div
                className="absolute inset-3 rounded-full border border-cyan-400/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ boxShadow: '0 0 20px rgba(34,211,238,0.6)' }}
                />
              </div>
              {/* Orbiting dots */}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400"
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: -4,
                    marginLeft: -4,
                    transformOrigin: '4px 4px',
                  }}
                  animate={{ rotate: 360 + deg }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#22d3ee',
                      transform: `translateX(40px)`,
                      boxShadow: '0 0 6px #22d3ee',
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Name */}
            <div className="text-center">
              <motion.p
                className="font-mono text-xs text-cyan-500 tracking-[0.4em] mb-2 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Initializing System
              </motion.p>
              <motion.h1
                className="font-display text-3xl font-bold gradient-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                RESTU HENDRA PRAMONO
              </motion.h1>
            </div>

            {/* Progress bar */}
            <div className="w-64 space-y-2">
              <div className="h-px bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-slate-500">Loading assets...</span>
                <span className="font-mono text-xs text-cyan-400">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Status messages */}
            <motion.div
              className="font-mono text-xs text-slate-600 text-center"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress < 30
                ? '> Booting portfolio system...'
                : progress < 60
                ? '> Loading project assets...'
                : progress < 90
                ? '> Configuring components...'
                : '> System ready.'}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
