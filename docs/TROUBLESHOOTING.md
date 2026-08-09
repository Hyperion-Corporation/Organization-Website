# Troubleshooting

## `npm run build` fails

This site is a static export (`output: 'export'` in `next.config.js`). Common causes:
- A component uses a server-only or Node-only API from client code.
- A page reaches for `window`/`document` outside a `useEffect`/client component.
- An API route was added — static export doesn't support them.

## Fresh clone: TypeScript/ESLint errors on `npm install`

Delete `node_modules` and re-run `npm ci` (not `npm install`) to get the exact locked versions from `package-lock.json`.

## Cypress can't reach the site

`test/cypress/cypress.config.js` uses `http://localhost:3000` for local dev and `http://localhost:3000/Organization-Website` when `CI=true` (production export). Start `npm run dev` for local Cypress, or `npm run build && npm start` for CI-like runs. The production export only answers under `/Organization-Website` (see `postbuild` symlink).

## Cypress reports "no spec files were found"

Cypress resolves `--spec` and `specPattern` relative to the current working directory, not the `--config-file`/`--project` flag. Always run Cypress commands from inside `test/cypress/` (the `npm run cypress:*` scripts already `cd` there first) rather than passing `--config-file` from the repo root.

## Notebooks: `uv sync` can't find dependencies

Run `uv sync --extra dev` from inside `notebooks/`, not the repo root — it's a separate workspace member with its own `pyproject.toml`.

## Site renders but assets 404 on GitHub Pages

Check `next.config.js`'s `basePath`/`NEXT_PUBLIC_BASE_PATH` still match the repository name (`/Organization-Website`) — a repo rename requires updating both.

## Site looks unstyled or shows 404 at `localhost:3000`

| Mode | Correct URL |
| --- | --- |
| **`npm run dev`** | [`http://localhost:3000/`](http://localhost:3000/) (no basePath) |
| **`npm run build && npm start`** | [`http://localhost:3000/Organization-Website/`](http://localhost:3000/Organization-Website/) |

Production static export is always under `/Organization-Website` for GitHub Pages. Opening bare `http://localhost:3000/` against a **production** serve returns **404** (what the address bar shows in that case).

After changing `basePath` / PostCSS / Tailwind, restart the dev server and hard-refresh (`Ctrl+Shift+R`).

In DevTools → Network, confirm the main CSS file is **200**, not 404.
