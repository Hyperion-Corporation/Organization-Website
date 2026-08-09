# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
