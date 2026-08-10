import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CorpPageProps {
  kicker: string;
  title: string;
  lead: string;
  children: React.ReactNode;
  /** Optional primary CTA under the lead */
  cta?: { href: string; label: string };
}

/**
 * Corporate interior page chrome — full-width forge mast + section rhythm.
 * Distinct from personal github-pages “hero image + centered H1 + GlassCard stack”.
 */
export function CorpPage({ kicker, title, lead, children, cta }: CorpPageProps) {
  return (
    <div className="corp-page">
      <header className="corp-page__mast">
        <p className="forge-kicker">{kicker}</p>
        <h1 className="corp-page__title">{title}</h1>
        <p className="corp-page__lead">{lead}</p>
        {cta && (
          <Link href={cta.href} className="forge-btn forge-btn--primary corp-page__cta">
            {cta.label} <ArrowRight size={16} aria-hidden />
          </Link>
        )}
      </header>
      <div className="corp-page__body">{children}</div>
    </div>
  );
}

interface CorpSectionProps {
  id?: string;
  kicker?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CorpSection({ id, kicker, title, children, className = '' }: CorpSectionProps) {
  return (
    <section id={id} className={`corp-section ${className}`.trim()}>
      <div className="corp-section__head">
        {kicker && <p className="forge-kicker">{kicker}</p>}
        <h2 className="corp-section__title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function CorpCard({
  children,
  className = '',
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div className={`corp-card ${accent ? 'corp-card--accent' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}
