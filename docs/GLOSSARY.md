# Glossary

| Term | Meaning |
| --- | --- |
| **Hyperion Corporation** | Organization that builds software to optimize the human work of developers, artists, and designers for games, simulations, and related computer systems. |
| **Organization-Website** | This repository: Hyperion’s public static site on GitHub Pages (`basePath: /Organization-Website`). |
| **VGP / Visual Graph Programming** | Flagship product direction: graph and metrics visualization (2D/3D) of code modules, assets, and storyboards, plus authoring of new modules from that shared model. |
| **ADR** | Architecture Decision Record — a short document capturing a significant, hard-to-reverse technical decision and its rationale. See [`docs/adr/`](adr/). |
| **Static export** | Next.js `output: 'export'` mode: the app builds to plain HTML/CSS/JS in `out/` with no server runtime, suitable for GitHub Pages. |
| **basePath** | URL prefix for project Pages hosting (`/Organization-Website`). Configured in `stack/next/next.config.js` and mirrored by CI, Cypress, and the postbuild symlink. |
| **Front-matter** | YAML metadata block at the top of a Markdown content file (title, date, tags, etc.), parsed via `gray-matter`. |
| **Content section** | One of the top-level folders under `app/content/` (`posts`, `reports`, `projects`, `tools`, `media`, `about`, `other`). |
| **Island** | Client-hydrated interactive surface (React domain component, Astro iframe, Aurelia mount) that enhances a static page without requiring a server API. |
| **Capability tier** | Static / reduced / full rendering policy based on device, preference, and browser support (see `ExperienceQuality` and visual experience config). |
| **Notebook** | A Jupyter notebook under `notebooks/`, used for exploratory analysis; not part of the Next.js site build. |
| **Self-host infra** | Optional deploy tooling under `infra/{docker,nginx,ansible,terraform}/` — not used by the default GitHub Pages workflow. |
