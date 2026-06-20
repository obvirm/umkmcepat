# Docker deployment

UMKM Cepat ships with Docker support for repeatable local/VPS setup.

## Local database only

Use this when running the Next.js app directly with `npm run dev`:

```bash
docker compose up -d postgres
npx prisma migrate deploy
npm run dev
```

Local database URL:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/umkmcepat?schema=public"
```

## App + database containers

Use this for a simple VPS-style container run:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

The app container runs:

```bash
npx prisma migrate deploy && next start
```

So database migrations are applied before the server starts.

## Required `.env`

Minimum production-like values:

```env
NEXT_PUBLIC_APP_URL="https://umkmcepat.com"
NEXTAUTH_URL="https://umkmcepat.com"
NEXTAUTH_SECRET="replace-with-strong-secret"
GOOGLE_CLIENT_ID="replace"
GOOGLE_CLIENT_SECRET="replace"
AI_PROVIDER="openrouter"
AI_MODEL="google/gemini-2.0-flash-001"
OPENROUTER_API_KEY="replace"
OPENROUTER_BASE_URL="https://openrouter.ai/api/v1"
OPENROUTER_SITE_URL="https://umkmcepat.com"
OPENROUTER_APP_NAME="UMKM Cepat"
STORAGE_PROVIDER="local"
UPLOAD_DIR="public/uploads"
PUBLIC_UPLOAD_BASE_URL="/uploads"
RATE_LIMIT_PROVIDER="memory"
QUEUE_PROVIDER="none"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="replace-with-strong-db-password"
POSTGRES_DB="umkmcepat"
```

For VPS, change `POSTGRES_PASSWORD` and do not expose port `5432` publicly unless you intentionally need remote DB access.

## Notes

- `Dockerfile` uses `npm ci --ignore-scripts` so Prisma migrations do not run during image build.
- Prisma client is generated during image build.
- Migrations run at container startup.
- Local uploads are persisted in the `uploads` Docker volume.
- For serious production, prefer S3/R2 object storage over local uploads.
