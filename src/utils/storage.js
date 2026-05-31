import { PRODUCTS } from '../data/products.js'

const PRODUCT_CACHE_KEY = 'product_cache'
const PRODUCT_CACHE_TIME = 5 * 60 * 1000
const RECENT_SEARCHES_KEY = 'recent_searches'
const FILTER_SESSION_KEY = 'filter_session'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function loadProductsWithCache() {
  const cached = localStorage.getItem(PRODUCT_CACHE_KEY)
  const now = Date.now()

  if (cached) {
    const parsed = JSON.parse(cached)
    if (now - parsed.timestamp < PRODUCT_CACHE_TIME) {
      return parsed.products
    }
  }

  await wait(500)
  localStorage.setItem(
    PRODUCT_CACHE_KEY,
    JSON.stringify({ timestamp: now, products: PRODUCTS }),
  )
  return PRODUCTS
}

export function loadRecentSearches() {
  const data = localStorage.getItem(RECENT_SEARCHES_KEY)
  return data ? JSON.parse(data) : []
}

export function saveRecentSearch(query) {
  const normalized = query.trim()
  if (!normalized) return

  const current = loadRecentSearches()
  const unique = [normalized, ...current.filter((item) => item !== normalized)]
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(unique.slice(0, 3)))
}

export function loadSessionFilters() {
  const data = sessionStorage.getItem(FILTER_SESSION_KEY)
  return data ? JSON.parse(data) : { search: '', category: 'All' }
}

export function saveSessionFilters(filters) {
  sessionStorage.setItem(FILTER_SESSION_KEY, JSON.stringify(filters))
}
