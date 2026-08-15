import { CATEGORIES } from '../constants/categories'

function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <nav className="category-tabs" aria-label="Categories">
      {CATEGORIES.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={
            'category-tab' + (key === activeCategory ? ' is-active' : '')
          }
          aria-pressed={key === activeCategory}
          onClick={() => onSelectCategory(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

export default CategoryTabs
