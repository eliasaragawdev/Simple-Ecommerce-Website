import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>
    </Routes>
  )
}

export default App
