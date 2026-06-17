# Development Guide

Simple local workflow for UMKM Cepat.

## Setup

```bash
npm install
cp .env.example .env.local
npm run prepare
```

Fill `.env.local` with local values. Do not commit it.

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Useful scripts

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run test       # Vitest
npm run build      # Production build
npm run verify     # All checks
```

## Git hooks

Husky runs:

- `pre-commit`: lint-staged checks staged files
- `commit-msg`: Conventional Commit validation

If hooks are missing:

```bash
npm run prepare
```

## Branch flow

```bash
git checkout dev
git pull origin dev
git checkout -b feat/short-name
```

After work:

```bash
npm run verify
git add .
git commit -m "feat: describe the change"
git push origin feat/short-name
```

Open a PR into `dev`.

## Project structure

```text
src/app          Next.js routes and API routes
src/components   Shared UI and feature components
src/lib          Shared utilities, services, schemas
prisma           Database schema
docs             Project documentation
.agents          Agent skills/instructions
```

## Testing approach

- Unit test pure logic first.
- Mock external services.
- Avoid default tests that require paid APIs or production credentials.
- Live AI, payment, domain, upload, and production deploy flows need maintainer-approved credentials or sandbox accounts.

## Security checklist

Before pushing public work:

```bash
git status --short
git grep -n -I -E "sk-|BEGIN .*PRIVATE|DATABASE_URL=|AUTH_SECRET=|API_KEY=|TOKEN=" -- . ':(exclude)package-lock.json'
```

Do not print or paste secret values in PRs, issues, commits, docs, or chat logs.

## Dependency hygiene

- Prefer existing dependencies.
- Remove unused packages.
- Keep security updates focused.
- Avoid major upgrades mixed with feature work.
- Run `npm audit` when touching dependencies.
