import { createContext } from 'react'
import { useCartProvider } from '../hooks/useCartProvider'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartProvider()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}