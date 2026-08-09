# public/reports/

Static HTML/CSS/JS report assets loaded by `app/content/reports/[slug]/page.tsx`.

These files are a **retained technical library** from the prior site template (optimization, generative systems, signal processing, etc.). They remain available for reference while Hyperion product reports for Visual Graph Programming and related tooling are authored.

When replacing a report:

1. Keep the `baseName` mapping in `app/content/reports/[slug]/page.tsx` in sync with filenames under `html/`, `css/`, and `javascript/`.
2. Prefer self-contained HTML that works inside the static export (no server endpoints).
3. Update the index copy on `app/content/reports/page.tsx` if categories or titles change.
