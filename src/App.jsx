import { useState } from 'react'
import ArticleFeed from './components/ArticleFeed'
import CategoryTabs from './components/CategoryTabs'
import { useArticles } from './hooks/useArticles'
import './App.css'

function App() {
  const [category, setCategory] = useState('general')
  const { articles, status, error } = useArticles({ category })

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">NewsReader</h1>
        <CategoryTabs activeCategory={category} onSelectCategory={setCategory} />
      </header>
      <main className="app-main">
        {status === 'loading' && (
          <p className="feed-placeholder">Loading headlines…</p>
        )}
        {status === 'error' && (
          <p className="feed-placeholder">
            Couldn't load news: {error.message}
          </p>
        )}
        {status === 'success' && articles.length === 0 && (
          <p className="feed-placeholder">No articles found.</p>
        )}
        {status === 'success' && articles.length > 0 && (
          <ArticleFeed articles={articles} onSelectArticle={() => {}} />
        )}
      </main>
    </>
  )
}

export default App
