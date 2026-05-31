import { Link, NavLink, Outlet } from 'react-router-dom'
import { useCart } from '../context/useCart.js'

function Layout() {
  const { cartCount } = useCart()

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          Welcome to the ShopMarket
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
          <NavLink to="/orders">Orders</NavLink>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
