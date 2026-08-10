/**
 * Canvas palettes for the docs-dashboard visuals — Helios Forge.
 *
 * CSS custom properties cover everything drawn in the DOM, but a canvas has to
 * pick its colours in JS. Docusaurus writes the active colour mode onto
 * `<html data-theme>` (and Storybook's preview toggles a `dark` class), so both
 * hosts can be read the same way.
 *
 * Gold + teal (not cyan/violet) so the docs site matches the main Helios Forge
 * identity and stays distinct from VGP and the github-pages template seed.
 */

export interface CanvasPalette {
  /** `r, g, b` triples, used inside `rgba(...)` template strings. */
  accent: string;
  accentAlt: string;
  edge: string;
  /** Multiplier applied to decorative alphas. */
  intensity: number;
}

export const DARK_PALETTE: CanvasPalette = {
  accent: '245, 158, 11', // gold
  accentAlt: '45, 212, 191', // teal
  edge: '96, 165, 250', // soft cobalt
  intensity: 1,
};

export const LIGHT_PALETTE: CanvasPalette = {
  accent: '180, 83, 9', // deep gold
  accentAlt: '15, 118, 110', // deep teal
  edge: '37, 99, 235', // cobalt
  intensity: 1.25,
};

/** Reads the host's active colour mode; defaults to dark during SSR. */
export function isLightTheme(): boolean {
  if (typeof document === 'undefined') return false;
  const root = document.documentElement;
  if (root.getAttribute('data-theme') === 'light') return true;
  if (root.getAttribute('data-theme') === 'dark') return false;
  return !root.classList.contains('dark');
}

export function currentPalette(): CanvasPalette {
  return isLightTheme() ? LIGHT_PALETTE : DARK_PALETTE;
}

/**
 * Calls `onChange` whenever the host switches colour mode, so a canvas can
 * repaint with the other palette instead of waiting for its next resize.
 */
export function observeTheme(onChange: () => void): () => void {
  if (typeof MutationObserver !== 'function' || typeof document === 'undefined') return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  return () => observer.disconnect();
}
