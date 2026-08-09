import React from 'react';

export interface HeroMetric {
  label: string;
  value: string;
}

export interface HeroAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface DocsHeroProps {
  kicker: string;
  badge?: string;
  /** Plain leading half of the headline. */
  title: string;
  /** Trailing half, rendered in the brand gradient. */
  titleAccent?: string;
  summary: React.ReactNode;
  actions?: HeroAction[];
  metrics?: HeroMetric[];
  /** The live visual on the right of the hero (the knowledge map, normally). */
  stage?: React.ReactNode;
  stageLabel?: string;
}

/**
 * Editorial hero for the documentation dashboard (UI5): kicker, headline with
 * a gradient accent clause, summary, actions, headline metrics, and a framed
 * "stage" for the live visual.
 *
 * The stage is a slot rather than a hard-coded visual so the hero can be
 * rendered in Storybook (and in a static fallback) without dragging a canvas
 * or graph implementation along with it.
 */
export function DocsHero({
  kicker,
  badge,
  title,
  titleAccent,
  summary,
  actions = [],
  metrics = [],
  stage,
  stageLabel = 'Live · docs knowledge map',
}: DocsHeroProps) {
  return (
    <header className="hy-hero">
      <div className="hy-aurora" aria-hidden="true" />

      <div className="hy-hero__copy">
        {badge ? (
          <span className="hy-badge">
            <span className="hy-pulse" aria-hidden="true" />
            {badge}
          </span>
        ) : null}

        <p className="hy-eyebrow">{kicker}</p>

        <h1 className="hy-hero__title">
          {title} {titleAccent ? <span className="hy-gradient-text">{titleAccent}</span> : null}
        </h1>

        <p className="hy-hero__summary">{summary}</p>

        {actions.length ? (
          <div className="hy-hero__actions">
            {actions.map((action) => (
              <a
                key={action.label}
                className={`hy-action hy-action--${action.variant ?? 'secondary'}`}
                href={action.href}
              >
                {action.label}
              </a>
            ))}
          </div>
        ) : null}

        {metrics.length ? (
          <dl className="hy-metrics">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {stage ? (
        <div className="hy-stage">
          <div className="hy-stage__halo" aria-hidden="true" />
          <p className="hy-eyebrow hy-stage__label">{stageLabel}</p>
          {stage}
        </div>
      ) : null}
    </header>
  );
}

export default DocsHero;
