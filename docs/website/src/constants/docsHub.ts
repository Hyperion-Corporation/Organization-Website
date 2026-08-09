/**
 * Content model for the homepage documentation hub — the tabbed section that
 * gives each documentation surface (docs, guides, API, component library,
 * research) its own panel with stats and entry points.
 *
 * Mirrors the structure of the roadmap workstreams so a reader can move from
 * "what is this site" to "where is the evidence" without leaving the page.
 */

export interface HubStat {
  label: string;
  value: string;
}

export interface HubLink {
  title: string;
  description: string;
  to: string;
}

export interface HubTab {
  id: string;
  /** Short label for the tab strip. */
  nav: string;
  icon: string;
  /** Panel heading. */
  title: string;
  lead: string;
  stats: HubStat[];
  links: HubLink[];
}

export const DOCS_HUB_TABS: HubTab[] = [
  {
    id: 'architecture',
    nav: 'Architecture',
    icon: '◈',
    title: 'One static export, many islands',
    lead:
      'The organization site ships as a fully static Next.js export on GitHub Pages. Every interactive surface is an island layered over meaningful HTML — never a requirement for reading the page.',
    stats: [
      { label: 'Runtime backend', value: 'None' },
      { label: 'Route JS budget', value: '≤200 kB' },
      { label: 'Island budget', value: '≤300 kB' },
    ],
    links: [
      {
        title: 'Architecture overview',
        description: 'Shell, routes, islands, and how the documentation tooling attaches to the repository.',
        to: '/docs/ARCHITECTURE',
      },
      {
        title: 'Architecture Decision Records',
        description: 'Renderer lifecycle, geospatial renderer, and state-ownership decisions with rationale.',
        to: '/docs/adr/0001-record-architecture-decisions',
      },
      {
        title: 'Multi-framework platform',
        description: 'MFP1–MFP16: React host, Astro/Aurelia islands, shared contracts, and the WASM path.',
        to: '/docs/moon/roadmaps/multi_framework_platform',
      },
    ],
  },
  {
    id: 'design',
    nav: 'Visual language',
    icon: '◐',
    title: 'Deep space, luminous data',
    lead:
      'Hyperion’s identity is a dark observatory surface, cyan/violet/pink data accents, editorial display type, and motion that never carries meaning on its own. Every effect has a budget and a reduced-motion path.',
    stats: [
      { label: 'LCP target', value: '≤2.5 s' },
      { label: 'INP target', value: '≤200 ms' },
      { label: 'CLS target', value: '≤0.1' },
    ],
    links: [
      {
        title: 'Visual design and UI roadmap',
        description: 'UI1–UI14: tokens, ambient backdrop, motion language, command palette, a11y hardening.',
        to: '/docs/moon/roadmaps/user_interface',
      },
      {
        title: 'Component library',
        description: 'Live Storybook for the site’s UI and layout components, with an accessibility addon.',
        to: '/storybook/index.html',
      },
      {
        title: 'Component catalogue',
        description: 'The domain component taxonomy: audio, canvas, graph, maps, models, routes, video.',
        to: '/docs/moon/component_catalogue',
      },
    ],
  },
  {
    id: 'interactive',
    nav: 'Interactive',
    icon: '◉',
    title: 'Structure you can manipulate',
    lead:
      'Graph, metrics, and spatial views make Visual Graph Programming tangible. Each one is keyboard reachable, announces selection, and ships an equivalent list or table — colour is never the only encoding.',
    stats: [
      { label: 'Quality tiers', value: '3' },
      { label: 'Deliverables', value: 'IF1–IF13' },
      { label: 'Initial 3D budget', value: '≤2 MB' },
    ],
    links: [
      {
        title: 'Interactive graphics roadmap',
        description: '3D hero, visualization primitives, constellation, model/panorama viewers, bounded effects.',
        to: '/docs/moon/roadmaps/interactive_features',
      },
      {
        title: 'Research-derived interactions',
        description: 'RR1–RR10: evidence-led packages from the product research and market report.',
        to: '/docs/moon/roadmaps/research_derived_interactions',
      },
      {
        title: 'Simulations and Aurelia',
        description: 'Framework-neutral simulation contracts and the island boundary that consumes them.',
        to: '/docs/moon/roadmaps/simulations_and_aurelia',
      },
    ],
  },
  {
    id: 'reference',
    nav: 'Reference',
    icon: '◇',
    title: 'Generated, not transcribed',
    lead:
      'The API reference is produced by TypeDoc from lib/ on every build, and the component reference is a real Storybook build served under /storybook — neither is hand-maintained prose that can drift.',
    stats: [
      { label: 'API source', value: 'TypeDoc' },
      { label: 'Components', value: 'Storybook' },
      { label: 'Regenerated', value: 'Per build' },
    ],
    links: [
      {
        title: 'API reference',
        description: 'Exported functions, interfaces, and types from the shared library.',
        to: '/docs/website/api-docs',
      },
      {
        title: 'Storybook',
        description: 'Component stories with hand-written prop tables and a11y checks.',
        to: '/storybook/index.html',
      },
      {
        title: 'Guides',
        description: 'README, contributing guide, and AGENTS.md — the working agreements for this repository.',
        to: '/guides',
      },
    ],
  },
  {
    id: 'evidence',
    nav: 'Evidence',
    icon: '◎',
    title: 'Claims trace back to research',
    lead:
      'Product framing is anchored to two primary documents, and roadmap IDs stay stable so completed work moves to the changelog without deleting the rationale that produced it.',
    stats: [
      { label: 'Workstreams', value: '9' },
      { label: 'Phase gates', value: 'R0–R8' },
      { label: 'Primary sources', value: '2' },
    ],
    links: [
      {
        title: 'Master roadmap',
        description: 'Vision, operating rules, phase gates, dependency register, and effort × impact matrix.',
        to: '/docs/moon/ROADMAP',
      },
      {
        title: 'Changelog',
        description: 'What actually shipped, in Keep-a-Changelog form, back to the first static skeleton.',
        to: '/docs/moon/CHANGELOG',
      },
      {
        title: 'Documentation roadmap',
        description: 'DOC1–DOC11: the quality bar every feature document and case study has to clear.',
        to: '/docs/moon/roadmaps/documentation',
      },
    ],
  },
];
