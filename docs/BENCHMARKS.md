# Benchmarks

| Concern | Tool | Notes |
| --- | --- | --- |
| Build output size | `npm run build` output | Next.js prints per-route bundle sizes; watch for regressions on large content additions |
| Static export budgets | `npm run build && npm run benchmark` | Writes `benchmark/results/latest.json` and `latest.md` (JS/CSS totals, route status/bytes). Set `BENCHMARK_STRICT=1` to fail CI on budget warnings. |
| Page performance | [Lighthouse](https://developer.chrome.com/docs/lighthouse/) | CI: [`.github/workflows/benchmark.yml`](../.github/workflows/benchmark.yml) uploads `lighthouse-report.json`. Local: serve `out/` then `npx lighthouse http://localhost:3000/Organization-Website --view`. |
| Visual system gate | [G2 checklist](moon/roadmaps/g2_visual_system_checklist.md) | Helios Forge identity + a11y smoke; not a substitute for field Web Vitals. |

## Budgets (product policy)

| Metric | Budget | Source |
| --- | --- | --- |
| Initial route JS (aggregate export) | ≤ 200 kB gzip target · harness currently measures **uncompressed** totals | ROADMAP vision rule 7; `benchmark/measure.mjs` |
| Initial CSS | ≤ 80 kB (harness uncompressed) | `benchmark/measure.mjs` |
| Homepage HTML response | ≤ 2 MB | `benchmark/measure.mjs` |
| LCP / INP / CLS (p75) | ≤ 2.5 s / 200 ms / 0.1 | ROADMAP |

## Recording a Lighthouse baseline (G2)

1. `npm run build && npx serve@latest out -l 3000`
2. Desktop: `npx lighthouse http://localhost:3000/Organization-Website --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=benchmark/results/lighthouse-home-desktop.json --chrome-flags="--headless --no-sandbox"`
3. Optional mobile form-factor: add `--form-factor=mobile --screenEmulation.mobile=true`
4. Paste score summary into the table below and commit the JSON only if it is small enough for git policy; otherwise keep CI artifacts.

| Date | Form factor | Perf | A11y | BP | SEO | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| _pending_ | desktop | — | — | — | — | Helios Forge R5.2; fill after local or CI run |

## Helios ambient cost note

`NetworkFieldBackdrop` is decorative: ~30 fps, DPR clamped, paused when `document.hidden`, static under `prefers-reduced-motion`. Treat regressions in main-thread long tasks after home paint as IT6/IT10 work, not as a reason to drop identity motion without measurement.
