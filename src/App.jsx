import { useState } from 'react'
import ArticleDetail from './components/ArticleDetail'
import ArticleFeed from './components/ArticleFeed'
import CategoryTabs from './components/CategoryTabs'
import FeedSkeleton from './components/FeedSkeleton'
import SearchBar from './components/SearchBar'
import { useArticles } from './hooks/useArticles'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import './App.css'

function App() {
  const [category, setCategory] = useState('general')
  const [search, setSearch] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const debouncedSearch = useDebouncedValue(search.trim(), 400)

  const { articles, status, error } = useArticles({
    category,
    query: debouncedSearch || undefined,
  })

  function handleSelectCategory(nextCategory) {
    setCategory(nextCategory)
    setSearch('')
  }

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">NewsReader</h1>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryTabs
          activeCategory={category}
          onSelectCategory={handleSelectCategory}
        />
      </header>
      <main className="app-main">
        {status === 'loading' && (
          <>
            <p className="sr-only" role="status">
              Loading headlines…
            </p>
            <FeedSkeleton />
          </>
        )}
        {status === 'error' && (
          <div className="feed-placeholder feed-placeholder-error" role="alert">
            <p>Couldn't load news.</p>
            <p className="feed-placeholder-detail">{error.message}</p>
          </div>
        )}
        {status === 'success' && articles.length === 0 && (
          <p className="feed-placeholder">
            {debouncedSearch
              ? `No results for "${debouncedSearch}".`
              : 'No articles found in this category right now.'}
          </p>
        )}
        {status === 'success' && articles.length > 0 && (
          <ArticleFeed
            articles={articles}
            onSelectArticle={setSelectedArticle}
          />
        )}
      </main>
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  )
}

export default App
