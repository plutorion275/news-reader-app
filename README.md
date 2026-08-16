# NewsReader

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

A single-page news reader built with React + Vite. Fetches live headlines from
[NewsAPI.org](https://newsapi.org), with category filters, keyword search, and
an article detail view.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Notes](#notes)
- [Tech Stack](#tech-stack)

## Features

- Live headlines from NewsAPI.org (`/v2/top-headlines`, `/v2/everything`)
- 7 category tabs: Top, Tech, Sports, Business, Health, Entertainment, Science
- Debounced keyword search (switches to the `everything` endpoint automatically)
- Article detail modal with labeled excerpt and "Read full article" link
- Loading skeleton, error state, and empty-results state
- Responsive layout — 1 column on mobile, up to 3 on desktop

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

## Usage

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run test` | Run unit tests (Vitest + Testing Library) |
| `npm run lint` | Lint with oxlint |

## Notes

- NewsAPI's free tier blocks browser requests from non-`localhost` origins,
  so this app is scoped to local/dev use for v1. A serverless proxy would be
  needed to deploy publicly — see `PLAN.md` for details.
- See `EXPLAINER.md` for a plain-English overview of how the app is structured.
- See `PROGRESS.md` for a build log of all six milestones.

## Tech Stack

- **React 19** — UI
- **Vite 8** — build tool and dev server
- **Plain CSS** — no UI framework, keeps the bundle small
- **Vitest 4 + Testing Library** — unit tests with mocked `fetch`
- **oxlint** — linting
- **NewsAPI.org** — news data source
