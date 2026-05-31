import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import SearchFilterBar from '../components/SearchFilterBar.jsx'
import { CATEGORIES } from '../data/products.js'
import {
  loadProductsWithCache,
  loadSessionFilters,
  saveSessionFilters,
} from '../utils/storage.js'

function HomePage() {
  const initialFilters = loadSessionFilters()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(initialFilters.search)
  const [category, setCategory] = useState(initialFilters.category)

  useEffect(() => {
    let mounted = true
    loadProductsWithCache().then((result) => {
      if (!mounted) return
      setProducts(result)
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    saveSessionFilters({ search, category })
  }, [search, category])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const byName = product.name.toLowerCase().includes(search.toLowerCase())
      const byCategory = category === 'All' || product.category === category
      return byName && byCategory
    })
  }, [products, search, category])

  return (
    <section>
      <h1>Our products</h1>
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={CATEGORIES}
      />

      {loading ? (
        <p className="state-text">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="state-text">No products match your search/filter.</p>
      ) : (
        <div className={`grid category-${category.toLowerCase()}`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default HomePage
