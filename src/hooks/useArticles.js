import { useEffect, useState } from 'react'
import { fetchEverything, fetchTopHeadlines } from '../api/newsApi'

export function useArticles({ category, query }) {
  const [articles, setArticles] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setStatus('loading')
    setError(null)

    const request = query
      ? fetchEverything({ query })
      : fetchTopHeadlines({ category })

    request
      .then((results) => {
        if (cancelled) return
        setArticles(results)
        setStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [category, query])

  return { articles, status, error }
}
