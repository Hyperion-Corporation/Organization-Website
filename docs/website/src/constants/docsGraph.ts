/**
 * The documentation corpus as a graph — the data half of the homepage's
 * zoomable knowledge map (components/docs/KnowledgeGraph.tsx).
 *
 * Coordinates are authored by hand in the SVG user space declared by
 * `DOCS_GRAPH_VIEWBOX` (no layout solver at runtime: the map is small,
 * stable, and a deterministic layout keeps the keyboard/reading order
 * meaningful). `to` values are site-relative and are resolved against the
 * Docusaurus base URL by the caller, so this module stays framework-neutral
 * and renders unchanged inside Storybook.
 */

/** Visual grouping — also the legend, and the only thing colour encodes. */
export enum DocsNodeKind {
  Core = 'core',
  Guide = 'guide',
  Roadmap = 'roadmap',
  Reference = 'reference',
  Research = 'research',
}

export interface DocsNode {
  id: string;
  label: string;
  kind: DocsNodeKind;
  /** One-line description shown in the detail panel when selected. */
  summary: string;
  /** Site-relative destination, resolved against the site base URL. */
  to: string;
  x: number;
  y: number;
  /** Node radius in SVG user units; the hub is deliberately larger. */
  r: number;
}

export interface DocsEdge {
  from: string;
  to: string;
}

export const DOCS_GRAPH_VIEWBOX = { width: 900, height: 520 } as const;

/** Accent per kind (matches Helios Forge --hy-* tokens in src/css/observatory.css). */
export const DOCS_NODE_COLORS: Record<DocsNodeKind, string> = {
  [DocsNodeKind.Core]: '#f59e0b',
  [DocsNodeKind.Guide]: '#14b8a6',
  [DocsNodeKind.Roadmap]: '#2563eb',
  [DocsNodeKind.Reference]: '#ea580c',
  [DocsNodeKind.Research]: '#fbbf24',
};

export const DOCS_GRAPH_NODES: DocsNode[] = [
  {
    id: 'home',
    label: 'Hyperion Docs',
    kind: DocsNodeKind.Core,
    summary:
      'The documentation dashboard: architecture, guides, generated API reference, and a live component library for the organization site.',
    to: '/docs/ARCHITECTURE',
    x: 450,
    y: 270,
    r: 26,
  },
  {
    id: 'architecture',
    label: 'Architecture',
    kind: DocsNodeKind.Core,
    summary:
      'How the static Next.js export, the framework islands, and the documentation tooling fit together.',
    to: '/docs/ARCHITECTURE',
    x: 311,
    y: 190,
    r: 16,
  },
  {
    id: 'roadmap',
    label: 'Master roadmap',
    kind: DocsNodeKind.Roadmap,
    summary:
      'Product-level index for the Hyperion site: phase gates R0–R8, workstreams, and the effort × impact matrix.',
    to: '/docs/moon/ROADMAP',
    x: 450,
    y: 110,
    r: 18,
  },
  {
    id: 'api',
    label: 'API reference',
    kind: DocsNodeKind.Reference,
    summary: "TypeDoc-generated reference for lib/'s exported functions, interfaces, and types.",
    to: '/docs/website/api-docs',
    x: 589,
    y: 190,
    r: 16,
  },
  {
    id: 'storybook',
    label: 'Storybook',
    kind: DocsNodeKind.Reference,
    summary:
      'Every UI and layout component from src/frameworks/react/components/, rendered live with hand-written prop tables and an a11y addon.',
    to: '/storybook/index.html',
    x: 589,
    y: 350,
    r: 16,
  },
  {
    id: 'changelog',
    label: 'Changelog',
    kind: DocsNodeKind.Core,
    summary: 'Keep-a-Changelog history for the organization site, from the Jekyll skeleton to today.',
    to: '/docs/moon/CHANGELOG',
    x: 450,
    y: 430,
    r: 16,
  },
  {
    id: 'guides',
    label: 'Guides',
    kind: DocsNodeKind.Guide,
    summary: 'The repository README, the contributing guide, and AGENTS.md — curated, not a full repo crawl.',
    to: '/guides',
    x: 311,
    y: 350,
    r: 16,
  },
  {
    id: 'adr',
    label: 'ADRs',
    kind: DocsNodeKind.Guide,
    summary:
      'Architecture Decision Records: renderer lifecycle, geospatial renderer, state ownership, and asset formats.',
    to: '/docs/adr/0001-record-architecture-decisions',
    x: 150,
    y: 215,
    r: 13,
  },
  {
    id: 'ui',
    label: 'Visual design',
    kind: DocsNodeKind.Roadmap,
    summary:
      'UI1–UI14: design tokens, ambient backdrop, motion language, command palette, and accessibility hardening.',
    to: '/docs/moon/roadmaps/user_interface',
    x: 175,
    y: 95,
    r: 13,
  },
  {
    id: 'interactive',
    label: 'Interactive graphics',
    kind: DocsNodeKind.Roadmap,
    summary:
      'IF1–IF13: capability-gated 3D, visualization primitives, model and panorama viewers, and the domain component catalogue.',
    to: '/docs/moon/roadmaps/interactive_features',
    x: 305,
    y: 45,
    r: 13,
  },
  {
    id: 'multiframework',
    label: 'Multi-framework',
    kind: DocsNodeKind.Roadmap,
    summary:
      'MFP1–MFP16: React host with Vue, Astro, and Aurelia islands over framework-neutral data contracts.',
    to: '/docs/moon/roadmaps/multi_framework_platform',
    x: 450,
    y: 30,
    r: 13,
  },
  {
    id: 'ml',
    label: 'Machine learning',
    kind: DocsNodeKind.Roadmap,
    summary: 'On-device inference, model cards, and recorded replays that never require a runtime backend.',
    to: '/docs/moon/roadmaps/machine_learning',
    x: 600,
    y: 45,
    r: 13,
  },
  {
    id: 'optimization',
    label: 'Optimization',
    kind: DocsNodeKind.Roadmap,
    summary: 'Mathematical optimization workstream: solvers, routing, and the WASM worker protocol.',
    to: '/docs/moon/roadmaps/mathematical_optimization',
    x: 740,
    y: 100,
    r: 13,
  },
  {
    id: 'simulations',
    label: 'Simulations',
    kind: DocsNodeKind.Roadmap,
    summary:
      'Framework-neutral simulations under src/simulations/ and the Aurelia island boundary that consumes them.',
    to: '/docs/moon/roadmaps/simulations_and_aurelia',
    x: 770,
    y: 255,
    r: 13,
  },
  {
    id: 'research',
    label: 'Product research',
    kind: DocsNodeKind.Research,
    summary: 'Visual Development Tool Roadmap & Tech Stack — the primary evidence base for the roadmap.',
    to: '/docs/moon/research/Visual Development Tool Roadmap & Tech Stack',
    x: 255,
    y: 470,
    r: 13,
  },
  {
    id: 'report',
    label: 'Market report',
    kind: DocsNodeKind.Research,
    summary: 'Game Dev Tools Market Research — the market half of the evidence base behind product framing.',
    to: '/docs/moon/reports/Game Dev Tools Market Research',
    x: 620,
    y: 470,
    r: 13,
  },
];

export const DOCS_GRAPH_EDGES: DocsEdge[] = [
  { from: 'home', to: 'architecture' },
  { from: 'home', to: 'roadmap' },
  { from: 'home', to: 'api' },
  { from: 'home', to: 'storybook' },
  { from: 'home', to: 'changelog' },
  { from: 'home', to: 'guides' },
  { from: 'architecture', to: 'adr' },
  { from: 'architecture', to: 'multiframework' },
  { from: 'architecture', to: 'guides' },
  { from: 'roadmap', to: 'ui' },
  { from: 'roadmap', to: 'interactive' },
  { from: 'roadmap', to: 'multiframework' },
  { from: 'roadmap', to: 'ml' },
  { from: 'roadmap', to: 'optimization' },
  { from: 'roadmap', to: 'simulations' },
  { from: 'roadmap', to: 'changelog' },
  { from: 'api', to: 'simulations' },
  { from: 'api', to: 'storybook' },
  { from: 'ui', to: 'interactive' },
  { from: 'ml', to: 'optimization' },
  { from: 'changelog', to: 'research' },
  { from: 'changelog', to: 'report' },
];
