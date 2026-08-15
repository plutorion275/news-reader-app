function ArticleDetail({ article, onClose }) {
  return (
    <div className="article-detail-overlay" onClick={onClose}>
      <div
        className="article-detail"
        role="dialog"
        aria-modal="true"
        aria-label={article.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="article-detail-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {article.urlToImage && (
          <img
            className="article-detail-image"
            src={article.urlToImage}
            alt=""
          />
        )}
        <div className="article-detail-body">
          <h2 className="article-detail-title">{article.title}</h2>
          <div className="article-card-meta">
            <span>{article.source?.name}</span>
            {article.author && <span> · {article.author}</span>}
          </div>
          {article.description && (
            <p className="article-detail-description">
              {article.description}
            </p>
          )}
          {article.content && (
            <div className="article-detail-excerpt">
              <span className="article-detail-excerpt-label">Excerpt</span>
              <p>{article.content}</p>
            </div>
          )}
          <a
            className="article-detail-link"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full article ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
