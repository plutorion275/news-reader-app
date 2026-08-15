function formatRelativeTime(isoDate) {
  if (!isoDate) return ''
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const diffMinutes = Math.round(diffMs / 60000)
  if (diffMinutes < 1) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.round(diffHours / 24)
  return `${diffDays}d ago`
}

function ArticleCard({ article, onSelect }) {
  return (
    <li className="article-card" onClick={() => onSelect(article)}>
      {article.urlToImage ? (
        <img
          className="article-card-thumb"
          src={article.urlToImage}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling.style.display = 'flex'
          }}
        />
      ) : null}
      <div
        className="article-card-thumb article-card-thumb-placeholder"
        style={{ display: article.urlToImage ? 'none' : 'flex' }}
      >
        📰
      </div>
      <div className="article-card-body">
        <h2 className="article-card-title">{article.title}</h2>
        <div className="article-card-meta">
          <span className="article-card-source">{article.source?.name}</span>
          <span aria-hidden="true"> · </span>
          <span className="article-card-time">
            {formatRelativeTime(article.publishedAt)}
          </span>
        </div>
      </div>
    </li>
  )
}

export default ArticleCard
