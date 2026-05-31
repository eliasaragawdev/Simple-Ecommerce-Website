import { Link, useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import { useCart } from '../context/useCart.js'

function ProductDetailsPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = PRODUCTS.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <section>
        <h1>Product not found</h1>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </section>
    )
  }

  const inStock = product.stock > 0

  return (
    <section className="detail-page">
      <img src={product.image} alt={product.name} className="detail-image" />
      <div>
        <h1>{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p className={inStock ? 'stock in' : 'stock out'}>
          {inStock ? `In stock (${product.stock})` : 'Out of stock'}
        </p>
        <button
          className="btn"
          onClick={() => addToCart(product)}
          disabled={!inStock}
        >
          Add to cart
        </button>
      </div>
    </section>
  )
}

export default ProductDetailsPage
