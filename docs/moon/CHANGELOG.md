# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Structural break from the Journals/github-pages personal shell:** full-width product top navigation (no sticky left sidebar), multi-column product footer, and a redesigned homepage IA — pillars, flagship band, system map, proof panel, **tabbed lab** (not a field-notes demo dump), update card grid, project rail, and closing CTA. Shared nav constants in `src/constants/siteNav.ts`.

### Added

- Shared Helios token file [`src/styles/helios-tokens.css`](../../src/styles/helios-tokens.css) imported by the main site and the docs dashboard (reduces palette drift).
- Skip-to-content link and stable `main#main-content` landmark (G2 / UI11 slice); Cypress smoke `test/cypress/smoke/a11y-shell.cy.js`.
- Gate G2 checklist: [`docs/moon/roadmaps/g2_visual_system_checklist.md`](roadmaps/g2_visual_system_checklist.md); expanded [`docs/BENCHMARKS.md`](../BENCHMARKS.md) with budget table and Lighthouse recording steps.
- **Helios Forge** visual identity on the main Organization site (UI3–UI5): solar gold / forge cobalt / network teal tokens in `app/globals.css` and Tailwind (`primary`, `helios.*`); warm-paper light surfaces and deep-ink dark ground with multi-stop aurora fields.
- Ambient **NetworkFieldBackdrop** (`src/frameworks/react/components/graphics/NetworkFieldBackdrop.tsx`) mounted from the client shell: drifting nodes, batched constellation edges, teal dataflow pulses, and falling solar embers (VGP/PMF-inspired motion, Hyperion palette). CSS ember drift layer as a secondary ambient channel. Honours `prefers-reduced-motion`, tab visibility, and clamped DPR.
- Hero stage background image (`public/hyperion_hero_image.jpg`) for the model panel.
- Hyperion Helios Forge identity for the documentation dashboard (UI15, DOC12 refresh): `docs/website/src/css/observatory.css` holds the tokens and `hy-` component classes (gold/cobalt/teal semantics); `custom.css` maps them onto Infima and restyles the navbar, sidebar, doc content, code blocks, and footer. Lexend/Inter load from the site config with `display=swap`.
- Composed dashboard homepage: ambient network/ember backdrop, editorial hero with a canvas module lattice, bento navigation, ARIA tabs documentation hub, a zoomable/pannable knowledge map of the documentation corpus, the Astro research-orbit island, and the R0–R8 phase timeline.
- Storybook stories with hand-written prop tables for every new dashboard component, and the Storybook Tailwind entry now loads the same design system stylesheet as Docusaurus.

### Changed

- Main-site and docs accents moved off the template cyan–violet–pink “observatory” palette so Organization-Website is visually distinct from `Journals/github-pages`, VGP docs, and PMF docs.
- Shell (header, sidebar, badges, glass cards) and content routes use amber/gold active states and teal secondary accents; constellation gradient and chart encodings follow Helios tokens.
- Docs canvas palette (`theme.ts`) and `ObservatoryBackdrop` upgraded with edge pulses and falling embers; docs graph node colors realigned.
- Dashboard visualizations follow the platform's motion and budget policy: the hero model is plain 2D canvas maths instead of a WebGL renderer, continuous animation stops while the tab is hidden, device pixel ratio is clamped, and reduced motion renders a static frame. The knowledge map and timeline keep DOM equivalents (a plain link list; a reveal that is only armed once its observer attaches).
- Astro research-orbit island restyled to the Helios palette with a transparent background and reduced-motion-aware orbit rings; the host wrapper now points at the island's directory URL, since `docusaurus serve` rewrites an explicit `/index.html` into a route that falls through to the SPA.
- Moon roadmap session **R5.2**: R2 visual language marked done on the master timeline; UI3–UI5 residual = visual regression + shared token package; G2 hardening.

### Fixed

- Docs-site pages rendered their own compiled MDX module source as prose (`export const frontMatter = {} …`) instead of the document. The "guides" docs-plugin instance pointed at the repository root, and Docusaurus registers one MDX webpack rule per plugin instance keyed on its content directory — so that rule also matched everything under `docs/`, which the "default" instance owns, and each page went through the MDX loader twice. `npm run sync:guides` (`docs/website/scripts/sync-guides.mjs`) now stages the three guide documents into a `.guides-content/` directory at the repository root, keeping the two instances' content trees disjoint; `prestart`/`prebuild` run it, and "Edit this page" maps each staged file back to its real source.
- Added branded `app/not-found.tsx` so missing routes explain dev vs production basePath instead of a bare Next 404 shell.
- Downscaled `assets/images/knowledge_graph.png` for web delivery.
- Local `next dev` no longer uses `basePath`, so `http://localhost:3000/` works; production still deploys under `/Organization-Website`. Replaced hardcoded `/Organization-Website/...` hrefs with `appPath()`.
- Hardened sidebar brand mark (square 128px icon + CSS size caps + `width`/`height` attributes) so a missing stylesheet cannot expand the full wordmark across the page; document basePath URL for unstyled-shell failures.
- Content-page heroes use the lighter logo asset with explicit dimensions; dropped the unused multi‑MB full-res logo; MediaMosaic uses the compact mark.
- Root `tsconfig.json` excludes `docs/website` (and `out/`) so Next typecheck no longer requires Docusaurus deps at the monorepo root.
- Corrected `ExperienceQuality` import path under `src/libraries/redux/actions/appActions.ts` so `npm run build` succeeds.

### Changed

- Regenerated Astro islands from sources; replaced docs-site “AH” monogram with Hyperion “H”; added Open Graph social image (`og-image.jpg`); nav label Posts → Updates.
- Replaced default favicon with Hyperion-derived icons (`favicon.ico`, `icon-192.png`, `icon-512.png`); expanded site metadata (Open Graph, keywords); branded Astro island/starfield copy.
- Media mosaic uses only Hyperion logo + knowledge graph assets; removed unused `public/images` literature/workshop poster files; documented `public/reports/` as a retained template-era library.
- Renamed homepage `FleetRouteMap` / `FleetRouteCanvas` to `StructureMap` / `StructureCanvas`; fixed unit-test import paths for Redux and Post/Report wrappers (full Vitest suite green).
- Reframed homepage structure/metrics demos (map, canvas, audio pulse, convergence, hero model) to Visual Graph Programming language; updated README route table, ARCHITECTURE goals, glossary, and docs lore stories.
- Rebranded the site from the personal `github-pages` template to **Hyperion Corporation** / **Organization-Website** (identity, `basePath`, product copy, agent docs, CI paths).
- Product framing now centers software that optimizes work for developers, artists, and designers (games, simulations, related systems), with **Visual Graph Programming (VGP)** as the flagship direction.
- Flattened optional self-host layout to `infra/{docker,nginx,ansible,terraform}/` only; removed cloud, k8s, helm, private experiments, and Envoy.
- Moon research/report library now anchors on Hyperion product research: [`research/Visual Development Tool Roadmap & Tech Stack.md`](research/Visual%20Development%20Tool%20Roadmap%20%26%20Tech%20Stack.md) and [`reports/Game Dev Tools Market Research.md`](reports/Game%20Dev%20Tools%20Market%20Research.md).
- Posts index and `public/posts/` HTML rewritten for organization updates; media/about/projects/home demos aligned with Hyperion branding.

### Removed

- Personal portfolio images under `assets/images/` except `knowledge_graph.png`.
- `public/docs/` (thesis PDF and personal bibliographies).
- Optional infra paths: `infra/cloud/`, `infra/global/{helm,k8s}/`, `infra/private/`, `infra/server/proxy/` (and former nested global/server layout).

### Added

- Hyperion logo assets under `assets/icons/`.
- Organization-facing home, about, projects, media, posts, reports, and other section copy.
- Product domain map in `ResearchConstellation` / `researchGraph` for Hyperion → VGP → domains.

### Historical (template era)

The following entries document work from the prior personal-site template and the progressive-enhancement platform it established. They remain for auditability; new work should use Hyperion / Organization-Website language.

- Flattened the documentation dashboard from `docs/website/react/` into `docs/website/` (PMF-style package root), retargeted Docusaurus/TypeDoc/Storybook paths, and pointed Storybook at `src/frameworks/react/components/`.
- Moved Astro island routes from `src/pages/` into `src/frameworks/astro/pages/` and pointed `astro.config.mjs` `srcDir` at `./src/frameworks/astro`.
- Docs website parity modules under `docs/website/src/` and multi-framework platform roadmap (MFP1–MFP16).
- Architecture Decision Records for graphics renderer lifecycle (ADR 0002) and geospatial renderer (ADR 0003).
- Capability-gated 3D hero, visualization primitives, constellation, model/panorama viewers, audio exhibit, effects, domain component catalogue (IF1–IF13).
- Framework-neutral simulations under `src/simulations/` and Aurelia island boundary.
- Vitest unit/integration + MSW, Cypress e2e/smoke, root `benchmark/` harness.
- Dark/light theme, content sections, notebooks workspace via `uv`.

## [0.2.0] — migration to Next.js

### Changed

- Moved from Gatsby to Next.js as the site framework.
- Updated PostCSS/Tailwind configuration for the new framework.

## [0.1.0] — Gatsby + TypeScript skeleton

### Added

- Replaced the previous Jekyll implementation with a Gatsby + React + TypeScript skeleton.
- Jupyter notebooks, layouts/pages, doc assets, and markdown generators.

## [0.0.1] — Jekyll (minima)

### Added

- Initial static site skeleton.
