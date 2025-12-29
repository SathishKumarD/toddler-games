# Toddler Learning Games 🎈

A Progressive Web App (PWA) with fun, interactive games to help toddlers learn alphabets, phonetics, numbers, and more!

## Features

- 🎮 Multiple educational games
- 📱 PWA - Install on any device
- 🎨 Colorful, kid-friendly interface
- 🔊 Sound effects and voice feedback
- 📦 Modular architecture for easy expansion

## Games

### 1. Alphabet Balloons
- Interactive balloons with letters A-Z
- Burst balloons to learn letters and words
- Physics-based animations with gravity
- Voice feedback for each letter

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:4001`

### Build

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── games/           # Individual game components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── assets/          # Images, sounds, fonts
├── styles/          # Global styles
└── config/          # Game configurations
```

## Adding New Games

1. Create a new component in `src/games/`
2. Add game configuration to `src/config/games.js`
3. Update routing in `src/App.jsx`

## License

MIT

