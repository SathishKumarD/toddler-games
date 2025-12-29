import { motion } from 'framer-motion'
import './BurstParticle.css'

function BurstParticle({ particle, onComplete }) {
  // Calculate the trajectory for this particle
  const angle = particle.angle
  const distance = particle.distance
  const endX = particle.startX + Math.cos(angle) * distance
  const endY = particle.startY + Math.sin(angle) * distance

  return (
    <motion.div
      className="burst-particle"
      style={{
        left: `${particle.startX}%`,
        top: `${particle.startY}%`,
        width: particle.size,
        height: particle.size,
        background: particle.color,
        borderRadius: particle.shape === 'circle' ? '50%' : '20%',
      }}
      initial={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      animate={{
        x: `${(endX - particle.startX) * 10}px`,
        y: `${(endY - particle.startY) * 10}px`,
        opacity: 0,
        scale: 0.2,
        rotate: particle.rotation,
      }}
      transition={{
        duration: particle.duration,
        ease: 'easeOut',
      }}
      onAnimationComplete={onComplete}
    />
  )
}

export default BurstParticle

