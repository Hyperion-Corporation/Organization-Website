import type { ReactNode } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import ObservatoryBackdrop from '../frameworks/react/components/docs/ObservatoryBackdrop';
import ModuleLattice from '../frameworks/react/components/docs/ModuleLattice';
import DocsHero from '../frameworks/react/components/docs/DocsHero';
import BentoCards from '../frameworks/react/components/docs/BentoCards';
import DocsHubTabs from '../frameworks/react/components/docs/DocsHubTabs';
import KnowledgeGraph from '../frameworks/react/components/docs/KnowledgeGraph';
import RoadmapTimeline from '../frameworks/react/components/docs/RoadmapTimeline';
import ResearchOrbitWrapper from '../frameworks/astro/components/ResearchOrbitWrapper';

/**
 * Documentation dashboard homepage.
 *
 * Composition follows the Hyperion identity described in
 * docs/moon/roadmaps/user_interface.md: an ambient observatory backdrop, an
 * editorial hero with a live model, bento navigation, a tabbed hub, the
 * documentation corpus as a zoomable map, a framework island, and the roadmap
 * phase gates as a timeline. Everything below the backdrop is ordinary
 * semantic HTML, so the page keeps its meaning with every canvas removed.
 */
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <Layout
      title={siteConfig.title}
      description="Documentation, guides, API reference, and a live component library for Hyperion Corporation's organization site."
    >
      <div className="hy-home">
        <ObservatoryBackdrop />
        <div className="hy-grid-overlay" aria-hidden="true" />

        <main>
          <div className="hy-section">
            <DocsHero
              badge="Documentation dashboard"
              kicker="Hyperion Corporation"
              title="The system behind"
              titleAccent="the surface."
              summary={
                <>
                  Architecture, decision records, roadmaps, generated API reference, and a live component
                  library for the organization site — the working documentation for{' '}
                  <strong>software that optimizes human creative work</strong> in games, simulations, and
                  Visual Graph Programming.
                </>
              }
              actions={[
                { label: 'Read the architecture', href: withBaseUrl('/docs/ARCHITECTURE'), variant: 'primary' },
                { label: 'Open Storybook', href: withBaseUrl('/storybook/index.html') },
                { label: 'Browse the roadmap', href: withBaseUrl('/docs/moon/ROADMAP') },
              ]}
              metrics={[
                { label: 'Workstreams', value: '9 roadmaps' },
                { label: 'Phase gates', value: 'R0 → R8' },
                { label: 'Delivery', value: 'Static export' },
              ]}
              stageLabel="Live · module lattice"
              stage={<ModuleLattice height={420} />}
            />
          </div>

          <section className="hy-section" aria-labelledby="surfaces-title">
            <p className="hy-eyebrow">Start here</p>
            <h2 className="hy-section-title" id="surfaces-title">
              Four surfaces, one corpus
            </h2>
            <p className="hy-section-lead">
              Each surface is generated from the repository itself — the docs from Markdown, the reference from
              TypeDoc, the component library from a real Storybook build — so nothing here can drift from the
              code it describes.
            </p>
            <BentoCards resolveHref={withBaseUrl} />
          </section>

          <section className="hy-section" aria-labelledby="hub-title">
            <p className="hy-eyebrow">Documentation hub</p>
            <h2 className="hy-section-title" id="hub-title">
              What this site claims, and where the evidence lives
            </h2>
            <p className="hy-section-lead">
              Five views over the same corpus: how the site is built, how it looks and moves, what you can
              manipulate, what is generated, and which research the product framing rests on.
            </p>
            <DocsHubTabs resolveHref={withBaseUrl} />
          </section>

          <section className="hy-section" aria-labelledby="map-title">
            <p className="hy-eyebrow">Explorable structure</p>
            <h2 className="hy-section-title" id="map-title">
              The documentation, as a map
            </h2>
            <p className="hy-section-lead">
              Drag to pan, scroll to zoom, and select a node to see what it covers. Every node is also a plain
              link in the list below the map — the visualization is an enhancement, never the only route in.
            </p>
            <KnowledgeGraph resolveHref={withBaseUrl} />
          </section>

          <section className="hy-section" aria-labelledby="island-title">
            <p className="hy-eyebrow">Framework island · Astro</p>
            <h2 className="hy-section-title" id="island-title">
              Polyglot by construction
            </h2>
            <p className="hy-section-lead">
              React hosts the shell; Astro, Aurelia, and Vue islands present specialized views over the same
              framework-neutral contracts (MFP5). The orbit below is a prebuilt Astro island, served as static
              output alongside these pages.
            </p>
            <ResearchOrbitWrapper />
          </section>

          <section className="hy-section" aria-labelledby="roadmap-title">
            <p className="hy-eyebrow">Phase gates</p>
            <h2 className="hy-section-title" id="roadmap-title">
              Where the product is going
            </h2>
            <p className="hy-section-lead">
              R0 through R8 from the master roadmap. Completed phases keep their rationale; each links to the
              workstream that carries it.
            </p>
            <RoadmapTimeline resolveHref={withBaseUrl} />
          </section>
        </main>
      </div>
    </Layout>
  );
}
