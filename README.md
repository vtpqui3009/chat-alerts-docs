# Public docs for Chat Alerts for Jira

Served by GitHub Pages. Source of truth: `docs/marketplace/` in the private app repo; copy changes here.

## Layout

- `_layouts/default.html`: header, footer; `_layouts/doc.html`: doc pages with an "On this page" list built by `assets/js/toc.js`.
- `assets/css/site.css`: all styles, light and dark mode, no external fonts or trackers.
- `index.html`: home page. Doc pages stay in Markdown (`setup.md`, `huong-dan.md`, `privacy.md`).

## Test

Needs Ruby (Bundler) and Node 22.

```sh
bundle install
npm ci
npx playwright install chromium   # once
npm run check                     # build with the GitHub Pages gems, then run Playwright
```

`tests/site.spec.ts` checks every page on desktop (light and dark) and on a phone: pages load without errors, internal links and anchors work, no horizontal scroll, the table of contents, the colour scheme, and that nothing loads from other sites. GitHub Actions runs the same checks on every push and pull request (`.github/workflows/test.yml`).
