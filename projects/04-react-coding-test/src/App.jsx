import { useEffect, useState } from 'react'
import './App.css'

const RANDOM_FACT_API = 'https://catfact.ninja/fact'
const RANDOM_IMG_API = 'https://cataas.com/cat/says'

function App() {
  const [loading, setLoading] = useState(true)
  const [fact, setFact] = useState('')
  const [firstWord, setFirstWord] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    fetch(RANDOM_FACT_API)
      .then(res => res.json())
      .then(data => {
        setFact(data.fact)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const firstWord = fact.split(' ', 1)
    setFirstWord(firstWord)
    const url = `${RANDOM_IMG_API}/${firstWord}`
    setImgUrl(url)
  }, [fact])

  return (
    <main>
      <h2>Cat&apos;s App</h2>
      {loading && <p>Loading...</p>}
      {fact && <p className='fact'>{fact}</p>}
      {imgUrl && <img className='cat-img' src={imgUrl} alt={`Cat saying '${firstWord}'`} />}
    </main>
  )
}

export default App
