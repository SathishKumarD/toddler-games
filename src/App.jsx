import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import AlphabetBalloons from './games/AlphabetBalloons'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/alphabet-balloons" element={<AlphabetBalloons />} />
      </Routes>
    </div>
  )
}

export default App

