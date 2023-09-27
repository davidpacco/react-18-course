import { useState, useRef, useMemo } from "react"
import { searchMovies } from "../services/movies"
import { useCallback } from "react"

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async (search) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      const moviesList = await searchMovies({ search })
      setMovies(moviesList)
    }
    finally {
      setLoading(false)
      previousSearch.current = search
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies]?.sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}