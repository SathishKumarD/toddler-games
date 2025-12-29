import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Balloon.css'

function Balloon({ balloon, onPop }) {
  const [position, setPosition] = useState({ 
    x: 50 + (Math.random() - 0.5) * 30, // Start in middle area (35-65%)
    y: 50 + (Math.random() - 0.5) * 30 // Start in middle area (35-65%)
  })
  const [velocity, setVelocity] = useState({
    x: (Math.random() - 0.5) * 2, // Random horizontal speed
    y: (Math.random() - 0.5) * 2, // Random vertical speed
  })
  const animationFrameRef = useRef()
  const velocityRef = useRef(velocity)

  // Keep velocity ref in sync
  useEffect(() => {
    velocityRef.current = velocity
  }, [velocity])

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => {
        const currentVelocity = velocityRef.current
        let newX = prev.x + currentVelocity.x
        let newY = prev.y + currentVelocity.y
        let newVelocity = { ...currentVelocity }

        // Bounce off left and right walls (margin to keep balloon fully visible)
        // Account for balloon width + centering (transform: translate(-50%, -50%))
        if (newX <= 8 || newX >= 92) {
          newVelocity.x = -currentVelocity.x * 0.95 // Slight damping
          newX = newX <= 8 ? 8 : 92
        }

        // Bounce off top and bottom walls (margin for balloon height + word + string)
        // Account for full balloon height including word on top and string at bottom
        if (newY <= 12 || newY >= 88) {
          newVelocity.y = -currentVelocity.y * 0.95 // Slight damping
          newY = newY <= 12 ? 12 : 88
        }

        // Update velocity if it changed
        if (newVelocity.x !== currentVelocity.x || newVelocity.y !== currentVelocity.y) {
          setVelocity(newVelocity)
        }

        // Random direction changes for floating effect (less frequent)
        if (Math.random() < 0.01) {
          setVelocity((v) => ({
            x: v.x + (Math.random() - 0.5) * 0.5,
            y: v.y + (Math.random() - 0.5) * 0.5,
          }))
        }

        // Clamp position to bounds (account for balloon size)
        return {
          x: Math.max(8, Math.min(92, newX)),
          y: Math.max(12, Math.min(88, newY)),
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handleClick = () => {
    const balloonElement = document.getElementById(`balloon-${balloon.id}`)
    if (balloonElement) {
      const rect = balloonElement.getBoundingClientRect()
      const screenPosition = {
        x: (rect.left + rect.width / 2) / window.innerWidth * 100,
        y: (rect.top + rect.height / 2) / window.innerHeight * 100,
      }
      onPop(balloon.id, screenPosition)
    }
  }

  return (
    <motion.div
      id={`balloon-${balloon.id}`}
      className="balloon"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0 }}
    >
      <div className="balloon-content">
        <div className="balloon-word">{balloon.word}</div>
        <div className="balloon-body">
          <div className="balloon-letter">{balloon.letter}</div>
          <div className="balloon-shine"></div>
        </div>
        <div className="balloon-string"></div>
      </div>
    </motion.div>
  )
}

export default Balloon

