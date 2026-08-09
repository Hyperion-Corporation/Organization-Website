# Documentation and Content Roadmap

Goal: make every Hyperion product surface and visual experiment maintainable, reproducible, and understandable as both a product story and an engineering system.

| ID | Deliverable | Effort | Depends on | Status |
| --- | --- | --- | --- | --- |
| DOC1 | Product research under `docs/moon/research` and market report under `docs/moon/reports` | L | — | ✅ |
| DOC2 | Architecture Decision Record system under `docs/adr` | S | — | ✅ |
| DOC3 | Keep development, testing, dependency and troubleshooting guides current | S | — | 🔄 |
| DOC4 | Publish an edited research report on accessible progressive immersion | M | DOC1 | 📋 |
| DOC5 | Typed content schema for projects/case studies: outcomes, technologies, metrics, media, visualization data and related work | L | UI9 | 📋 |
| DOC6 | Interactive embed authoring guide with accessibility summaries, loading/fallback slots and asset budgets | M | IF3 | 📋 |
| DOC7 | 3D/360 asset handbook covering capture/export, axes/scale, compression, thumbnails, licensing and annotations | M | IT8 | 📋 |
| DOC8 | Visualization style guide: encodings, palettes, legends, uncertainty, responsive behaviour and data-table equivalence | M | IF3 | 📋 |
| DOC9 | Performance playbook and benchmark journal for renderer, worker, ML and solver decisions | M | IT6 | 📋 |
| DOC10 | Visitor-facing accessibility/motion/data controls help and privacy statement for local computation | S | UI6, ML4 | 📋 |
| DOC11 | Contributor templates/checklists for issues, ADRs, visual features and reproducible project case studies | S | DOC5–DOC9 | 📋 |
| DOC12 | Documentation dashboard as a product surface: Hyperion identity, navigable corpus map, hub tabs and roadmap timeline on the Docusaurus site | M | UI15 | ✅ |

### DOC12 — dashboard acceptance

- The dashboard homepage states what the corpus is, links every surface (docs, guides, generated API reference, component library, research) and carries the same visual identity as the main site (see [UI15](user_interface.md)).
- The corpus map is authored data (`docs/website/src/constants/docsGraph.ts`), not a crawl: nodes carry a summary and a destination, and the accessible list is generated from the same array as the visualization.
- Hub tab and timeline copy restate roadmap content rather than inventing claims; the phase list mirrors the gates in [`ROADMAP.md`](../ROADMAP.md).
- New dashboard components ship a Storybook story with hand-written prop tables, since react-docgen does not attach docgen info in this setup.

## Documentation quality bar

- Each feature document explains purpose, architecture, data flow, browser support, fallback, keyboard model, performance budget, test plan and teardown lifecycle.
- Case studies distinguish measured outcomes from aspirations and link to reproducible code/data when publication constraints allow.
- Diagrams have text alternatives; screenshots include captions; code samples are minimal, tested and compatible with the static export.
- ADRs cover persistent versus isolated canvas, graphics library choice, state ownership, worker protocol, asset formats and any backend fork.
- Roadmap IDs remain stable and map to GitHub issues; completion moves user-visible results to the changelog without deleting historical rationale.

## R2 research integration

Primary product research is the [Visual Development Tool Roadmap & Tech Stack](../research/Visual%20Development%20Tool%20Roadmap%20%26%20Tech%20Stack.md) and [Game Dev Tools Market Research](../reports/Game%20Dev%20Tools%20Market%20Research.md). Each issue and feature page links evidence; records licensing and browser support; distinguishes measured outcomes from illustrative demos; and documents the equivalent non-visual interaction. Roadmap IDs stay stable for auditability.
