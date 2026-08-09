/**
 * Canvas palettes for the docs-dashboard visuals.
 *
 * CSS custom properties cover everything drawn in the DOM, but a canvas has to
 * pick its colours in JS. Docusaurus writes the active colour mode onto
 * `<html data-theme>` (and Storybook's preview toggles a `dark` class), so both
 * hosts can be read the same way. Luminous accents that read well on the deep
 * observatory surface are too faint on a white one, hence two palettes rather
 * than one set of alphas.
 */

export interface CanvasPalette {
  /** `r, g, b` triples, used inside `rgba(...)` template strings. */
  accent: string;
  accentAlt: string;
  /** Multiplier applied to decorative alphas. */
  intensity: number;
}

export const DARK_PALETTE: CanvasPalette = {
  accent: '56, 189, 248',
  accentAlt: '139, 92, 246',
  intensity: 1,
};

export const LIGHT_PALETTE: CanvasPalette = {
  accent: '3, 105, 161',
  accentAlt: '109, 40, 217',
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
