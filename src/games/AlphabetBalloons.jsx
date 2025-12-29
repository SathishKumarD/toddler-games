import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { alphabetData } from '../config/alphabetData'
import { playPopSound, speak } from '../utils/audio'
import Balloon from './components/Balloon'
import FallingObject from './components/FallingObject'
import './AlphabetBalloons.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function AlphabetBalloons() {
  const navigate = useNavigate()
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [balloons, setBalloons] = useState([])
  const [fallingObjects, setFallingObjects] = useState([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const balloonIdCounter = useRef(0)
  const objectIdCounter = useRef(0)

  const currentLetter = ALPHABET[currentLetterIndex]
  const letterData = alphabetData[currentLetter]

  // Spawn one balloon per letter
  useEffect(() => {
    if (currentLetterIndex >= ALPHABET.length) return
    if (balloons.length > 0) return // Only spawn if no balloons exist
    if (isTransitioning) return // Don't spawn during transition

    const newBalloon = {
      id: balloonIdCounter.current++,
      letter: currentLetter,
      word: letterData.word,
      emoji: letterData.emoji,
    }
    setBalloons([newBalloon])
  }, [currentLetter, letterData, currentLetterIndex, balloons.length, isTransitioning])

  const handleBalloonPop = useCallback(
    (balloonId, position) => {
      // Remove the popped balloon
      setBalloons((prev) => prev.filter((b) => b.id !== balloonId))

      // Set transitioning to prevent new balloons from spawning
      setIsTransitioning(true)

      // Clear any previous falling objects immediately
      setFallingObjects([])

      // Play pop sound
      playPopSound()

      // Speak the letter phrase
      speak(`${currentLetter} is for ${letterData.word}`)

      // Create falling object at balloon position
      const newObject = {
        id: objectIdCounter.current++,
        letter: currentLetter,
        emoji: letterData.emoji,
        word: letterData.word,
        x: position.x,
        y: position.y,
      }
      setFallingObjects([newObject])

      // Move to next letter immediately
      setCurrentLetterIndex((prev) => {
        const nextIndex = prev + 1
        if (nextIndex >= ALPHABET.length) {
          setShowCelebration(true)
        }
        return nextIndex
      })
      
      // Clear all balloons and allow new balloons to spawn immediately
      setBalloons([])
      setIsTransitioning(false)
    },
    [currentLetter, letterData]
  )

  const handleObjectComplete = useCallback((objectId) => {
    setFallingObjects((prev) => prev.filter((o) => o.id !== objectId))
  }, [])

  const handleRestart = () => {
    setCurrentLetterIndex(0)
    setBalloons([])
    setFallingObjects([])
    setShowCelebration(false)
    setIsTransitioning(false)
  }

  return (
    <div className="alphabet-balloons">
      <div className="game-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Home
        </button>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentLetterIndex / ALPHABET.length) * 100}%` }}
          />
        </div>
        <div className="letter-counter">
          {currentLetterIndex}/{ALPHABET.length}
        </div>
      </div>

      <div className="game-area">
        <AnimatePresence>
          {balloons.map((balloon) => (
            <Balloon
              key={balloon.id}
              balloon={balloon}
              onPop={handleBalloonPop}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {fallingObjects.map((obj) => (
            <FallingObject
              key={obj.id}
              object={obj}
              onComplete={handleObjectComplete}
            />
          ))}
        </AnimatePresence>

        {showCelebration && (
          <motion.div
            className="celebration"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="celebration-content">
              <h1 className="celebration-title">🎉 Amazing! 🎉</h1>
              <p className="celebration-text">
                You learned all 26 letters!
              </p>
              <button className="restart-button" onClick={handleRestart}>
                Play Again
              </button>
              <button
                className="home-button"
                onClick={() => navigate('/')}
              >
                Home
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AlphabetBalloons

