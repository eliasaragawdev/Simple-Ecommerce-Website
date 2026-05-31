import { createContext, useEffect, useMemo, useState } from 'react'

const CART_KEY = 'cart_items'
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(CART_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    if (product.stock === 0) return
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item,
        )
      }
      return [...prev, { ...product, quantity: Math.min(quantity, product.stock) }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== productId) return item
          const nextQuantity = Math.max(1, Math.min(quantity, item.stock))
          return { ...item, quantity: nextQuantity }
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContext }
