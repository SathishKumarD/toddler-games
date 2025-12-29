# Game Development Guide

This guide explains how to add new games to the Toddler Learning Games app.

## Architecture Overview

The app is built with a modular architecture:

```
src/
├── components/       # Reusable UI components (Home, etc.)
├── games/           # Individual game components
│   ├── AlphabetBalloons.jsx
│   ├── AlphabetBalloons.css
│   └── components/  # Game-specific components
├── config/          # Configuration files
│   ├── games.js     # Game registry
│   └── alphabetData.js
├── utils/           # Utility functions (audio, physics, etc.)
└── styles/          # Global styles
```

## Adding a New Game

### Step 1: Create Game Component

Create your game in `src/games/YourGame.jsx`:

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './YourGame.css'

function YourGame() {
  const navigate = useNavigate()
  
  return (
    <div className="your-game">
      <div className="game-header">
        <button onClick={() => navigate('/')}>← Home</button>
      </div>
      <div className="game-area">
        {/* Your game content */}
      </div>
    </div>
  )
}

export default YourGame
```

### Step 2: Add Game Styles

Create `src/games/YourGame.css`:

```css
.your-game {
  width: 100%;
  height: 100%;
  /* Your game styles */
}
```

### Step 3: Register the Game

Add your game to `src/config/games.js`:

```javascript
export const games = [
  {
    id: 'alphabet-balloons',
    title: 'Alphabet Balloons',
    description: 'Pop balloons to learn your ABCs!',
    path: '/game/alphabet-balloons',
    icon: '🎈',
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
  },
  // Add your new game here:
  {
    id: 'your-game-id',
    title: 'Your Game Title',
    description: 'Short description',
    path: '/game/your-game-id',
    icon: '🎮',
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
  },
]
```

### Step 4: Add Route

Update `src/App.jsx`:

```jsx
import YourGame from './games/YourGame'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/alphabet-balloons" element={<AlphabetBalloons />} />
        <Route path="/game/your-game-id" element={<YourGame />} />
      </Routes>
    </div>
  )
}
```

## Game Design Best Practices

### 1. Keep It Simple
- Toddlers need simple, clear interactions
- Large, colorful buttons and objects
- Minimal text, use emojis and icons

### 2. Responsive Design
- Support both portrait and landscape
- Touch-friendly (no small targets)
- Consider different screen sizes

### 3. Audio Feedback
Use the audio utilities:

```javascript
import { playPopSound, speak } from '../utils/audio'

// Play sound effect
playPopSound()

// Text-to-speech
speak('A is for Apple')
```

### 4. Visual Feedback
Use Framer Motion for animations:

```jsx
import { motion } from 'framer-motion'

<motion.div
  whileTap={{ scale: 0.9 }}
  whileHover={{ scale: 1.1 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {/* content */}
</motion.div>
```

### 5. Physics and Animations
For games with physics (like falling objects):

```javascript
const [position, setPosition] = useState({ x: 0, y: 0 })
const [velocity, setVelocity] = useState({ x: 0, y: 0 })

useEffect(() => {
  const animate = () => {
    setPosition(prev => ({
      x: prev.x + velocity.x,
      y: prev.y + velocity.y
    }))
    
    // Apply gravity
    setVelocity(v => ({
      ...v,
      y: v.y + GRAVITY
    }))
    
    requestAnimationFrame(animate)
  }
  
  const frame = requestAnimationFrame(animate)
  return () => cancelAnimationFrame(frame)
}, [velocity])
```

## Game Ideas

Here are some ideas for additional games:

### 1. Counting Stars ⭐
- Stars appear on screen
- Kids tap to count: "1... 2... 3..."
- Celebrates when reaching target number

### 2. Shape Matching 🔷
- Drag shapes to matching outlines
- Different colors and sizes
- Voice feedback: "Great! That's a circle!"

### 3. Color Mixer 🎨
- Mix two colors to create new ones
- Visual feedback with animated mixing
- Learn color names

### 4. Animal Sounds 🐶
- Cards with animal pictures
- Tap to hear animal sounds
- Learn animal names

### 5. Musical Notes 🎵
- Tap colorful keys to play notes
- Simple melodies
- Learn musical concepts

### 6. Fruit Basket 🍎
- Fruits fall from top
- Tap to collect in basket
- Learn fruit names and counting

## Performance Tips

1. **Use React.memo** for expensive components
2. **Debounce** rapid user interactions
3. **Lazy load** games using React.lazy
4. **Optimize animations** - use CSS transforms
5. **Clean up** event listeners and animations

## Testing with Kids

- Test with actual toddlers (ages 2-5)
- Observe what confuses them
- Adjust difficulty and pacing
- Ensure immediate, positive feedback
- Keep sessions short (5-10 minutes)

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [PWA Best Practices](https://web.dev/pwa/)

