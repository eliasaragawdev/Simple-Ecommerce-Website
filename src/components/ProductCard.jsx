import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const inStock = product.stock > 0

  return (
    <article className="card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className={inStock ? 'stock in' : 'stock out'}>
          {inStock ? `In stock (${product.stock})` : 'Out of stock'}
        </p>
        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="btn secondary">
            Details
          </Link>
          <button
            className="btn"
            onClick={() => addToCart(product)}
            disabled={!inStock}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
