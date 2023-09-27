import { useState, useEffect, useRef } from "react"

export function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInputValue = useRef(true)

  const updateSearch = (value) => {
    if (value.startsWith(' ')) return
    setSearch(value)
  }

  useEffect(() => {
    if (isFirstInputValue.current) {
      isFirstInputValue.current = search === ''
      return
    }
    if (search === '') {
      setError('Empty field. Please write a movie title.')
      return
    }
    if (search.length < 3) {
      setError('The search must have at least 3 characters')
      return
    }

    setError(null)
  }, [search])

  return { search, error, updateSearch }
}