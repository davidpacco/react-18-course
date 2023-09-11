import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const followerStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    display: `${enabled ? 'block' : 'none'}`
  }

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }

  }, [enabled])


  return (
    <main>
      <div className="follower" style={followerStyle}></div>
      <h2>Mouse follower</h2>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Deactivate' : 'Activate'}
      </button>
    </main>
  )
}

export default App
