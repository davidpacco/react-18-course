import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import './Products.css'

export function Products({ products }) {
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <div className="products">
      <ul>
        {products.map(product => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li key={product.id}>
              <img src={product.images[0]} alt={product.title} />
              <div>
                <span><strong>{product.title}</strong> - ${product.price}</span>
              </div>
              <div>
                <button className={isProductInCart ? 'remove-btn' : 'add-btn'} onClick={() => isProductInCart ? removeFromCart(product) : addToCart(product)}>
                  {
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}