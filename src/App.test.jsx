import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

function jsonResponse(body, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(body),
  })
}

const sampleArticle = {
  url: 'https://example.com/article-1',
  title: 'Sample headline',
  description: 'A sample description',
  content: 'A sample excerpt content',
  author: 'Jane Doe',
  urlToImage: 'https://example.com/thumb.jpg',
  publishedAt: new Date().toISOString(),
  source: { name: 'Example News' },
}

beforeEach(() => {
  global.fetch = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('App', () => {
  it('shows a loading state before results arrive', async () => {
    let resolveFetch
    global.fetch.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve
      }),
    )

    render(<App />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading headlines')

    resolveFetch(await jsonResponse({ status: 'ok', articles: [sampleArticle] }))
    await waitFor(() => screen.getByText('Sample headline'))
  })

  it('renders articles on a successful fetch', async () => {
    global.fetch.mockReturnValue(
      jsonResponse({ status: 'ok', articles: [sampleArticle] }),
    )

    render(<App />)
    expect(await screen.findByText('Sample headline')).toBeInTheDocument()
    expect(screen.getByText('Example News')).toBeInTheDocument()
  })

  it('shows an error message when the API call fails (e.g. bad key)', async () => {
    global.fetch.mockReturnValue(
      jsonResponse(
        { status: 'error', message: 'Your API key is invalid.' },
        false,
        401,
      ),
    )

    render(<App />)
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Your API key is invalid.',
    )
  })

  it('shows a no-results message when the feed is empty', async () => {
    global.fetch.mockReturnValue(jsonResponse({ status: 'ok', articles: [] }))

    render(<App />)
    expect(
      await screen.findByText('No articles found in this category right now.'),
    ).toBeInTheDocument()
  })

  it('opens and closes the article detail modal', async () => {
    global.fetch.mockReturnValue(
      jsonResponse({ status: 'ok', articles: [sampleArticle] }),
    )

    render(<App />)
    const card = await screen.findByText('Sample headline')
    fireEvent.click(card)

    expect(screen.getByText('Excerpt')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /read full article/i })).toHaveAttribute(
      'href',
      sampleArticle.url,
    )

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByText('Excerpt')).not.toBeInTheDocument()
  })

  it('switches to search mode and back to the category feed on clear', async () => {
    global.fetch.mockImplementation((url) => {
      const isSearch = url.toString().includes('/everything')
      return jsonResponse({
        status: 'ok',
        articles: [
          {
            ...sampleArticle,
            url: isSearch
              ? 'https://example.com/search-result'
              : sampleArticle.url,
            title: isSearch ? 'Search result headline' : sampleArticle.title,
          },
        ],
      })
    })

    render(<App />)
    await screen.findByText('Sample headline')

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'election' },
    })

    await waitFor(
      () => expect(screen.getByText('Search result headline')).toBeInTheDocument(),
      { timeout: 2000 },
    )

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: '' } })

    await waitFor(
      () => expect(screen.getByText('Sample headline')).toBeInTheDocument(),
      { timeout: 2000 },
    )
  })
})
