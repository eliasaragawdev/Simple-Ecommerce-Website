import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p className="state-text">Your cart is empty.</p>
        <Link to="/" className="btn">
          Continue Shopping
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Your Cart</h1>
      <div className="list">
        {cartItems.map((item) => (
          <article key={item.id} className="list-item">
            <div>
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)} each</p>
            </div>
            <div className="cart-controls">
              <input
                type="number"
                min="1"
                max={item.stock}
                value={item.quantity}
                onChange={(event) =>
                  updateQuantity(item.id, Number(event.target.value))
                }
              />
              <button
                className="btn secondary"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
      <Link to="/checkout" className="btn">
        Proceed to Checkout
      </Link>
    </section>
  )
}

export default CartPage
