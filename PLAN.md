\# News Reader App



\## Summary



A single-page personalized news reader that fetches live articles from a public news API, presents them in a scrolling feed with thumbnails, lets users filter by category, search by keyword, and drill into a detail view with a summary and link to the full article.



\## Goals



\- Live headlines pulled from a public API (NewsAPI.org as primary target).

\- Clean, scrollable feed with thumbnail, headline, source, and timestamp.

\- Category filter: Top, Tech, Sports, Business, Health, Entertainment, Science.

\- Search bar that queries the API's `everything` endpoint by keyword.

\- Tapping/clicking a headline opens a detail view with NewsAPI's content snippet (labeled as such, not a full article summary), source link, and image.

\- Responsive layout (mobile-first, works on desktop).



\## Non-Goals



\- No user accounts, auth, or personalization based on reading history (v1).

\- No offline caching / PWA support (v1).

\- No comments or social sharing features.



\## Tech Stack



\- Frontend: React + Vite, plain CSS (no heavy UI framework, keep bundle small).

\- Data: NewsAPI.org REST API (`/v2/top-headlines`, `/v2/everything`).

\- State: React hooks (useState/useEffect), no external state library needed for this scope.

\- Deployment target: static build, deployable to any static host (Vercel/Netlify/GitHub Pages).



\## Architecture



\- `App.jsx` — top-level layout: header (search bar, category tabs) + feed.

\- `components/CategoryTabs.jsx` — category selector, controls active filter.

\- `components/SearchBar.jsx` — debounced text input, triggers `/everything` query.

\- `components/ArticleFeed.jsx` — scrollable list of `ArticleCard`.

\- `components/ArticleCard.jsx` — thumbnail, headline, source, relative timestamp; onClick opens detail.

\- `components/ArticleDetail.jsx` — modal or route showing NewsAPI's truncated content snippet (clearly labeled "Excerpt," not a generated summary), image, "Read full article" link (opens source in new tab).

\- `api/newsApi.js` — thin wrapper around fetch calls, handles API key, query params, error normalization.

\- `hooks/useArticles.js` — encapsulates fetch + loading/error state for feed and search.



\## Data Flow



1\. On load, `useArticles` calls `top-headlines?category=general\&country=us`.

2\. Selecting a category re-triggers fetch with that category param.

3\. Typing in search (debounced \~400ms) switches to `everything?q=<term>` mode; clearing search reverts to category mode.

4\. Clicking a card sets `selectedArticle` state, rendering `ArticleDetail` as an overlay.



\## API Key Handling



\- NewsAPI requires a key. Store as `VITE\_NEWS\_API\_KEY` in a `.env` file (gitignored). Plan will include a `.env.example` with a placeholder.

\- Scope decision: v1 is local/dev use only. NewsAPI's free tier blocks browser requests from production domains, so no serverless proxy is being built for this version — see Revision 1.



\## Milestones



1\. Scaffold Vite + React project, basic layout shell.

&#x20;  - Done when: `npm run dev` serves a blank layout shell with header and empty feed area, no console errors.

2\. Implement `newsApi.js` + `useArticles` hook, wire up top-headlines feed with thumbnails.

&#x20;  - Done when: feed renders real headlines + thumbnails from a live local dev run using a valid API key; missing-thumbnail case shows placeholder.

3\. Add category tabs and re-fetch on category change.

&#x20;  - Done when: clicking each of the 7 category tabs re-fetches and visibly changes the feed contents.

4\. Add search bar with debounce, switch between category/search modes.

&#x20;  - Done when: typing a query returns matching results after debounce delay, and clearing the search reverts to the active category feed.

5\. Add article detail view (modal) with excerpt + external link.

&#x20;  - Done when: clicking a card opens the modal with image, labeled "Excerpt," and a working "Read full article" link that opens the source in a new tab.

6\. Polish: loading states, empty states, error states (API failure, no results), responsive styling.

&#x20;  - Done when: manually simulating a failed fetch (e.g. bad API key) and a no-results search both show correct UI, and layout holds up at mobile and desktop widths.



\## Risks / Open Questions



\- Some articles lack thumbnail images; feed should show a placeholder graphic in that case.

\- Rate limits on free tier (100 requests/day) — fine for a personal/demo app, worth noting if usage grows.

\- If a future version needs to run publicly rather than locally, a serverless proxy will be needed to work around NewsAPI's free-tier restriction on browser requests from production domains — out of scope for v1 (see Revision 1).



\## Feedback



\- Assume local/dev use only for v1 — no serverless proxy needed, note this as the default instead of an open question.

\- Add a brief smoke-test checklist item to each milestone (what "done" looks like, not just "implemented").

\- Clarify in the detail view that the "summary" is NewsAPI's truncated content snippet, not a full article summary — so it's not overpromising.



\## Revision 1



\- Resolved the proxy open question: v1 is scoped to local/dev use only, so no serverless proxy is planned. Moved to Risks as a future consideration instead of a blocking question.

\- Added a "Done when" smoke-test line to each milestone.

\- Reworded Goals, Architecture, and Milestones to call the detail view content an "excerpt"/"content snippet" rather than a "summary," to avoid overpromising.
