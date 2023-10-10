import { useEffect } from "react"

export default function Search({ params }) {
  useEffect(() => {
    window.document.title = `${params.query}`
  }, [])

  return (
    <h1>Search: {params.query}</h1>
  )
}
