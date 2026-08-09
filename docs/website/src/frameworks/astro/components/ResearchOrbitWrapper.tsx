import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Iframe host for the prebuilt Astro ResearchOrbit island under
 * static/astro-island (MFP5), framed in the observatory panel style so the
 * island reads as part of the page rather than an embedded document.
 */
export function ResearchOrbitWrapper({
  height = '520px',
  title = 'Astro research orbit island',
}: {
  height?: string;
  title?: string;
}) {
  // Directory URL, not `/index.html`: GitHub Pages serves the directory index
  // either way, while `docusaurus serve` rewrites the explicit `index.html`
  // into a route that falls through to the SPA and renders the homepage.
  const src = useBaseUrl('/astro-island/');

  return (
    <div className="hy-panel hy-island">
      <iframe className="hy-island__frame" src={src} title={title} style={{ height }} loading="lazy" />
    </div>
  );
}

export default ResearchOrbitWrapper;
