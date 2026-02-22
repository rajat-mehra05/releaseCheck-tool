# ReleaseCheck

A release checklist tool that helps developers track their release process through a 7-step workflow. Built as a single-page application with Next.js, tRPC, and PostgreSQL.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4
- **API:** tRPC v11 (HTTP batch link)
- **Database:** PostgreSQL (Neon) + Drizzle ORM
- **Validation:** Zod v4
- **Theming:** next-themes (light/dark mode)

## Setup

```bash
# Clone and install
git clone <repo-url>
cd fullstack-project
pnpm install

# Database
cp .env.example .env.local
# Fill in your Neon DATABASE_URL in .env.local
pnpm db:push

# Run
pnpm dev
```

## Database Schema

```sql
CREATE TABLE releases (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  date            TEXT NOT NULL,
  additional_info TEXT,
  completed_steps JSONB NOT NULL DEFAULT '[]',
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);
```

## API Endpoints

All endpoints are served via tRPC at `/api/trpc`.

| Procedure            | Type     | Input                                                     | Description                   |
|----------------------|----------|-----------------------------------------------------------|-------------------------------|
| `releases.list`      | query    | —                                                         | List all releases (date desc) |
| `releases.byId`      | query    | `{ id: number }`                                          | Get single release            |
| `releases.create`    | mutation | `{ name, date, additionalInfo? }`                         | Create a new release          |
| `releases.update`    | mutation | `{ id, name?, date?, additionalInfo?, completedSteps? }`  | Update release fields         |
| `releases.delete`    | mutation | `{ id: number }`                                          | Delete a release              |

## Deploy

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `DATABASE_URL` environment variable (your Neon connection string)
4. Deploy

## Future Work (Phase 3)

- **Docker:** `Dockerfile` + `docker-compose.yaml` for local Postgres development
- **Automated Tests:** Unit tests for `computeStatus` utility, integration tests for tRPC procedures
- **Responsive polish:** Enhanced mobile experience
