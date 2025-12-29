// This is a helper script to generate PWA icons
// For production, use a proper icon generator or design tool

export const generateIconCanvas = (size) => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(1, '#764ba2')
  
  // Rounded rectangle
  const radius = size * 0.2
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.moveTo(radius, 0)
  ctx.lineTo(size - radius, 0)
  ctx.quadraticCurveTo(size, 0, size, radius)
  ctx.lineTo(size, size - radius)
  ctx.quadraticCurveTo(size, size, size - radius, size)
  ctx.lineTo(radius, size)
  ctx.quadraticCurveTo(0, size, 0, size - radius)
  ctx.lineTo(0, radius)
  ctx.quadraticCurveTo(0, 0, radius, 0)
  ctx.closePath()
  ctx.fill()

  // Emoji/Text
  ctx.font = `bold ${size * 0.5}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'white'
  ctx.fillText('🎈', size / 2, size / 2)

  return canvas
}

export const downloadIcon = (size, filename) => {
  const canvas = generateIconCanvas(size)
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  })
}

// Usage: Call this from browser console if needed
// import { downloadIcon } from './utils/generateIcons'
// downloadIcon(192, 'pwa-192x192.png')
// downloadIcon(512, 'pwa-512x512.png')

