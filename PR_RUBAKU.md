# Pull Request Documentation

**Contributor**: RUBAKU
**Branch**: `dev`

## Overview

This PR introduces several major architectural improvements, security enhancements, and UI/UX upgrades to the UMKM Cepat platform. The primary focus of these changes is to establish a strong technical foundation for SEO, optimize performance through lazy loading and caching, and protect the platform from policy violations.

## Key Features & Changes

### 1. Security: Profanity & Illegal Content Filter (Anti-Judol)

- **Feature**: Implemented a strict profanity and topic filter preventing users from requesting websites related to gambling (judol, slot, etc.) or pornography.
- **Mechanism**:
  - Intercepts form submissions at `HomePromptForm.tsx` via a new API endpoint (`/api/check-prompt/route.ts`).
  - Utilizes a keyword blacklist located in `src/lib/profanity-filter.ts`.
  - **IP Banning**: If a violation is detected, the user's IP is extracted from the `x-forwarded-for` header and banned for 24 hours using Redis.
  - **Enforcement**: `src/app/layout.tsx` checks the incoming IP against Redis on every request. Banned IPs are shown a hardcoded "Akses Ditolak" screen, completely blocking access to the platform.

### 2. Performance: Redis Caching

- **Setup**: Configured `ioredis` client in `src/lib/redis.ts` pointing to the local Redis container (`docker-compose.yml` updated to ensure it runs correctly).
- **Usage**: Currently powers the IP banning system and lays the groundwork for caching AI prompts to reduce API costs. Error handling is included to prevent application crashes if the Redis server goes down.

### 3. SEO Optimization

- **Sitemap & Robots.txt**: Added Next.js dynamic routing files (`src/app/sitemap.ts` and `src/app/robots.ts`) to ensure search engines can properly crawl the application.
- **Open Graph (OG) Tags**: Injected Open Graph and Twitter card metadata into the RootLayout (`src/app/layout.tsx`), configured to use the existing `logo.svg`.
- **JSON-LD Schema Markup**: Added structured data (`LocalBusiness` / `WebSite`) inside the `<head>` of the application for Rich Snippets on Google Search.

### 4. UI/UX Enhancements

- **Live AI Typing Effect**: Replaced the static loading spinner in `HomePromptForm.tsx` with a dynamic, cycling typing animation that incorporates the user's specific prompt (e.g., `Menganalisis ide "[prompt user]"..._`).
- **Aurora Background**: Replicated the vibrant, animated CSS blob background from the reference design.
- **Component Lazy Loading**: Implemented `next/dynamic` for the `HomePromptForm` to significantly reduce initial bundle size and improve First Contentful Paint (FCP).

## Testing

- Banned IP screen successfully verified.
- SEO tags validated via Next.js Metadata compiler.
- Redis connection gracefully fails open when the container is down, avoiding catastrophic crashes.

Please review and merge into the main branch when ready.
