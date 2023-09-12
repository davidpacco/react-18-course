import { useState, useEffect } from "react"

const RANDOM_IMG_PREFIX = 'https://cataas.com/cat/says'

export function useCatImage({ fact }) {
  const [imgUrl, setImgUrl] = useState('')
  const [firstWord, setFirstWord] = useState('')

  useEffect(() => {
    if (!fact) return
    const firstWord = fact.split(' ', 1)
    setFirstWord(firstWord)
    const url = `${RANDOM_IMG_PREFIX}/${firstWord}`
    setImgUrl(url)
  }, [fact])

  return { imgUrl, firstWord }
}