import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart.js'

const ORDER_KEY = 'orders'

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', address: '' })
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState('')

  const isCartEmpty = useMemo(() => cartItems.length === 0, [cartItems])

  const onInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitOrder = (event) => {
    event.preventDefault()
    if (!formData.name || !formData.email || !formData.address) {
      setError('All fields are required.')
      return
    }
    if (isCartEmpty) {
      setError('Your cart is empty.')
      return
    }

    const existingOrders = JSON.parse(localStorage.getItem(ORDER_KEY) ?? '[]')
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      customer: formData,
      items: cartItems,
      total: cartTotal,
    }

    localStorage.setItem(ORDER_KEY, JSON.stringify([order, ...existingOrders]))
    clearCart()
    setError('')
    setConfirmation('Order placed successfully!')
  }

  return (
    <section>
      <h1>Checkout</h1>
      {confirmation ? (
        <div className="confirmation">
          <p>{confirmation}</p>
          <button className="btn" onClick={() => navigate('/orders')}>
            View Orders
          </button>
        </div>
      ) : (
        <div className="checkout">
          <form onSubmit={submitOrder} className="checkout-form">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={formData.name} onChange={onInputChange} />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
            />

            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={onInputChange}
            />

            {error && <p className="error">{error}</p>}
            <button className="btn" type="submit">
              Place Order
            </button>
          </form>

          <aside className="summary">
            <h2>Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="state-text">No items in cart.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <p key={item.id}>
                    {item.name} x {item.quantity} = $
                    {(item.quantity * item.price).toFixed(2)}
                  </p>
                ))}
                <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
              </>
            )}
          </aside>
        </div>
      )}
    </section>
  )
}

export default CheckoutPage
