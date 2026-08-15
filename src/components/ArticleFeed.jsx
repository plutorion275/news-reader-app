import ArticleCard from './ArticleCard'

function ArticleFeed({ articles, onSelectArticle }) {
  return (
    <ul className="article-feed">
      {articles.map((article) => (
        <ArticleCard
          key={article.url}
          article={article}
          onSelect={onSelectArticle}
        />
      ))}
    </ul>
  )
}

export default ArticleFeed
