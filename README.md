# jnot.net

Portfolio site for Joel Nottle, web designer and developer. Built with [Astro](https://astro.build) and TypeScript, published as a static site on GitHub Pages.

## Run it

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # static site in dist/
npm run check        # type check
```

Node 22.23+ (the scripts in `scripts/` are TypeScript run directly by Node).

## Where things live

```
src/
  data/site.ts              all non-case-study copy: hero, contact, process, skills, about, code strip
  content/projects/<id>/    one folder per project
    index.md                case study fields (schema in src/content.config.ts)
    desktop.webp            screenshot, picked up automatically
    mobile.webp             screenshot, picked up automatically
  sections/                 the home page, one file per section
  components/               Logo, Frame (corner brackets), Device (screenshot frames), ProjectCard…
  pages/                    index, work/[slug] (case study template), 404
  styles/global.css         design tokens and shared styles
public/                     favicon, share image, CNAME, robots.txt, resume PDF
brand/                      original logo files (not published)
scripts/                    screenshot, viewport and launch-check tools
```

## Adding or changing a project

1. Edit `src/content/projects/<id>/index.md`. `featured: true` puts it in the grid and gives it a case study page; `order` sets its position.
2. Leave `name` out until the client (and, for agency work, the agency) has said yes. Until then the site shows the `anonymous` label. This repo is public, so a name in the file is published even if the site doesn't show it.
   `via` is `direct` for your own clients or `agency` for agency work. Never write the agency's name in this repo.
3. Add the live `url`, then capture screenshots:
   ```sh
   npm run shoot -- coffee-roaster
   ```
   This saves `desktop.webp` (1440×900 @2x) and `mobile.webp` (390×844 @2x) beside the project file. Check them: cookie banners and pop-ups get captured too. Astro resizes them to responsive WebP at build time.
4. Once the copy is checked, set `draft: false`.

## Before launch

```sh
npm run build
npm run launch-check            # lists every placeholder still on the site
npm run launch-check -- --links # also checks every external link
npm run viewports               # full-page captures at 375 / 768 / 1440 in .shots/
```

The deploy workflow runs the launch check and won't publish while anything is left. To publish anyway, run the workflow by hand with "skip launch check".

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/`.

**One-time setup:** in the GitHub repo, go to Settings → Pages → Build and deployment and set Source to **GitHub Actions**. Do this before merging: with the old "Deploy from a branch" setting, `main` no longer has an `index.html` at its root, so the live site would break.
