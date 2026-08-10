import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection, CorpCard } from '@/src/frameworks/react/components/ui/CorpPage';
import { appPath } from '@/src/utils/paths';

export default function CareersPage() {
  return (
    <CorpPage
      kicker="People"
      title="Careers"
      lead="Hyperion is early. We hire for craft, systems thinking, and comfort working across engineering and creative production tools."
      cta={{ href: appPath('/content/contact'), label: 'Get in touch' }}
    >
      <CorpSection kicker="Openings" title="Current roles">
        <CorpCard className="corp-empty-role">
          <p className="corp-empty-role__label">No open requisitions right now</p>
          <p className="corp-prose">
            When roles open they will be listed here with scope, location model, and how to apply. Speculative
            interest can still land via{' '}
            <Link href={appPath('/content/contact')} className="corp-inline-link">
              Contact
            </Link>
            .
          </p>
        </CorpCard>
      </CorpSection>

      <CorpSection kicker="Culture" title="What we value">
        <div className="corp-triad">
          <CorpCard>
            <h3 className="corp-card__title">Structure over folklore</h3>
            <p className="corp-card__body">Prefer models and tools that make systems legible.</p>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">Cross-discipline empathy</h3>
            <p className="corp-card__body">Engineers, artists, and designers share the same graph of work.</p>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">Honest demos</h3>
            <p className="corp-card__body">Label prototypes clearly; measure before claiming product readiness.</p>
          </CorpCard>
        </div>
      </CorpSection>
    </CorpPage>
  );
}
