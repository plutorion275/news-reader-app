function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search news…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search news"
    />
  )
}

export default SearchBar
