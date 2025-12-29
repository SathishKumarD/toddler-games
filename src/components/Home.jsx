import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { games } from '../config/games'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <motion.div
        className="home-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h1 className="home-title">🎮 Learning Games</h1>
        <p className="home-subtitle">Tap a game to start learning!</p>
      </motion.div>

      <div className="games-grid">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className="game-card"
            style={{ background: game.gradient }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.2,
              duration: 0.5,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(game.path)}
          >
            <div className="game-icon">{game.icon}</div>
            <h2 className="game-title">{game.title}</h2>
            <p className="game-description">{game.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="pwa-install-prompt"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p>💡 Tap your browser menu to install this app!</p>
      </motion.div>
    </div>
  )
}

export default Home

