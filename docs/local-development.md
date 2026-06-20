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

## App

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Logs

Local dev logs should use a single ignored file when the app is started by automation:

```bash
npm run dev > .dev.log 2>&1
```

`.gitignore` ignores local logs and browser/factory artifacts.
