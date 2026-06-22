# Contributing

<details>
<summary>I use an AI coding assistant</summary>

Copy this into your AI coding assistant (Codex, Claude, Cursor, etc.):

<pre><code>You are helping a developer set up UMKM Cepat, an open-source AI builder for Indonesian small businesses. Your job is to handle the entire onboarding so they can start contributing with minimal effort.

## Project overview

- Next.js 15, React 19, Tailwind v4, shadcn/ui
- Prisma + PostgreSQL (Docker)
- Bun only (package manager)
- AI gateway: 9Router (Docker, optional)
- OAuth: NextAuth Google (optional)
- Sentry (optional)

## Your workflow

### 1. Ask what they want to work on

Start by asking: "What are you working on today?"

- General / docs / UI / tests → basic setup only (fastest)
- AI generation → basic + 9Router
- Login / auth → basic + Google OAuth
- Monitoring → basic + Sentry
- Everything → all of the above

Then ask: "What operating system are you on?"

- Windows / WSL
- macOS
- Linux

### 2. Check prerequisites

Verify these are installed on their system. Guide them to install any that are missing.

- Git (any recent version)
- Bun (version pinned in package.json)
- Docker with Compose

For Windows: recommend WSL. Check Docker Desktop has WSL integration enabled.
For macOS: recommend Docker Desktop. Colima is a lighter alternative.
For Linux: check if Docker needs sudo. If yes, instruct accordingly.

Do not proceed until all three are confirmed working.

### 3. Clone and install

Run these in order, checking each step before proceeding:

  git clone https://github.com/suryaelidanto/umkmcepat.git
  cd umkmcepat
  bun install
  cp .env.example .env

If bun install fails, check for network issues or a Bun version mismatch. The expected version is in package.json.

### 4. Start the database

Check Docker is running first:

  docker version
  docker compose version

If Docker is not running, guide the user to start Docker Desktop or Docker Engine before continuing.

Then:

  docker compose up -d postgres

Wait a few seconds for the container to become healthy. Then:

  bun run db:migrate

If the migration fails, check if PostgreSQL is running and port 5432 is available.

### 5. Start the app

  bun run dev

Verify the app responds:

  curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

If it returns 200 or a redirect, the app is running. Otherwise check for port conflicts or build errors.

Tell the user to open http://localhost:3000 in their browser.

### 6. Add optional services

Only if the user asked for AI generation:

  docker compose --profile ai up -d 9router

Confirm the container started:

  docker compose ps 9router

Then:
  - Open http://localhost:20129
  - Default password is 123456
  - Refer to docs/9router.md for provider setup

Only if the user asked for login flows:
  - Local callback URL: http://localhost:3000/api/auth/callback/google
  - Refer to CONTRIBUTING.md for Google OAuth instructions

Only if the user asked for monitoring:
  - Refer to docs/observability.md

### 7. Quality gate

Before the user opens a PR, tell them to run:

  bun run check

This is enforced by pre-commit hooks and CI, so it must pass.

Remind them:
- Use Conventional Commits (like "feat: add X", "fix: handle Y", "docs: clarify Z")
- Open PRs into the dev branch
- Keep changes focused and small

### 8. Common issues

If the user reports:
- "Docker command not found" → Docker is not installed or not in PATH
- "Port already in use" → stop whatever is on port 3000 or 5432
- "Bun version mismatch" → install the version from package.json
- ".next is stale" → stop dev server, delete .next folder, restart
- "Prisma migration error" → check PostgreSQL container is running: docker compose ps

Now begin by asking what they want to work on and their operating system.</code></pre>

</details>

<details>
<summary>I prefer to set things up manually</summary>

## Already have Git, Bun, and Docker?

Run this:

```bash
git clone https://github.com/suryaelidanto/umkmcepat.git
cd umkmcepat
bun install
cp .env.example .env
docker compose up -d postgres
bun run db:migrate
bun run dev
```

Open:

```text
http://localhost:3000
```

This gives you a working local app. Only use the sections below when your change needs them.

## Need the tools?

<details>
<summary>Windows</summary>

WSL is the smoothest path.

Install:

- WSL Ubuntu: https://learn.microsoft.com/windows/wsl/install
- Bun inside Ubuntu: https://bun.com/docs/installation
- Docker Desktop: https://docs.docker.com/desktop/setup/install/windows-install/
- Git inside Ubuntu: https://git-scm.com/download/linux

Then run the setup commands inside Ubuntu.

If you prefer native Windows, use Git Bash with Bun for Windows and Docker Desktop.

</details>

<details>
<summary>macOS</summary>

Install:

- Bun: https://bun.com/docs/installation
- Git: https://git-scm.com/download/mac
- Docker Desktop: https://docs.docker.com/desktop/setup/install/mac-install/

Colima also works if you prefer it: https://github.com/abiosoft/colima

</details>

<details>
<summary>Linux</summary>

Install:

- Bun: https://bun.com/docs/installation
- Git: https://git-scm.com/download/linux
- Docker Engine: https://docs.docker.com/engine/install/

If Docker needs sudo on your machine, use `sudo docker ...` consistently or configure Docker group/rootless access using Docker's docs.

</details>

Quick check:

```bash
git --version
bun --version
docker version
docker compose version
```

## Working on AI generation?

Start 9Router too:

```bash
docker compose --profile ai up -d 9router
```

Open:

```text
http://localhost:20129
```

Default password:

```text
123456
```

Then follow [docs/9router.md](docs/9router.md).

## Working on login, Sentry, or UI components?

- Google login callback: `http://localhost:3000/api/auth/callback/google`
- Sentry setup: [docs/observability.md](docs/observability.md)
- UI components live in `src/components/ui`

Add shadcn/ui primitives with:

```bash
bunx shadcn@latest add button card input
```

Preview existing primitive changes with:

```bash
bunx shadcn@latest add button --dry-run
bunx shadcn@latest add button --diff
```

## Before opening a PR

Run:

```bash
bun run check
```

Use Conventional Commits:

```text
feat: add project workspace shell
fix: handle missing auth session
docs: clarify setup
chore: update dependencies
```

Open PRs into `dev` first unless maintainers say otherwise.

## Troubleshooting

### Docker is not running

Start Docker, then retry:

```bash
docker version
docker compose version
```

### Bun version mismatch

The Bun version is pinned in `package.json`.

```bash
bun --version
```

### Stale Next.js output

Stop the dev server, remove `.next`, then restart:

```bash
rm -rf .next
bun run dev
```

</details>
