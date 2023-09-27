import { useState } from 'react'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'
import './App.css'
import { useCallback } from 'react'

function App() {
  const [sort, setSort] = useState(false)
  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies(search)
  }, 300)
    , [getMovies])

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies(search)
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleCheck = () => setSort(!sort)

  return (
    <>
      <header>
        <h2>Movie Searcher</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input className="search" required autoComplete='off' onChange={handleChange} value={search} name="search" placeholder="Avengers..." type="text" />
          <input className="checkbox" checked={sort} type="checkbox" onChange={handleCheck} />
          <button type="submit">Search</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
      </main>
    </>
  )
}

export default App
