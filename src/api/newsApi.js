const BASE_URL = 'https://newsapi.org/v2'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

class NewsApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'NewsApiError'
    this.status = status
  }
}

async function request(path, params) {
  if (!API_KEY) {
    throw new NewsApiError(
      'Missing NewsAPI key. Add VITE_NEWS_API_KEY to your .env file.',
    )
  }

  const url = new URL(`${BASE_URL}${path}`)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  }
  url.searchParams.set('apiKey', API_KEY)

  const response = await fetch(url)
  const data = await response.json()

  if (!response.ok || data.status === 'error') {
    throw new NewsApiError(
      data.message || `Request failed with status ${response.status}`,
      response.status,
    )
  }

  return data.articles ?? []
}

export function fetchTopHeadlines({ category, country = 'us' }) {
  return request('/top-headlines', { category, country })
}

export function fetchEverything({ query }) {
  return request('/everything', { q: query, sortBy: 'publishedAt' })
}

export { NewsApiError }
