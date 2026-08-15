# NewsReader

A single-page news reader built with React + Vite. Fetches live headlines from
[NewsAPI.org](https://newsapi.org), with category filters, keyword search, and
an article detail view.

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Get a free API key from [newsapi.org](https://newsapi.org/register).

3. Copy `.env.example` to `.env` and add your key:

   ```sh
   cp .env.example .env
   ```

4. Run the dev server:

   ```sh
   npm run dev
   ```

## Notes

- NewsAPI's free tier blocks browser requests from non-`localhost` origins,
  so this app is scoped to local/dev use for v1. See `PLAN.md` for details.
- See `EXPLAINER.md` for a plain-language overview of the app, and
  `PROGRESS.md` for a log of how it was built.
