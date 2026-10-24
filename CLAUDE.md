# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NPM workspaces monorepo for **Red Lock / Red Box** — a personal blog/gaming site. Strapi 5 CMS backend + Create React App frontend.

- **Backend** (`apps/backend`): Strapi 5.58.0 (TypeScript), serves content API on port 1337
- **Frontend** (`apps/frontend`): React 18 with CRA (JavaScript), consumes the Strapi API

## Node Version Requirement

Strapi requires **Node <=22.x.x**. Use `nvm use 22` before running anything. Node 24+ will fail.

## Commands

```bash
# Install all dependencies (from root)
npm install

# Development
npm run dev:backend       # Strapi dev server (SQLite, port 1337)
npm run dev:frontend      # React dev server (port 3000)

# Production
npm run start --workspace=apps/backend    # Strapi with PostgreSQL
npm run build --workspace=apps/backend    # Build Strapi admin panel
npm run build --workspace=apps/frontend   # Production React build

# Tests (frontend only)
npm test --workspace=apps/frontend        # Jest with React Testing Library
```

## Architecture

### Backend Content Types

**Collections:** `post` (blog articles with category enum: Review/Opinião/Artigo), `game`, `category`
**Single types:** `about-me`, `quote`, `activity` (currently playing/watching/reading), `featured-image`

All content types use Strapi's factory-generated controllers/routes/services in `apps/backend/src/api/`. Shared components (SEO, OpenGraph) live in `apps/backend/src/components/shared/`.

### Frontend Structure

- **Routing** (`src/App.js`): `/`, `/blog`, `/blog/:slug`, `/sobre-mim`, `/games`, `/games/:slug`, `/extras`, `/guestbook`
- **API layer** (`src/services/api.js`): Axios instance with bearer token auth, base URL from `REACT_APP_API_URL`
- **Services**: `blogService.js` and `gameService.js` wrap API calls and support mock data fallback via `REACT_APP_USE_MOCK_DATA`
- **Mock data** (`src/utils/mockData.js`): Full mock dataset for offline development without Strapi running
- **Styles**: Separate CSS files per component/page in `src/styles/`, no CSS-in-JS

### Upgrading Strapi

All core `@strapi/*` packages must be on the **same version** — a mix (e.g. 5.58 + 5.59) breaks error handling (ForbiddenError becomes a 500). Versions are pinned with `overrides` in both `package.json` (root, used by the workspace/CI) and `apps/backend/package.json` (used by the standalone `apps/backend/package-lock.json` that the VPS installs with `npm ci`). To upgrade:

1. Change the version in `@strapi/strapi`, `@strapi/plugin-users-permissions` and every `overrides` entry, in both files.
2. `npm install --package-lock-only --ignore-scripts` at the root.
3. Regenerate the backend lock in an isolated folder (copy `apps/backend/package.json` to an empty dir, run the same command, copy `package-lock.json` back).
4. Check both locks have a single version of each `@strapi/*` package.

The deploy runs a database backup before switching code, since Strapi migrates the schema on startup.

### Database Strategy

- **Development**: SQLite (`.tmp/data.db`) — zero config, auto-created
- **Production**: PostgreSQL — configured via `DATABASE_*` env vars with SSL

### Environment Variables

Backend env files: `.env.development` (SQLite) and `.env.production` (PostgreSQL). Required keys: `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`.

Frontend `.env`: `REACT_APP_API_URL`, `REACT_APP_BASE_URL`, `REACT_APP_USE_MOCK_DATA`, optional `REACT_APP_UMAMI_URL` / `REACT_APP_UMAMI_WEBSITE_ID` (analytics; self-hosted Umami on the VPS in `/root/umami`, set in `deploy.yml`). The content API is read without a token: public read permissions are ensured by the backend `bootstrap` in `apps/backend/src/index.ts` (`PUBLIC_ACTIONS`). When adding a content type the frontend reads, add its actions there.

### Windows Compatibility

Backend scripts use `cross-env` for setting environment variables. Always use `cross-env` when adding new scripts that set env vars.
