import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection, CorpCard } from '@/src/frameworks/react/components/ui/CorpPage';
import { appPath } from '@/src/utils/paths';

const INITIATIVES = [
  {
    name: 'Visual Graph Programming',
    stage: 'Flagship',
    blurb:
      'Platform direction for graph and metrics visualization of modules, assets, and storyboards—with authoring paths for new structure.',
    href: 'https://github.com/Hyperion-Corporation',
    linkLabel: 'Org on GitHub',
  },
  {
    name: 'Organization Website',
    stage: 'Public surface',
    blurb:
      'This static Next.js export: mission, products, research notes, and progressive demos for Hyperion Corporation.',
    href: 'https://github.com/Hyperion-Corporation/Organization-Website',
    linkLabel: 'Repository',
  },
  {
    name: 'Documentation dashboard',
    stage: 'Engineering',
    blurb:
      'Docusaurus + Storybook docs site with shared Helios Forge identity, corpus map, and roadmap timeline.',
    href: appPath('/'),
    linkLabel: 'Home overview',
    internal: true,
  },
];

export default function ProjectsPage() {
  return (
    <CorpPage
      kicker="Delivery"
      title="Projects & initiatives"
      lead="Shipped surfaces and active builds under Hyperion—not a personal project gallery. Each initiative maps to a product or public engineering artifact."
      cta={{ href: appPath('/content/products'), label: 'Product lineup' }}
    >
      <CorpSection kicker="Board" title="Active work">
        <div className="corp-initiative-list">
          {INITIATIVES.map((item) => (
            <article key={item.name} className="corp-initiative">
              <div className="corp-initiative__side">
                <span className="corp-initiative__stage">{item.stage}</span>
              </div>
              <div className="corp-initiative__main">
                <h3 className="corp-initiative__name">{item.name}</h3>
                <p className="corp-initiative__blurb">{item.blurb}</p>
                <a
                  href={item.href}
                  className="forge-text-link"
                  {...(item.internal
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {item.linkLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </CorpSection>

      <CorpSection kicker="Domains" title="Where this lands">
        <div className="corp-chip-cloud">
          {['Games', 'Simulations', 'Tooling', 'Graph viz', 'Metrics', 'Authoring', 'Static web'].map(
            (tag) => (
              <span key={tag} className="corp-chip">
                {tag}
              </span>
            )
          )}
        </div>
        <CorpCard className="mt-6">
          <p className="corp-prose">
            Looking for collaboration or early access conversations?{' '}
            <Link href={appPath('/content/contact')} className="corp-inline-link">
              Reach the team
            </Link>
            .
          </p>
        </CorpCard>
      </CorpSection>
    </CorpPage>
  );
}
