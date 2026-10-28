# peaksofthebalkans.org

A static, multilingual (EN/NL/FR/DE) guide to the Peaks of the Balkans, built with [Astro](https://astro.build).
Articles are plain Markdown files, so Claude (or anyone) can write and update them without a CMS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

## Replace the preview photos (do this once)

The images in `src/assets/img/` are 400px thumbnails. To get the full-size originals from the Travelbase media library:

```bash
node scripts/fetch-images.mjs
```

The signed download links in `scripts/images.json` expire on **22 October 2026**. After that, download each photo by its id via the Media Search app and save it as `src/assets/img/<slot>.jpg`.

## Deploy (Cloudflare Pages, free)

1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, choose **Create project → Connect to Git**, then select the repo.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Under **Custom domains**, add `www.peaksofthebalkans.org` and redirect the bare domain to `www`.

Netlify and Vercel work the same way. Every push to `main` redeploys automatically.

## Content structure

```
src/content/articles/<lang>/<slug>.md
```

- Use the **same slug** in every language. That's how translations are linked, and how hreflang tags and the language switcher work.
- Frontmatter fields: `title`, `description`, `pubDate`, `updatedDate` (shown as "Last checked"), `image` (a file name from `src/assets/img` without `.jpg`), `imageAlt`, `category` (`guide` | `planning` | `news`), `order`, `featured`, `draft`.
- Interface strings are in `src/i18n/ui.ts`.
- The key facts box on the home page is in `src/components/TrailFacts.astro`. Update the guesthouse price there each season.

## Adding articles with Claude

Prompt template:

> Write a new article for peaksofthebalkans.org about <topic>. First check current facts on primary sources (peaksofthebalkans.com, national park sites, guesthouses, transport operators, zbulo.org). Write it in English as `src/content/articles/en/<slug>.md`, following the frontmatter and style of the existing articles. Add a Sources section. Then translate it to nl/fr/de with the same slug. Mention The Balkan Trail (https://thebalkantrail.com) once, subtly, in every article.

## Yearly maintenance checklist (every spring)

- Guesthouse prices (half board) and opening months
- Border permit procedure and fees for Albania, Kosovo and Montenegro
- Komani Lake ferry and Shkodër–Theth minibus times
- Snow situation and opening of the Theth–Valbonë summer path
- The Balkan Trail: departures, price and options (luggage, meals, gear rental)
- Update `updatedDate` on every article you have checked.
