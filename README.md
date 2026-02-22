# ReleaseCheck

Your all-in-one release checklist tool. Helps teams track their release process through a 7-step workflow with validation, dark mode, and a clean UI. Built with Next.js, tRPC, and PostgreSQL.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4
- **API:** tRPC v11 (HTTP batch link), TanStack React Query
- **Database:** PostgreSQL (Neon) + Drizzle ORM
- **Validation:** Zod v4 (server), client-side form validation with inline errors
- **Theming:** next-themes (light/dark mode)
- **UI:** Custom component library (Input, Button, Modal, Checkbox, Toast, etc.)

## Features

- **Create releases** with name, date, and optional notes
- **7-step checklist** per release (PRs merged, changelog updated, tests passing, GitHub release created, deployed to demo, tested in demo, deployed to production)
- **Duplicate prevention** — server rejects releases with an existing version name
- **Form validation** — inline error messages for missing release name or date
- **Centered toast notifications** for success/error feedback
- **View/edit release details** with step-by-step progress tracking
- **Delete releases** with confirmation modal
- **Dark mode** toggle

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

| Procedure            | Type     | Input                                                     | Description                                  |
|----------------------|----------|-----------------------------------------------------------|----------------------------------------------|
| `releases.list`      | query    | —                                                         | List all releases (ordered by date desc)     |
| `releases.byId`      | query    | `{ id: number }`                                          | Get single release by ID                     |
| `releases.create`    | mutation | `{ name, date, additionalInfo? }`                         | Create release (rejects duplicate names)     |
| `releases.update`    | mutation | `{ id, name?, date?, additionalInfo?, completedSteps? }`  | Update release fields                        |
| `releases.delete`    | mutation | `{ id: number }`                                          | Delete a release                             |

## Deploy

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `DATABASE_URL` environment variable (your Neon connection string)
4. Deploy
