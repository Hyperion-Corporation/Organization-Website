import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection, CorpCard } from '@/src/frameworks/react/components/ui/CorpPage';
import { appPath } from '@/src/utils/paths';

export default function AboutPage() {
  return (
    <CorpPage
      kicker="Company"
      title="About Hyperion Corporation"
      lead="We build software that optimizes the human work of developers, artists, and designers—especially for games, simulations, and related interactive systems."
      cta={{ href: appPath('/content/products'), label: 'See products' }}
    >
      <CorpSection id="mission" kicker="Mission" title="Why we exist">
        <div className="corp-prose">
          <p>
            Large interactive projects bury structure across code modules, assets, and narrative or design
            boards. Hyperion makes those relationships <strong>visible, measurable, and authorable</strong>
            —so teams spend less time reconstructing context and more time shipping.
          </p>
        </div>
        <div className="corp-stat-row">
          <div className="corp-stat">
            <span>Focus</span>
            <strong>Creative systems tools</strong>
          </div>
          <div className="corp-stat">
            <span>Domains</span>
            <strong>Games · Sims · Pipelines</strong>
          </div>
          <div className="corp-stat">
            <span>Flagship</span>
            <strong>Visual Graph Programming</strong>
          </div>
        </div>
      </CorpSection>

      <CorpSection id="approach" kicker="Approach" title="How we work">
        <div className="corp-split">
          <CorpCard>
            <h3 className="corp-card__title">Product principles</h3>
            <ul className="corp-list">
              <li>Make structure visible before asking people to memorize it</li>
              <li>Respect both craft and engineering rigor</li>
              <li>Progressive enhancement: HTML first, canvas when it helps</li>
              <li>Simple deploy defaults (static where it fits)</li>
            </ul>
          </CorpCard>
          <CorpCard accent>
            <h3 className="corp-card__title">Who we serve</h3>
            <ul className="corp-list">
              <li>Programmers &amp; technical directors</li>
              <li>Artists, designers &amp; narrative teams</li>
              <li>Tooling groups inside game / sim studios</li>
              <li>Multidisciplinary production pipelines</li>
            </ul>
          </CorpCard>
        </div>
      </CorpSection>

      <CorpSection id="presence" kicker="Open work" title="Presence">
        <CorpCard>
          <p className="corp-prose">
            Open work publishes under the{' '}
            <a href="https://github.com/Hyperion-Corporation" className="corp-inline-link">
              Hyperion-Corporation
            </a>{' '}
            GitHub organization. This site is a static export from{' '}
            <a
              href="https://github.com/Hyperion-Corporation/Organization-Website"
              className="corp-inline-link"
            >
              Organization-Website
            </a>
            .
          </p>
          <div className="corp-link-row">
            <Link href={appPath('/content/careers')} className="forge-text-link">
              Careers
            </Link>
            <Link href={appPath('/content/contact')} className="forge-text-link">
              Contact
            </Link>
            <Link href={appPath('/content/press')} className="forge-text-link">
              Press kit
            </Link>
          </div>
        </CorpCard>
      </CorpSection>
    </CorpPage>
  );
}
