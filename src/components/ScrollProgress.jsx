import { useScrollProgress } from '../hooks/useScrollProgress'
import { motion } from 'framer-motion'

const ScrollProgress = () => {
  const { progress } = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9998] h-0.5 origin-left"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
        boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
      }}
      transition={{ duration: 0.1 }}
    />
  )
}

export default ScrollProgress
