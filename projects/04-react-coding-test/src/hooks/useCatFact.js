import { useState, useEffect } from "react"
import { getRandomFact } from "../services/facts"

export function useCatFact() {
  const [fact, setFact] = useState('')
  const [loading, setLoading] = useState(false)

  const getCatFact = async () => {
    setLoading(true)
    const newFact = await getRandomFact()
    setFact(newFact)
    setLoading(false)
  }

  useEffect(() => {
    getCatFact()
  }, [])

  return { fact, loading, getCatFact }
}