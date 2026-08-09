/**
 * Homepage bento model (rendered by
 * src/frameworks/react/components/docs/BentoCards.tsx).
 *
 * `icon` is a key into that component's icon map rather than an emoji: the
 * observatory identity uses line icons from lucide-react (the same family the
 * main site uses) so the cards read as product UI instead of chat decoration,
 * and this module stays free of JSX.
 */
export type NavCardIcon = 'docs' | 'guides' | 'api' | 'storybook';

export interface NavCard {
  icon: NavCardIcon;
  title: string;
  description: string;
  to: string;
}

export const HOME_NAV_CARDS: NavCard[] = [
  {
    icon: 'docs',
    title: 'Docs',
    description:
      'Architecture, ADRs, the roadmap/changelog, and every feature roadmap under docs/moon/roadmaps/.',
    to: '/docs/ARCHITECTURE',
  },
  {
    icon: 'guides',
    title: 'Guides',
    description:
      'The repository README, contributing guide, and AGENTS.md — curated, not a full repo crawl.',
    to: '/guides',
  },
  {
    icon: 'api',
    title: 'API Reference',
    description: "TypeDoc-generated reference for lib/'s exported functions and types.",
    to: '/docs/website/api-docs',
  },
  {
    icon: 'storybook',
    title: 'Storybook',
    description:
      'Every UI/layout component from src/frameworks/react/components/, rendered live with hand-written prop tables.',
    to: '/storybook/index.html',
  },
];
