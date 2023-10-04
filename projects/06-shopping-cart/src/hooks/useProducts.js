import { useState, useEffect } from "react"

export function useProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return { products }
}