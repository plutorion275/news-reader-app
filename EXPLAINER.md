# EXPLAINER

A plain-language tour of what this app is and how it's put together.

## What it does

NewsReader is a single page you open in a browser. It shows a feed of
current news headlines with pictures, sources, and timestamps. You can:

- Switch between 7 topics (Top, Tech, Sports, Business, Health,
  Entertainment, Science) using the tabs at the top.
- Type in the search box to look up headlines about anything (e.g.
  "election"); the search waits until you pause typing for 400ms before
  firing, so it doesn't spam the API on every keystroke.
- Click any headline to open a detail panel with a bigger picture, an
  excerpt of the article's text, and a link to read the full thing on
  the original site.

It talks to [NewsAPI.org](https://newsapi.org) for the actual news data
— this app doesn't have its own database or write any articles itself,
it's a viewer.

## Why it's local/dev-only (for now)

NewsAPI's free tier only allows requests that come from `localhost`, not
from a real deployed website. So v1 of this app is meant to be run on
your own machine with `npm run dev`, not deployed publicly. If that
changes later, the fix would be adding a small server (a "proxy") that
holds the API key and forwards requests, so the browser never talks to
NewsAPI directly. That's flagged in `PLAN.md` as a future idea, not
something built here.

## How a request flows through the app

1. The app starts, and by default asks for `top-headlines` in the
   "general" category.
2. That request goes through `src/api/newsApi.js`, which is the only
   file that knows the NewsAPI URL shape and your API key. Every other
   file just calls plain functions like `fetchTopHeadlines()`.
3. `src/hooks/useArticles.js` is the piece that actually calls those
   functions and tracks three states: `loading`, `success`, or `error`.
   `src/App.jsx` reads that state and decides what to show — a
   skeleton feed, the real articles, an error message, or a "no
   results" message.
4. If you click a category tab, `App.jsx` updates which category is
   "active," which makes `useArticles` fire a new request automatically
   (this is a `useEffect` — a piece of code that re-runs whenever the
   values it depends on change).
5. If you type in the search box, after a short pause the app switches
   from asking for `top-headlines` to asking for `everything` matching
   your search term instead. Clearing the box switches it back.
6. If you click an article card, the app just remembers "this is the
   selected article" and shows a modal on top of the page with more
   detail about it — no new network request needed, since the feed
   already has all that article's data.

## Folder map

```
src/
  App.jsx                    top-level page: header + feed + modal
  App.css / index.css        all the styling (plain CSS, no framework)
  api/newsApi.js             the only file that talks to NewsAPI.org
  hooks/useArticles.js       fetch + loading/success/error state
  hooks/useDebouncedValue.js "wait until typing pauses" helper
  constants/categories.js    the list of 7 category tabs
  components/
    CategoryTabs.jsx         the topic tab bar
    SearchBar.jsx             the search input
    ArticleFeed.jsx           the list wrapper
    ArticleCard.jsx           one headline in the feed
    ArticleDetail.jsx         the modal you see after clicking a card
    FeedSkeleton.jsx          the shimmering placeholder shown while loading
  App.test.jsx                automated tests (see below)
  setupTests.js                wiring for the test tool
```

## What "Excerpt" means in the detail view

NewsAPI gives back a `content` field that's a truncated chunk of the
article's text (usually cut off after ~200 characters with a "chars
left" marker). This app labels that clearly as **"Excerpt"** rather than
"Summary," because it's not a generated summary — it's just a raw,
truncated snippet from the source. If you want the whole story, that's
what the "Read full article" link is for.

## How it's tested

There's no live API key baked into this environment, so the test suite
(`npm run test`, in `src/App.test.jsx`) fakes the network call
(`global.fetch`) and checks that the app reacts correctly to a handful
of scenarios: a slow request (loading state), a successful one, a failed
one (bad API key), an empty result set, opening/closing the detail
modal, and switching between category mode and search mode. This is the
same technique you'd use to test any app that depends on an external
API without needing that API to actually be up and reachable during
tests.

## Running it yourself

See `README.md` for the exact steps — short version: `npm install`, get
a free key from newsapi.org, put it in a `.env` file, `npm run dev`.
