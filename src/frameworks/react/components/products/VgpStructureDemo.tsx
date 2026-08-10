'use client';

import { useMemo, useState } from 'react';
import {
  VGP_DEMO_EDGES,
  VGP_DEMO_NODES,
  VGP_KIND_META,
  type VgpNode,
  type VgpNodeKind,
} from '../../../../constants/vgpProductGraph';

/**
 * Products-page demo: module · asset · storyboard · metric graph.
 * Illustrative only — direction + interactive metaphor, not a shipping product.
 */
export default function VgpStructureDemo() {
  const [selectedId, setSelectedId] = useState('player-controller');
  const [filter, setFilter] = useState<VgpNodeKind | 'all'>('all');

  const selected = useMemo(
    () => VGP_DEMO_NODES.find((n) => n.id === selectedId) ?? VGP_DEMO_NODES[0],
    [selectedId]
  );

  const relatedIds = useMemo(() => {
    const set = new Set<string>([selectedId]);
    VGP_DEMO_EDGES.forEach((e) => {
      if (e.source === selectedId) set.add(e.target);
      if (e.target === selectedId) set.add(e.source);
    });
    return set;
  }, [selectedId]);

  const visibleNodes = VGP_DEMO_NODES.filter(
    (n) => filter === 'all' || n.kind === filter
  );
  const visibleIds = new Set(visibleNodes.map((n) => n.id));

  const nodeById = (id: string): VgpNode | undefined =>
    VGP_DEMO_NODES.find((n) => n.id === id);

  return (
    <div className="vgp-demo">
      <div className="vgp-demo__banner" role="status">
        <span className="vgp-demo__badge">Prototype demo</span>
        <p>
          Illustrative structure graph for <strong>Visual Graph Programming</strong> direction—not an
          installable product. Keyboard: tab to nodes, Enter/Space to select.
        </p>
      </div>

      <div className="vgp-demo__filters" role="toolbar" aria-label="Filter by kind">
        <button
          type="button"
          className={`vgp-demo__filter ${filter === 'all' ? 'is-active' : ''}`}
          aria-pressed={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {(Object.keys(VGP_KIND_META) as VgpNodeKind[]).map((kind) => (
          <button
            key={kind}
            type="button"
            className={`vgp-demo__filter ${filter === kind ? 'is-active' : ''}`}
            aria-pressed={filter === kind}
            onClick={() => setFilter(kind)}
            style={{ ['--kind' as string]: VGP_KIND_META[kind].color }}
          >
            {VGP_KIND_META[kind].label}
          </button>
        ))}
      </div>

      <div className="vgp-demo__stage">
        <div className="vgp-demo__field" aria-label="Illustrative VGP structure graph">
          <svg className="vgp-demo__edges" viewBox="0 0 100 100" aria-hidden>
            <defs>
              <linearGradient id="vgp-edge-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#f59e0b" />
                <stop offset="0.5" stopColor="#2563eb" />
                <stop offset="1" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            {VGP_DEMO_EDGES.map((edge) => {
              const a = nodeById(edge.source);
              const b = nodeById(edge.target);
              if (!a || !b) return null;
              if (!visibleIds.has(a.id) || !visibleIds.has(b.id)) return null;
              const active =
                selectedId === edge.source || selectedId === edge.target;
              return (
                <g key={`${edge.source}-${edge.target}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={active ? 'is-active' : ''}
                  />
                  {active && (
                    <text
                      x={(a.x + b.x) / 2}
                      y={(a.y + b.y) / 2 - 2}
                      className="vgp-demo__edge-label"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {visibleNodes.map((node) => {
            const meta = VGP_KIND_META[node.kind];
            const isSelected = node.id === selectedId;
            const muted = !relatedIds.has(node.id) && selectedId !== node.id;
            return (
              <button
                key={node.id}
                type="button"
                className={`vgp-demo__node vgp-demo__node--${node.kind} ${
                  isSelected ? 'is-selected' : ''
                } ${muted ? 'is-muted' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%`, ['--kind' as string]: meta.color }}
                aria-pressed={isSelected}
                aria-label={`${node.label}, ${meta.label}. ${node.summary}`}
                onClick={() => setSelectedId(node.id)}
              >
                <span className="vgp-demo__node-kind">{meta.label}</span>
                <span className="vgp-demo__node-label">{node.label}</span>
              </button>
            );
          })}
        </div>

        <aside className="vgp-demo__inspector" aria-live="polite">
          <p className="vgp-demo__inspector-kind" style={{ color: VGP_KIND_META[selected.kind].color }}>
            {VGP_KIND_META[selected.kind].label}
          </p>
          <h3 className="vgp-demo__inspector-title">{selected.label}</h3>
          <p className="vgp-demo__inspector-body">{selected.summary}</p>
          <p className="vgp-demo__inspector-hint">{VGP_KIND_META[selected.kind].hint}</p>
          <ul className="vgp-demo__links">
            {VGP_DEMO_EDGES.filter(
              (e) => e.source === selected.id || e.target === selected.id
            ).map((e) => {
              const otherId = e.source === selected.id ? e.target : e.source;
              const other = nodeById(otherId);
              if (!other) return null;
              return (
                <li key={`${e.source}-${e.target}`}>
                  <button type="button" onClick={() => setSelectedId(other.id)}>
                    <span>{e.label}</span> → {other.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      <div className="vgp-demo__a11y">
        <h4 className="vgp-demo__a11y-title">Same graph as a list</h4>
        <ul>
          {VGP_DEMO_NODES.map((node) => (
            <li key={node.id}>
              <button type="button" onClick={() => setSelectedId(node.id)}>
                <strong>{node.label}</strong> ({VGP_KIND_META[node.kind].label}): {node.summary}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
