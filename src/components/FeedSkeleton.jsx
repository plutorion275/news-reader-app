function FeedSkeleton({ count = 6 }) {
  return (
    <ul className="article-feed" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <li className="article-card article-card-skeleton" key={i}>
          <div className="article-card-thumb skeleton-block" />
          <div className="article-card-body">
            <div className="skeleton-line skeleton-line-title" />
            <div className="skeleton-line skeleton-line-meta" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default FeedSkeleton
