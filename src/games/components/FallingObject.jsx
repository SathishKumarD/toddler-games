import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './FallingObject.css'

const GRAVITY = 400 // Pixels per second squared (adjusted for time-based physics)
const BOUNCE_DAMPING = 0.5 // Less bouncy, settles faster
const GROUND_LEVEL = 80
const STAY_DURATION = 2500 // Stay on ground for 2.5 seconds before hiding

function FallingObject({ object, onComplete }) {
  const [position, setPosition] = useState({ x: object.x, y: object.y })
  const [velocity, setVelocity] = useState({ x: (Math.random() - 0.5) * 30, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [bounces, setBounces] = useState(0)
  const [isSettled, setIsSettled] = useState(false)
  const animationFrameRef = useRef()
  const settleTimeoutRef = useRef()
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000 // Convert to seconds
      lastTimeRef.current = currentTime

      // Cap delta time to prevent huge jumps (e.g., when tab becomes inactive)
      const clampedDelta = Math.min(deltaTime, 0.1)

      setPosition((prev) => {
        let newX = prev.x + velocity.x * clampedDelta
        let newY = prev.y + velocity.y * clampedDelta

        // Apply gravity
        setVelocity((v) => {
          let newVelY = v.y + GRAVITY * clampedDelta
          let newVelX = v.x

          // Check ground collision
          if (newY >= GROUND_LEVEL) {
            newY = GROUND_LEVEL
            newVelY = -newVelY * BOUNCE_DAMPING
            newVelX = newVelX * 0.95 // Friction

            // Only count significant bounces (adjusted for time-based velocity)
            if (Math.abs(newVelY) > 20) {
              setBounces((b) => b + 1)
            } else {
              // Settled on ground - stop all movement
              newVelY = 0
              newVelX = 0
              
              // Mark as settled and schedule removal
              if (!isSettled) {
                setIsSettled(true)
                settleTimeoutRef.current = setTimeout(() => {
                  onComplete(object.id)
                }, STAY_DURATION)
              }
            }
          }

          // Bounce off walls (wider margin to keep large emoji fully visible)
          if (newX <= 10 || newX >= 90) {
            newVelX = -newVelX * 0.8
            newX = newX <= 10 ? 10 : 90
          }

          return { x: newVelX, y: newVelY }
        })

        // Add rotation based on velocity
        setRotation((r) => r + velocity.x * 2)

        // Clamp position to bounds (account for emoji size)
        return { 
          x: Math.max(10, Math.min(90, newX)), 
          y: newY 
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current)
      }
    }
  }, [velocity, object.id, onComplete, isSettled])

  return (
    <motion.div
      className="falling-object"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        rotate: rotation,
      }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: isSettled ? 1 : (bounces < 3 ? [1, 1.2, 1] : 1),
        opacity: 1
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="object-content">
        <div className="object-letter">{object.letter}</div>
        <div className="object-emoji">{object.emoji}</div>
      </div>
    </motion.div>
  )
}

export default FallingObject

