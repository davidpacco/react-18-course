import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import './App.css'

function App() {
  const { fact, loading, getCatFact } = useCatFact()
  const { imgUrl, firstWord } = useCatImage({ fact })

  const handleClick = async () => {
    getCatFact()
  }

  return (
    <main>
      <h2>Cat&apos;s App</h2>
      <button onClick={handleClick}>Refresh</button>
      {loading && <p>Loading...</p>}
      {fact && !loading && <p className='fact'>{fact}</p>}
      {imgUrl && !loading && <img className='cat-img' src={imgUrl} alt={`Cat saying '${firstWord}'`} />}
    </main>
  )
}

export default App
