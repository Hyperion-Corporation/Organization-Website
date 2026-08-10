# Gate G2 — Visual system checklist (Helios Forge)

**Status:** Hardening · **Session:** R5.2 · **Palette:** keep gold / cobalt / teal

Use this list to exit Gate G2 (see [`../ROADMAP.md`](../ROADMAP.md)). Parent workstream: [user_interface.md](user_interface.md) (UI3–UI5 residual, UI11 slice).

## Identity (done)

- [x] Distinct from Journals/`github-pages` cyan–violet–pink seed
- [x] Distinct from VGP violet–emerald–magenta and PMF crimson coastal
- [x] Main site + docs share **Helios Forge** semantics
- [x] Single token file: [`src/styles/helios-tokens.css`](../../../src/styles/helios-tokens.css)

## Ambient motion (done / residual)

- [x] NetworkField canvas (nodes, edges, pulses) on main shell
- [x] Falling solar embers (canvas + CSS layer)
- [x] Docs backdrop parity (pulses + embers)
- [x] `prefers-reduced-motion` → static frame; pause when tab hidden
- [ ] Optional: pointer spotlight (UI4 residual; not required for G2 exit)

## Accessibility smoke (partial)

- [x] Skip link → `#main-content`
- [x] `main` landmark with stable id
- [x] `:focus-visible` uses gold outline
- [x] Cypress smoke: `test/cypress/smoke/a11y-shell.cy.js`
- [ ] Full axe serious/critical = 0 on home + about + projects
- [ ] Keyboard-only path through home hero CTAs and constellation
- [ ] VoiceOver/NVDA one-pass notes attached to release issue

## Contrast (partial)

| Pair | Light | Dark | Target |
| --- | --- | --- | --- |
| Body text on ground | stone-900 on paper | slate-100 on ink | AA normal |
| Muted text | stone-500/600 | slate-400 | AA large / UI |
| Primary button | white on gold→cobalt gradient | white on same | AA |
| Active nav | amber-700 on amber-50 | amber-300 on amber/15 | AA |
| Links in prose | cobalt / teal | amber-300 / teal-300 | AA |

- [ ] Spot-check with browser contrast tool at 320 / 768 / 1440
- [ ] Forced-colors / Windows high-contrast smoke

## Performance baselines (IT6)

- [x] Static export budget harness: `npm run benchmark` → `benchmark/results/latest.*`
- [x] CI Lighthouse workflow: `.github/workflows/benchmark.yml` (artifact upload)
- [ ] Record one local Lighthouse run for home (desktop + mobile) in `docs/BENCHMARKS.md`
- [ ] Confirm p75 targets: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (field or lab note)

## Visual regression (planned)

- [ ] Reference screenshots: home mobile/tablet/desktop × light/dark
- [ ] Tool choice ADR: Cypress screenshots vs Playwright vs Chromatic (IT10)

## Exit criteria

Gate G2 closes when:

1. Token file is the only place palette primaries are redefined.
2. Skip link + landmarks smoke is green in CI.
3. At least one Lighthouse report is archived (CI artifact or `docs/BENCHMARKS.md` table).
4. No known WCAG AA failures on primary text/controls in either theme.
5. Reduced-motion path verified on NetworkField (manual or automated).
