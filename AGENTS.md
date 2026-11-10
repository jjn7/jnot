## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## This project

- Portfolio for jnot.net. See README.md for structure and commands.
- Copy that isn't a case study lives in `src/data/site.ts`; case studies in `src/content/projects/<id>/index.md`.
- Joel commits and pushes. Never commit or push unless asked to in that message. Every push to `main` deploys to jnot.net immediately; no feature branches or pull requests.
- Commit messages describe the change only: no trailers or footers.
- Anything unfinished renders with a `data-todo` attribute; `npm run launch-check` lists them (report only, it doesn't block deploys).
- No resume on the site. It's for winning direct work, not job applications.
- Australian spelling, plain first-person voice. Keep text contrast at WCAG AA (tokens in `src/styles/global.css` are checked).
- Never add a client `name` to a project without confirmation that the client agreed. The repo is public.
- Never write the agency's name anywhere in this repo (code, comments, copy, commit messages). Refer to it as "an Adelaide marketing agency".
