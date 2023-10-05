export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const productInCartIndex = state.findIndex(item => item.id === action.payload.id)

      if (productInCartIndex >= 0) {
        const newCart = structuredClone(state)
        newCart[productInCartIndex].quantity += 1
        updateLocalStorage(newCart)
        return newCart
      }

      const newCart = [
        ...state,
        {
          ...action.payload,
          quantity: 1
        }
      ]

      updateLocalStorage(newCart)
      return newCart
    }

    case 'REMOVE_FROM_CART': {
      const newCart = state.filter(item => item.id !== action.payload.id)
      updateLocalStorage(newCart)
      return newCart
    }

    case 'CLEAR_CART':
      updateLocalStorage([])
      return []

    default:
      return state
  }
}