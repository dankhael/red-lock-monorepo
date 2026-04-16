# Red Lock / Red Box

Personal blog and gaming site built as an NPM workspaces monorepo with a **Strapi 5** CMS backend and a **React 18** frontend.

Live at: [dankredbox.com](https://dankredbox.com)

## Tech Stack

| Layer    | Technology                          | Location          |
|----------|-------------------------------------|-------------------|
| Frontend | React 18, Create React App, JS     | `apps/frontend`   |
| Backend  | Strapi 5.11.2, TypeScript           | `apps/backend`    |
| Dev DB   | SQLite (auto-created, zero config)  | `.tmp/data.db`    |
| Prod DB  | PostgreSQL with SSL                 | Configured via env|
| CI/CD    | GitHub Actions                      | `.github/workflows/` |

## Prerequisites

- **Node.js <= 22.x.x** (Strapi does not support Node 24+)
  ```bash
  nvm install 22
  nvm use 22
  ```
- **npm** (comes with Node; the monorepo uses npm workspaces)

## Quick Start

```bash
# 1. Install all dependencies (from repo root)
npm install

# 2. Start the backend (Strapi dev server on port 1337)
npm run dev:backend

# 3. In another terminal, start the frontend (React on port 3000)
npm run dev:frontend
```

The frontend talks to the backend API at the URL defined in `apps/frontend/.env` (`REACT_APP_API_URL`).

## Running the Frontend Without the Backend (Mock Data)

The frontend has a built-in **mock data mode** that provides a full offline dataset so you can work on the UI without running Strapi at all.

1. Open `apps/frontend/.env`
2. Set:
   ```
   REACT_APP_USE_MOCK_DATA='true'
   ```
3. Start the frontend:
   ```bash
   npm run dev:frontend
   ```

Every service (`blogService`, `gameService`, `guestbookService`) checks this flag and returns data from `src/utils/mockData.js` instead of calling the API. The mock dataset includes sample blog posts, games, guestbook entries, quotes, and activities.

## Running Tests

Tests live in the frontend only (Jest + React Testing Library).

```bash
# Run tests in watch mode
npm test --workspace=apps/frontend

# Run tests once (CI mode)
npm test --workspace=apps/frontend -- --watchAll=false
```

Tests automatically use mock data mode. Key test files:

| File | What it tests |
|------|---------------|
| `src/App.test.js` | App renders without crashing |
| `src/services/blogService.test.js` | Blog service with mock data |
| `src/services/guestbookService.test.js` | Guestbook service |
| `src/components/common/*.test.jsx` | Header, Footer, ErrorBoundary |
| `src/utils/formatDate.test.js` | Date formatting utility |

## Project Structure

```
red-lock-monorepo/
├── apps/
│   ├── backend/                  # Strapi 5 CMS
│   │   ├── src/
│   │   │   ├── api/              # Content type APIs (auto-generated + custom)
│   │   │   │   ├── post/         # Blog posts
│   │   │   │   ├── game/         # Game entries
│   │   │   │   ├── category/     # Post categories
│   │   │   │   ├── guestbook-entry/
│   │   │   │   ├── about-me/     # Single type
│   │   │   │   ├── quote/        # Single type
│   │   │   │   ├── activity/     # Single type (playing/watching/reading)
│   │   │   │   ├── featured-image/ # Single type
│   │   │   │   ├── rss/          # Custom RSS feed endpoint
│   │   │   │   └── lastfm/       # Last.fm integration
│   │   │   └── components/       # Shared Strapi components (SEO, OpenGraph)
│   │   └── config/               # Database, server, middleware config
│   │
│   └── frontend/                 # React SPA
│       └── src/
│           ├── pages/            # Route-level components
│           ├── components/       # Reusable UI components
│           │   ├── blog/         # PostCard, PostList, FeaturedSection, RecentSection
│           │   ├── common/       # Header, Footer, Layout, Sidebar, ErrorBoundary
│           │   ├── games/        # GameCard
│           │   ├── guestbook/    # GuestbookForm, GuestbookEntry
│           │   └── extras/       # QuizGame
│           ├── services/         # API layer (api.js, blogService, gameService, guestbookService)
│           ├── utils/            # mockData, analytics, formatDate
│           ├── styles/           # CSS files (one per component/page)
│           └── hooks/            # Custom React hooks
│
├── .github/workflows/            # CI and deploy pipelines
├── package.json                  # Workspace root
└── CLAUDE.md                     # AI assistant instructions
```

## Pages and Routes

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | `Home` | Landing page |
| `/blog` | `Blog` | Blog listing with pagination, category filter, search |
| `/blog/:slug` | `BlogPost` | Individual post with Disqus comments |
| `/sobre-mim` | `About` | About me page |
| `/games` | `Games` | Games listing |
| `/games/:slug` | `GameDetail` | Individual game page |
| `/extras` | `Extras` | Extra content (quiz game) |
| `/guestbook` | `Guestbook` | Visitor messages with submission form |

## Backend Content Types

### Collections (multiple records)
- **Post** - Blog articles. Fields: title, slug, content (richtext), coverImage, excerpt, publishedOn, featured, category (`Review` / `Opiniao` / `Artigo`)
- **Game** - Game entries. Fields: title, description (richtext), gameLink, coverImage, publishedOn
- **Category** - Post categories
- **Guestbook Entry** - Visitor messages. Fields: authorName, message, website, approved (boolean)

### Single Types (one record)
- **About Me** - Profile description and image
- **Quote** - Displayed quote with author
- **Activity** - Currently playing/watching/reading
- **Featured Image** - Homepage featured image

### Custom Endpoints
- `GET /api/rss` - RSS feed (public, no auth)
- `GET /api/lastfm/recent-tracks` - Last.fm recently played tracks (public)

## Making Changes

### Adding a new page

1. Create a page component in `apps/frontend/src/pages/`
2. Create a CSS file in `apps/frontend/src/styles/`
3. Add a `<Route>` in `apps/frontend/src/App.js`
4. Add a link in the `Header` component

### Adding a new content type (backend)

Use the Strapi admin panel at `http://localhost:1337/admin` to create content types via the Content-Type Builder. Strapi auto-generates the API files under `src/api/`.

Alternatively, create the schema JSON manually in `apps/backend/src/api/<name>/content-types/<name>/schema.json` along with the controller, route, and service files.

### Adding a new service (frontend)

1. Create a service file in `apps/frontend/src/services/` following the pattern of `blogService.js`
2. Check `REACT_APP_USE_MOCK_DATA` to support mock data mode
3. Add mock data to `apps/frontend/src/utils/mockData.js`
4. The API client (`api.js`) is a pre-configured Axios instance with the bearer token

### Modifying styles

Each page/component has its own CSS file in `apps/frontend/src/styles/`. There is no CSS-in-JS — just import the CSS file in the component.

## Environment Variables

### Frontend (`apps/frontend/.env`)

| Variable | Purpose |
|----------|---------|
| `REACT_APP_API_URL` | Strapi API base URL (e.g. `http://localhost:1337/api`) |
| `REACT_APP_BASE_URL` | Strapi base URL for media (e.g. `http://localhost:1337`) |
| `REACT_APP_READER_TOKEN` | Strapi API read-only token |
| `REACT_APP_USE_MOCK_DATA` | `'true'` to skip API calls and use mock data |
| `REACT_APP_GA_MEASUREMENT_ID` | Google Analytics measurement ID |
| `REACT_APP_DISQUS_SHORTNAME` | Disqus shortname for blog comments |

### Backend (`apps/backend/.env.development`)

| Variable | Purpose |
|----------|---------|
| `HOST` | Server host (default `0.0.0.0`) |
| `PORT` | Server port (default `1337`) |
| `APP_KEYS` | Strapi security keys (comma-separated) |
| `API_TOKEN_SALT` | Salt for API tokens |
| `ADMIN_JWT_SECRET` | Secret for admin JWT |
| `TRANSFER_TOKEN_SALT` | Salt for transfer tokens |
| `JWT_SECRET` | General JWT secret |
| `LASTFM_API_KEY` | Last.fm API key |
| `LASTFM_USER` | Last.fm username |

See `apps/backend/.env.example` for a template.

## Production Build

```bash
# Build frontend
npm run build --workspace=apps/frontend

# Build backend (Strapi admin panel)
npm run build --workspace=apps/backend
```

## Deployment

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`) on push to `main`:

1. **Test** - Runs frontend tests, builds both frontend and backend
2. **Deploy Frontend** - SCP to VPS at `/var/www/red-box/`
3. **Deploy Backend** - SCP to VPS, installs production deps, restarts Strapi via pm2

Required GitHub secrets are configured in the repository settings for VPS access and production environment variables.

## Windows Compatibility

Backend scripts use `cross-env` for environment variable setting. When adding new npm scripts that set env vars, always use `cross-env` to ensure cross-platform support.
