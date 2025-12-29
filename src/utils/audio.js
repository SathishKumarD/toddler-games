// Audio Context for sound effects
let audioContext = null

// Initialize audio context on first user interaction
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

// Generate and play a pleasant pop sound
export const playPopSound = () => {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Create a pleasant "pop" sound with frequency sweep
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1)

    // Volume envelope for pop effect
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  } catch (error) {
    console.warn('Audio playback failed:', error)
  }
}

// Text-to-speech using Web Speech API
export const speak = (text, options = {}) => {
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Configure voice settings for kids
    utterance.rate = options.rate || 0.9 // Slightly slower for clarity
    utterance.pitch = options.pitch || 1.2 // Slightly higher pitch for friendliness
    utterance.volume = options.volume || 1.0

    // Try to find a friendly voice (prefer female voices for kids)
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (voice) =>
        voice.lang.startsWith('en') &&
        (voice.name.includes('Female') || voice.name.includes('Samantha'))
    ) || voices.find((voice) => voice.lang.startsWith('en'))

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    window.speechSynthesis.speak(utterance)
  } catch (error) {
    console.warn('Speech synthesis failed:', error)
  }
}

// Preload voices (some browsers need this)
export const initializeVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices())
      }
    }
  })
}

// Play celebration sound
export const playCelebrationSound = () => {
  try {
    const ctx = getAudioContext()
    const notes = [523.25, 659.25, 783.99, 1046.50] // C, E, G, C (major chord)

    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15)
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime + index * 0.15)
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + index * 0.15 + 0.5
      )

      oscillator.start(ctx.currentTime + index * 0.15)
      oscillator.stop(ctx.currentTime + index * 0.15 + 0.5)
    })
  } catch (error) {
    console.warn('Celebration sound failed:', error)
  }
}

