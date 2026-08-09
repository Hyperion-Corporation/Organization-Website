import type { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from './index.module.css';
import { HOME_NAV_CARDS } from '../constants/navCards';
import ResearchOrbitWrapperNext from '../frameworks/astro/components/ResearchOrbitWrapperNext';

const SITE_TITLE = 'Hyperion Docs';
const SITE_TAGLINE = 'Hyperion Corporation website — architecture, guides, and component reference';

// /storybook/index.html only exists after `npm run build-storybook` (copied
// in by Docusaurus's `postbuild` step) — neither `next dev` nor
// `docusaurus start` has it. Point at the live Storybook dev server instead
// while developing; `npm run storybook` serves it on :6006.
const STORYBOOK_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:6006' : '/storybook/index.html';

// /docs/* and /guides/* are rendered by Docusaurus's own content-docs
// plugin, not this Next.js preview — they don't exist as Next routes.
// Point at the live Docusaurus dev server instead while developing;
// `npm run start` serves it on :3100, under the baseUrl configured in
// docusaurus.config.ts (see package.json).
const DOCUSAURUS_DEV_URL = 'http://localhost:3100/Organization-Website/docs-site';

function resolveNavLink(to: string): string {
  if (to === '/storybook/index.html') {
    return STORYBOOK_URL;
  }
  if (process.env.NODE_ENV === 'development' && (to.startsWith('/docs') || to.startsWith('/guides'))) {
    return `${DOCUSAURUS_DEV_URL}${to}`;
  }
  return to;
}

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>{SITE_TITLE}</h1>
        <p className={styles.heroSubtitle}>{SITE_TAGLINE}</p>
        <div className={styles.buttons}>
          <Link className={styles.primaryButton} href={resolveNavLink('/docs/ARCHITECTURE')}>
            Read the Docs
          </Link>
          <Link className={styles.secondaryButton} href={resolveNavLink('/storybook/index.html')}>
            Open Storybook
          </Link>
        </div>
      </div>
    </header>
  );
}

function Cards() {
  return (
    <section className={styles.cardsSection}>
      <div className={styles.container}>
        <div className={styles.cardGrid}>
          {HOME_NAV_CARDS.map((card) => (
            <Link key={card.title} href={resolveNavLink(card.to)} className={styles.card}>
              <span className={styles.cardIcon} aria-hidden="true">
                {card.icon}
              </span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content="Documentation, guides, API reference, and a live component library for Hyperion Corporation's organization site." />
      </Head>
      <HomepageHeader />
      <main>
        <Cards />
        <div className={styles.container}>
          <ResearchOrbitWrapperNext />
        </div>
      </main>
    </>
  );
}
