import { useId } from 'react'
import { CartIcon, RemoveFromCartIcon, ClearCartIcon } from './Icons.jsx'
import './Cart.css'
import { useCart } from '../hooks/useCart.js'

function CartItem({ images, title, price, quantity, addToCart }) {
  return (
    <li>
      <img
        src={images[0]}
        alt={title}
      />
      <div>
        <span><strong>{title}</strong>{price}</span>
      </div>

      <footer>
        {/* <button>-</button> */}
        <p>Qty: {quantity}</p>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart() {
  const cartCheckboxId = useId()
  const { addToCart, cart, clearCart } = useCart()

  return (
    <section>
      <label htmlFor={cartCheckboxId} className="cart-button">
        <CartIcon />
      </label>
      <input hidden type="checkbox" id={cartCheckboxId} />

      <aside className="cart">
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </section>
  )
}
