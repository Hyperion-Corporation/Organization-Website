/**
 * Phase gates R0–R8 from docs/moon/ROADMAP.md, rendered as the homepage
 * timeline (components/docs/RoadmapTimeline.tsx). Kept as data so the
 * timeline stays a list first and a visual second.
 */

export type PhaseStatus = 'done' | 'active' | 'planned';

export interface RoadmapPhase {
  id: string;
  title: string;
  status: PhaseStatus;
  summary: string;
  /** Site-relative link to the workstream that carries the phase. */
  to: string;
}

export const PHASE_STATUS_LABEL: Record<PhaseStatus, string> = {
  done: 'Shipped',
  active: 'In progress',
  planned: 'Planned',
};

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'R0',
    title: 'Foundation',
    status: 'done',
    summary: 'Static Next.js export on GitHub Pages, Vitest/Cypress suites, and the benchmark harness.',
    to: '/docs/moon/roadmaps/infrastructure_and_testing',
  },
  {
    id: 'R1',
    title: 'Hyperion identity',
    status: 'done',
    summary:
      'Rebrand from the personal template to Hyperion Corporation: product copy, brand assets, metadata, and agent docs.',
    to: '/docs/moon/CHANGELOG',
  },
  {
    id: 'R2',
    title: 'Visual language',
    status: 'active',
    summary:
      'Semantic design tokens, the layered ambient backdrop, editorial hero composition, and a bounded motion language.',
    to: '/docs/moon/roadmaps/user_interface',
  },
  {
    id: 'R3',
    title: 'Explainable product graph',
    status: 'active',
    summary:
      'Structure and relationship views with keyboard traversal, textual equivalents, and deep-linkable selection.',
    to: '/docs/moon/roadmaps/interactive_features',
  },
  {
    id: 'R4',
    title: 'VGP storytelling',
    status: 'planned',
    summary: 'Modules, assets, and storyboards told as case studies with sticky metrics and architecture diagrams.',
    to: '/docs/moon/roadmaps/documentation',
  },
  {
    id: 'R5',
    title: 'Domain demos',
    status: 'planned',
    summary: 'Games, simulations, and tooling demos driven by the framework-neutral simulation contracts.',
    to: '/docs/moon/roadmaps/simulations_and_aurelia',
  },
  {
    id: 'R6',
    title: 'Spatial tier',
    status: 'planned',
    summary: 'glTF model viewer, 360° panoramas, and annotation overlays under an explicit asset budget.',
    to: '/docs/moon/roadmaps/interactive_features',
  },
  {
    id: 'R7',
    title: 'GPU frontier',
    status: 'planned',
    summary: 'WebGPU/TSL experiments, worker replay protocols, and optional WebXR behind consent.',
    to: '/docs/moon/roadmaps/machine_learning',
  },
  {
    id: 'R8',
    title: 'Polyglot islands',
    status: 'planned',
    summary: 'Vue 3 and Astro islands, a shared Apollo cache, and optional WASM workers on the static export.',
    to: '/docs/moon/roadmaps/multi_framework_platform',
  },
];
