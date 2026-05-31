function SearchFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) {
  return (
    <section className="filters">
      <div>
        <label htmlFor="search">Search Products</label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Type product name..."
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export default SearchFilterBar
