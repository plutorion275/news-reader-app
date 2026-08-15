import ArticleFeed from './components/ArticleFeed'
import { useArticles } from './hooks/useArticles'
import './App.css'

const DEFAULT_CATEGORY = 'general'

function App() {
  const { articles, status, error } = useArticles({
    category: DEFAULT_CATEGORY,
  })

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">NewsReader</h1>
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
