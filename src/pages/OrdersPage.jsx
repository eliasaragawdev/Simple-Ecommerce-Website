import { useEffect } from 'react'
import { PRODUCTS } from '../data/products.js'

const ORDER_KEY = 'orders'

function OrdersPage() {
  useEffect(() => {
    localStorage.removeItem(ORDER_KEY)
  }, [])

  const ipad = PRODUCTS.find((product) => product.name.toLowerCase() === 'ipad')
  const order = ipad
    ? {
      id: 1,
      items: [
        {
          id: ipad.id,
          name: ipad.name,
          quantity: 1,
          price: ipad.price,
        },
      ],
      total: ipad.price,
    }
    : null

  return (
    <section>
      <h1>Order History</h1>
      {order ? (
        <div className="list">
          <article className="list-item order-card" key={order.id}>
            <div>
              <h3>Order #{order.id}</h3>
            </div>
            <div>
              {order.items.map((item) => (
                <p key={`${order.id}-${item.id}`}>
                  {item.name} — {item.quantity} pcs — ${item.price.toFixed(2)} each — ${(
                    item.price * item.quantity
                  ).toFixed(2)}
                </p>
              ))}
              <p className="cart-total">Total: ${order.total.toFixed(2)}</p>
            </div>
          </article>
        </div>
      ) : (
        <p className="state-text">No previous orders found.</p>
      )}
    </section>
  )
}

export default OrdersPage
