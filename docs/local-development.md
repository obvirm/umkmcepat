# Local Development

Run local infrastructure with Docker Compose. On this Windows workspace, Docker is expected to run from WSL.

## Postgres

From the repo root in WSL:

```bash
cd /mnt/d/Code/Side/umkmcepat
docker compose up -d postgres
```

Default local database URL:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/umkmcepat?schema=public"
```

Apply Prisma migrations:

```bash
npx prisma migrate deploy
```

If the local Docker volume already had tables before migrations existed, baseline once:

```bash
npx prisma migrate resolve --applied 20260620131000_init
npx prisma migrate deploy
```

## Optional Redis

Redis is reserved for future queue/rate-limit work.

```bash
docker compose --profile redis up -d redis
```

## App without Docker

```bash
npm install
cp .env.example .env
npm run dev
```

If `.next` gets stale or the app shows 500 errors for missing manifest files:

```bash
npm run dev:clean
```

Open `http://localhost:3000`.

## App with Docker hot reload

From WSL repo path:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up app
```

The dev Docker setup uses bind mounts for source files and container-only volumes for `/app/node_modules` and `/app/.next`. Polling is enabled for Windows-drive compatibility.

## Logs

Local dev logs should use a single ignored file when the app is started by automation:

```bash
npm run dev > .dev.log 2>&1
```

`.gitignore` ignores local logs and browser/factory artifacts.
