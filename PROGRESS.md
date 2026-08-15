# Progress Log

Implementation of `PLAN.md`, tracked milestone by milestone. All six
milestones are complete and committed.

## Milestone 1 — Scaffold (`567fabb`)

Vite + React project scaffolded with a basic header/feed layout shell,
`.env.example` for the NewsAPI key, oxlint config, and `.gitignore`.

- Smoke test: `npm run dev` serves a blank layout shell (header title +
  empty `<main>`) with no console errors. ✅

## Milestone 2 — Live feed (`05a6480`)

Added `api/newsApi.js` (fetch wrapper around `/v2/top-headlines` and
`/v2/everything`, with a `NewsApiError` for normalized failures) and
`hooks/useArticles.js` (loading/success/error state machine). Added
`ArticleFeed`/`ArticleCard` components rendering thumbnail, headline,
source, and relative timestamp, with a 📰 placeholder shown on missing or
broken images (`onError` swaps the `<img>` for a placeholder `<div>`).

- Smoke test: with a valid `VITE_NEWS_API_KEY`, `npm run dev` shows real
  headlines and thumbnails; an article with no `urlToImage` shows the
  placeholder. ✅ (verified via unit test with mocked `fetch`, since this
  sandbox has no live API key — see Testing below.)

## Milestone 3 — Category tabs (`dd5adf0`)

Added `constants/categories.js` (the 7 categories) and
`components/CategoryTabs.jsx`. Selecting a tab updates `category` state
in `App.jsx`, which `useArticles` re-fetches on (it's in the effect's
dependency array).

- Smoke test: clicking each of the 7 tabs re-fetches and changes the
  feed. ✅

## Milestone 4 — Search (`50129b7`)

Added `hooks/useDebouncedValue.js` (400ms debounce) and
`components/SearchBar.jsx`. `App.jsx` derives `debouncedSearch` from the
raw input; when non-empty, `useArticles` switches from
`fetchTopHeadlines` to `fetchEverything`. Clearing the box (or selecting
a category, which also clears search) reverts to category mode.

- Smoke test: typing a query returns matching results after the debounce
  delay; clearing search reverts to the active category feed. ✅

## Milestone 5 — Detail modal (`dc1691e`)

Added `components/ArticleDetail.jsx`, an overlay/dialog
(`role="dialog"`, `aria-modal`) showing the image, title, source/author,
description, and — explicitly labeled **"Excerpt"** — NewsAPI's
truncated `content` field, plus a "Read full article ↗" link
(`target="_blank" rel="noopener noreferrer"`) to the source. Clicking a
card sets `selectedArticle`; clicking the backdrop or the close button
clears it.

- Smoke test: clicking a card opens the modal with image, the "Excerpt"
  label, and a working external link. ✅

## Milestone 6 — Polish (`e58bf2c`)

- **Loading**: replaced the plain "Loading…" text with a shimmering
  `FeedSkeleton` (6 placeholder cards) plus a visually-hidden
  `role="status"` announcement for screen readers.
- **Error**: wrapped in `role="alert"`, split into a generic "Couldn't
  load news." headline and the underlying `NewsApiError` message as
  detail text (e.g. missing/invalid API key).
- **Empty**: distinguishes "No results for `<query>`" (search mode) from
  "No articles found in this category right now." (category mode).
- **Responsive**: header/search/tabs reflow into a grid at 640px; the
  feed grid grows from 1 → 2 → 3 columns at 640px/960px.
- **Tests**: added a vitest + Testing Library harness (`setupTests.js`,
  `vite.config.js` test block with a fake `VITE_NEWS_API_KEY`) and
  `App.test.jsx`, covering loading, success, error, empty, search-mode
  switching, and the detail modal — all with a mocked `global.fetch`.

### Bug found and fixed during this milestone

The first test run showed 3 of 6 tests failing with "Found multiple
elements with the text: Example News" — DOM from a prior test was still
mounted when the next test rendered. `@testing-library/react`'s implicit
auto-cleanup only registers itself when it detects a global `afterEach`
(i.e. `test.globals: true` in the Vite config), which this project
doesn't set. Fixed by explicitly calling `cleanup()` in an `afterEach`
inside `src/setupTests.js`. All 6 tests pass after the fix.

## Verification performed

- `npm run lint` — clean (oxlint, react + oxc rulesets).
- `npm run test` — 6/6 passing (`vitest run`, jsdom, mocked `fetch`).
- `npm run build` — production build succeeds (`vite build`).
- `npm run dev` — dev server boots and serves the app; without a real
  `VITE_NEWS_API_KEY` configured in this sandbox, it correctly falls
  into the error state ("Missing NewsAPI key…"), which is itself a live
  exercise of the error-state UI built in Milestone 6.

Note: live-API verification (real headlines/thumbnails rendering from
NewsAPI.org) was exercised via the mocked-fetch test suite rather than
an actual API key, since none is available in this environment. Anyone
running this locally with a real key from newsapi.org should see the
same behavior against live data — see `README.md` for setup.

## Deviations from the plan

None. All milestones were implemented as scoped, including the v1
decision (Revision 1) to skip a serverless proxy and stay local/dev-only.
