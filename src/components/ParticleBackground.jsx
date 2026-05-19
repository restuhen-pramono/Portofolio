import { useEffect, useRef } from 'react'

// Lightweight particle system using Canvas
const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    })

    const init = () => {
      resize()
      const count = Math.floor((canvas.width * canvas.height) / 12000)
      particles = Array.from({ length: Math.min(count, 80) }, createParticle)
    }

    const drawLine = (p1, p2, dist, maxDist) => {
      const opacity = (1 - dist / maxDist) * 0.15
      ctx.beginPath()
      ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`
      ctx.lineWidth = 0.5
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const maxDist = 120

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Pulsing opacity
        const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${pulseOpacity})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) drawLine(p, p2, dist, maxDist)
        }
      })

      animId = requestAnimationFrame(animate)
    }

    init()
    animate()
    window.addEventListener('resize', init)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  )
}

export default ParticleBackground
