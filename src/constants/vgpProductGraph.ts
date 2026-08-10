/**
 * Illustrative VGP graph for the Products page.
 * Direction + demo only — not a shipping product schema.
 */

export type VgpNodeKind = 'module' | 'asset' | 'board' | 'metric';

export interface VgpNode {
  id: string;
  label: string;
  kind: VgpNodeKind;
  summary: string;
  /** Percent positions in the demo viewBox */
  x: number;
  y: number;
}

export interface VgpEdge {
  source: string;
  target: string;
  label: string;
}

export const VGP_KIND_META: Record<
  VgpNodeKind,
  { label: string; hint: string; color: string }
> = {
  module: {
    label: 'Code module',
    hint: 'Systems, features, libraries',
    color: '#f59e0b',
  },
  asset: {
    label: 'Asset',
    hint: 'Meshes, textures, audio, prefabs',
    color: '#14b8a6',
  },
  board: {
    label: 'Storyboard / design',
    hint: 'Narrative beats, UI flows, levels',
    color: '#2563eb',
  },
  metric: {
    label: 'Metric',
    hint: 'Counts, costs, coverage on structure',
    color: '#ea580c',
  },
};

export const VGP_DEMO_NODES: VgpNode[] = [
  {
    id: 'player-controller',
    label: 'PlayerController',
    kind: 'module',
    summary: 'Gameplay code that owns input, locomotion, and state transitions.',
    x: 22,
    y: 42,
  },
  {
    id: 'inventory',
    label: 'InventorySystem',
    kind: 'module',
    summary: 'Feature module for items, equip slots, and save hooks.',
    x: 38,
    y: 68,
  },
  {
    id: 'char-mesh',
    label: 'Hero mesh',
    kind: 'asset',
    summary: 'Primary character mesh/rig consumed by the controller and cinematics.',
    x: 18,
    y: 18,
  },
  {
    id: 'ui-atlas',
    label: 'HUD atlas',
    kind: 'asset',
    summary: 'UI sprites and icons bound to inventory and status widgets.',
    x: 48,
    y: 22,
  },
  {
    id: 'act1-board',
    label: 'Act I board',
    kind: 'board',
    summary: 'Narrative / level beats that depend on player and inventory milestones.',
    x: 72,
    y: 28,
  },
  {
    id: 'combat-flow',
    label: 'Combat flow',
    kind: 'board',
    summary: 'Design board for encounters; links systems and presentation assets.',
    x: 82,
    y: 58,
  },
  {
    id: 'dep-depth',
    label: 'Dep. depth',
    kind: 'metric',
    summary: 'Illustrative metric: how deep this module sits in the dependency graph.',
    x: 58,
    y: 78,
  },
  {
    id: 'asset-refs',
    label: 'Asset refs',
    kind: 'metric',
    summary: 'Illustrative metric: how many production assets reference this system.',
    x: 68,
    y: 48,
  },
];

export const VGP_DEMO_EDGES: VgpEdge[] = [
  { source: 'player-controller', target: 'char-mesh', label: 'binds' },
  { source: 'player-controller', target: 'inventory', label: 'calls' },
  { source: 'inventory', target: 'ui-atlas', label: 'renders' },
  { source: 'act1-board', target: 'player-controller', label: 'requires' },
  { source: 'act1-board', target: 'inventory', label: 'gates' },
  { source: 'combat-flow', target: 'player-controller', label: 'uses' },
  { source: 'combat-flow', target: 'char-mesh', label: 'shows' },
  { source: 'dep-depth', target: 'inventory', label: 'measures' },
  { source: 'asset-refs', target: 'player-controller', label: 'measures' },
  { source: 'asset-refs', target: 'ui-atlas', label: 'counts' },
];
