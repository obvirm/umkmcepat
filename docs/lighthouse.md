# Lighthouse quality guardrail

Lighthouse is a local, on-demand audit for release confidence. It is intentionally not part of CI, CD, or pre-commit because it starts a production server, opens Chrome, and can be slow or noisy on shared machines.

## Operating mindset

Treat Lighthouse as a local release guardrail for future agents with zero chat context. The goal is not a vanity 100; the goal is to catch real user-impacting regressions before production while keeping the normal dev loop fast.

## When to run

Run Lighthouse when a page feels slow, after meaningful UI/SEO/accessibility changes, and before a production release candidate.

```bash
bun run lighthouse
```

Target one device while iterating:

```bash
bun run lighthouse:mobile
bun run lighthouse:desktop
```

Reports are written to `.lighthouseci/` and ignored by Git.

## Current scope

The local audit covers public pages:

- `/`
- `/terms`
- `/privacy`

Authenticated pages such as `/profile`, `/projects/new`, and project workspaces redirect without a valid session. Audit those later with a dedicated Puppeteer login script or a local auth fixture; do not weaken auth just for Lighthouse.

## Thresholds

Mobile:

| Category       | Minimum |
| -------------- | ------: |
| Performance    |      90 |
| Accessibility  |     100 |
| Best practices |     100 |
| SEO            |      95 |

Desktop:

| Category       | Minimum |
| -------------- | ------: |
| Performance    |      95 |
| Accessibility  |     100 |
| Best practices |     100 |
| SEO            |      95 |

## Why not 100 everywhere

Performance scores vary with CPU, Chrome version, fonts, network emulation, and machine load. A 100-only performance gate creates false failures and encourages benchmark theater. Accessibility and best-practice failures are more deterministic, so they stay strict at 100.

Raise mobile performance to 95 only after it is stable across repeated local runs.

## How it runs

`@lhci/cli` builds the app, starts `next start` on port 3005, runs three audits per URL, keeps the representative run, asserts category scores, and saves HTML/JSON reports locally. Port 3005 avoids clashing with `bun run dev` on port 3000.

## Agent workflow

1. Ensure the working tree has no unrelated changes or explicitly stash them.
2. Run `bun run check` first so Lighthouse is not hiding basic code failures.
3. Run `bun run lighthouse` for the full public-page audit.
4. Read the generated HTML/JSON under `.lighthouseci/`.
5. Fix deterministic issues first: accessibility, best practices, SEO metadata, console errors.
6. Fix performance issues that improve real UX: LCP, TBT, CLS, images, fonts, bundle weight, cache hints.
7. Re-run the failing target (`bun run lighthouse:mobile` or `bun run lighthouse:desktop`) until thresholds pass.
8. Finish with `bun run check` and a clean `git status`.

Do not weaken thresholds to make a bad run pass. Only adjust thresholds after repeated evidence that Lighthouse variance, not product quality, is the blocker.

## Interpreting failures

- Performance below threshold: inspect LCP, TBT, CLS, script size, fonts, images.
- Accessibility below 100: fix the failed audit, do not lower the threshold.
- Best practices below 100: fix headers, browser console errors, or unsafe patterns.
- SEO below 95: fix title, meta description, crawlability, canonical/indexing basics.

Keep Lighthouse as a release guardrail, not a daily edit loop.
