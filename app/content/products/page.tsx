import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection, CorpCard } from '@/src/frameworks/react/components/ui/CorpPage';
import VgpStructureDemo from '@/src/frameworks/react/components/products/VgpStructureDemo';
import { appPath } from '@/src/utils/paths';

const LINEUP = [
  {
    id: 'vgp',
    status: 'In development',
    name: 'Visual Graph Programming',
    summary:
      'Direction for graph and metrics visualization of modules, assets, and storyboards—so teams share one structural model. Not an installable product yet.',
    points: ['Structure graph', 'Metrics on structure', 'Cross-role authoring', 'Games & sims'],
  },
  {
    id: 'pipeline',
    status: 'Exploratory',
    name: 'Creative pipeline tooling',
    summary:
      'Early thinking on workflow tools that reduce friction between art, design, and engineering. Exploratory—not a named SKU.',
    points: ['Cross-role visibility', 'Asset ↔ code links', 'Board ↔ implementation'],
  },
  {
    id: 'surfaces',
    status: 'Public surface',
    name: 'Organization surfaces',
    summary:
      'This website and docs dashboard: brand, mission, progressive demos, and engineering transparency while products mature.',
    points: ['Static export', 'Interactive demos', 'Docs + Storybook'],
  },
];

export default function ProductsPage() {
  return (
    <CorpPage
      kicker="Offerings"
      title="Products"
      lead="Hyperion builds software for makers of interactive systems. Today we are early: we share direction, metaphors, and demos—not a downloadable suite."
      cta={{ href: appPath('/content/projects'), label: 'See active projects' }}
    >
      <CorpSection kicker="Honesty" title="How to read this page">
        <CorpCard accent>
          <p className="corp-prose">
            <strong>Brand awareness &amp; direction.</strong> Visual Graph Programming (VGP) is an{' '}
            <em>in-development</em> product direction. The interactive graph below is an{' '}
            <strong>illustrative prototype</strong> for understanding modules, assets, storyboards, and metrics—not a
            shipping editor, not a production pipeline integration.
          </p>
        </CorpCard>
      </CorpSection>

      <CorpSection id="vgp" kicker="Flagship direction" title="Visual Graph Programming">
        <div className="corp-prose corp-prose-block">
          <p>
            Games and simulations bury structure across <strong>code modules</strong>, <strong>assets</strong>, and{' '}
            <strong>design or story boards</strong>. VGP aims to make those relationships visible and eventually
            authorable—so developers, artists, and designers share one map of the work.
          </p>
        </div>
        <div className="corp-triad corp-triad--tight">
          <CorpCard>
            <h3 className="corp-card__title">See</h3>
            <p className="corp-card__body">
              Graph views of how systems, content, and boards connect—before you memorize the repo folklore.
            </p>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">Measure</h3>
            <p className="corp-card__body">
              Metrics attached to structure (depth, references, coverage)—not only free-floating telemetry.
            </p>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">Author (later)</h3>
            <p className="corp-card__body">
              Longer-term: evolve modules from a shared visual model. Today: metaphor and demos only.
            </p>
          </CorpCard>
        </div>
      </CorpSection>

      <CorpSection kicker="Interactive demo" title="Module · asset · board · metric">
        <p className="corp-section-lead">
          Click a node to inspect it. Filter by kind. Related edges light up. A list equivalent sits under the
          graph for accessibility and reduced-motion contexts.
        </p>
        <VgpStructureDemo />
      </CorpSection>

      <CorpSection kicker="Lineup" title="What exists on paper today">
        <div className="corp-product-stack">
          {LINEUP.map((p, i) => (
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

      <CorpSection kicker="Problems" title="Why this matters">
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
              Numbers that do not attach to the things people actually edit.
            </p>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">Role friction</h3>
            <p className="corp-card__body">
              Each discipline optimizes a local tool while the whole system stays opaque.
            </p>
          </CorpCard>
        </div>
      </CorpSection>

      <CorpSection kicker="Next" title="Explore further">
        <div className="corp-link-row">
          <Link href={appPath('/content/projects')} className="forge-btn forge-btn--primary">
            Projects &amp; repos
          </Link>
          <Link href={appPath('/content/reports')} className="forge-btn forge-btn--ghost">
            Research &amp; roadmap
          </Link>
          <Link href={appPath('/content/contact')} className="forge-text-link">
            Contact via GitHub
          </Link>
        </div>
      </CorpSection>
    </CorpPage>
  );
}
