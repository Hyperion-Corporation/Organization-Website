import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection, CorpCard } from '@/src/frameworks/react/components/ui/CorpPage';
import { appPath } from '@/src/utils/paths';

const PRODUCTS = [
  {
    id: 'vgp',
    status: 'In development',
    name: 'Visual Graph Programming',
    summary:
      'Graph and metrics visualization for modules, assets, and storyboards—so creative and engineering teams share one structural model.',
    points: ['2D / 3D graph views', 'Relationship authoring', 'Metrics tied to structure', 'Games & sims pipelines'],
  },
  {
    id: 'pipeline',
    status: 'Exploratory',
    name: 'Creative pipeline tooling',
    summary:
      'Workflow-oriented software that reduces friction between art, design, and engineering on complex interactive productions.',
    points: ['Cross-role visibility', 'Asset ↔ code links', 'Board ↔ implementation maps'],
  },
  {
    id: 'site',
    status: 'Shipped',
    name: 'Organization surfaces',
    summary:
      'Public product presence (this site): static Next.js export, progressive demos, documentation dashboard.',
    points: ['GitHub Pages', 'Interactive islands', 'Docs + Storybook'],
  },
];

export default function ProductsPage() {
  return (
    <CorpPage
      kicker="Portfolio"
      title="Products"
      lead="Software for makers of interactive systems—starting with graph-centric tools that expose structure, metrics, and relationships."
      cta={{ href: appPath('/content/contact'), label: 'Talk to us' }}
    >
      <CorpSection kicker="Lineup" title="What we are building">
        <div className="corp-product-stack">
          {PRODUCTS.map((p, i) => (
            <article key={p.id} className={`corp-product ${i === 0 ? 'corp-product--flagship' : ''}`}>
              <div className="corp-product__meta">
                <span className="corp-product__status">{p.status}</span>
                <span className="corp-product__index">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="corp-product__name">{p.name}</h3>
              <p className="corp-product__summary">{p.summary}</p>
              <ul className="corp-product__points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </CorpSection>

      <CorpSection kicker="Outcomes" title="Problems we care about">
        <div className="corp-triad">
          <CorpCard>
            <h3 className="corp-card__title">Lost structure</h3>
            <p className="corp-card__body">
              Modules, assets, and boards diverge until nobody can explain how a feature is wired.
            </p>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">Opaque metrics</h3>
            <p className="corp-card__body">
              Telemetry without topology—numbers that do not attach to the things people actually edit.
            </p>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">Role friction</h3>
            <p className="corp-card__body">
              Engineers, artists, and designers optimize local tools while the system as a whole stays opaque.
            </p>
          </CorpCard>
        </div>
      </CorpSection>

      <CorpSection kicker="Next" title="Explore further">
        <div className="corp-link-row">
          <Link href={appPath('/content/projects')} className="forge-btn forge-btn--primary">
            Active projects
          </Link>
          <Link href={appPath('/content/reports')} className="forge-btn forge-btn--ghost">
            Research notes
          </Link>
        </div>
      </CorpSection>
    </CorpPage>
  );
}
