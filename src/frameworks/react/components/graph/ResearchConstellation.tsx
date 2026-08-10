'use client';

import { ArrowUpRight, Network } from 'lucide-react';
import { VISUAL_EXPERIENCE } from '../../../../configs/visualExperience';
import { RESEARCH_GRAPH } from '../../../../constants/researchGraph';
import type { ResearchDomain } from '../../../../interfaces/visualization';
import { getConnectedNodeIds, getNodeById, isEdgeConnected } from '../../../../utils/visualization';
import { useSelection } from '../../../../utils/visualization/useSelection';
import { useKeyboardRoving } from '../../../../utils/visualization/useKeyboardRoving';
import { A11ySummary } from '../visualization/A11ySummary';
import { A11yTable } from '../visualization/A11yTable';
import { Shape } from '../visualization/Shape';
import { DEFAULT_DOMAIN_PALETTE } from '../../../../utils/visualization/encodings';

const domainClasses: Record<ResearchDomain, string> = {
  core: 'forge-sysmap__chip--core',
  ai: 'forge-sysmap__chip--ai',
  optimization: 'forge-sysmap__chip--optimization',
  application: 'forge-sysmap__chip--application',
};

const LEGEND_ITEMS = [
  { key: 'core', label: 'Organization' },
  { key: 'ai', label: 'Visualization & tools' },
  { key: 'optimization', label: 'Authoring' },
  { key: 'application', label: 'Product domains' },
] as const;

/**
 * Product system map — map-first layout with overlay inspector.
 * Not the personal-site left-copy / right-bubble constellation panel.
 */
export default function ResearchConstellation() {
  const [selectedId, setSelectedId] = useSelection('hyperion', true);
  const containerRef = useKeyboardRoving<HTMLDivElement>('.forge-sysmap__chip');

  const selectedNode = selectedId ? getNodeById(RESEARCH_GRAPH.nodes, selectedId) : undefined;
  const connectedIds = selectedId
    ? getConnectedNodeIds(RESEARCH_GRAPH.edges, selectedId)
    : new Set<string>();
  const { width, height } = VISUAL_EXPERIENCE.constellationViewBox;

  return (
    <section className="forge-sysmap" aria-labelledby="constellation-title">
      <header className="forge-sysmap__header">
        <div>
          <p className="forge-kicker">
            <Network aria-hidden size={14} className="inline" /> System map
          </p>
          <h2 id="constellation-title" className="forge-sysmap__title">
            One product graph, many surfaces.
          </h2>
        </div>
        <p className="forge-sysmap__lede">
          Select a node on the field. Related edges light up; the inspector updates without leaving
          the map—built for product orientation, not a research portfolio wall.
        </p>
      </header>

      <div className="forge-sysmap__legend" role="list" aria-label="Domain legend">
        {LEGEND_ITEMS.map((item) => {
          const encoding = DEFAULT_DOMAIN_PALETTE[item.key];
          const active = selectedNode?.domain === item.key;
          return (
            <span
              key={item.key}
              role="listitem"
              className={`forge-sysmap__legend-item ${active ? 'is-active' : ''}`}
            >
              <Shape encoding={encoding} size={14} />
              {item.label}
            </span>
          );
        })}
      </div>

      <A11ySummary
        id="constellation-a11y-summary"
        summary="An interactive node-link diagram showing connections between Hyperion product domains."
        selectionAnnouncement={
          selectedNode
            ? `Selected: ${selectedNode.label}. ${selectedNode.description}`
            : 'No node selected.'
        }
      />

      <A11yTable
        id="constellation-a11y-table"
        caption="Product and domain nodes"
        data={RESEARCH_GRAPH.nodes}
        columns={[
          { key: 'label', header: 'Topic' },
          { key: 'domain', header: 'Domain' },
          { key: 'description', header: 'Description' },
        ]}
      />

      <div className="forge-sysmap__stage">
        <div
          className="forge-sysmap__field"
          aria-label="Interactive map of Hyperion product domains"
          ref={containerRef}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label="Connections between Hyperion product domains"
            className="forge-sysmap__edges"
          >
            <defs>
              <linearGradient id="forge-sysmap-line" x1="0" x2="1">
                <stop offset="0" stopColor="#f59e0b" />
                <stop offset="0.5" stopColor="#2563eb" />
                <stop offset="1" stopColor="#14b8a6" />
              </linearGradient>
              <radialGradient id="forge-sysmap-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="rgb(245 158 11 / 0.2)" />
                <stop offset="1" stopColor="transparent" />
              </radialGradient>
            </defs>
            <ellipse
              cx={width * 0.5}
              cy={height * 0.5}
              rx={width * 0.38}
              ry={height * 0.36}
              fill="url(#forge-sysmap-glow)"
            />
            {RESEARCH_GRAPH.edges.map((edge) => {
              const source = getNodeById(RESEARCH_GRAPH.nodes, edge.source);
              const target = getNodeById(RESEARCH_GRAPH.nodes, edge.target);
              if (!source || !target) return null;
              return (
                <line
                  key={`${edge.source}-${edge.target}`}
                  x1={(source.x * width) / 100}
                  y1={(source.y * height) / 100}
                  x2={(target.x * width) / 100}
                  y2={(target.y * height) / 100}
                  className={isEdgeConnected(edge, selectedId) ? 'is-active' : ''}
                />
              );
            })}
          </svg>

          {RESEARCH_GRAPH.nodes.map((node) => {
            const isRelated = selectedId === node.id || connectedIds.has(node.id);
            const encoding = DEFAULT_DOMAIN_PALETTE[node.domain];
            return (
              <button
                key={node.id}
                type="button"
                className={`forge-sysmap__chip ${domainClasses[node.domain]} ${
                  selectedId === node.id ? 'is-selected' : ''
                } ${selectedId && !isRelated ? 'is-muted' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                aria-pressed={selectedId === node.id}
                aria-label={`${node.label}: ${node.description}`}
                onClick={() => setSelectedId(node.id)}
              >
                <Shape encoding={encoding} size={14} />
                <span>{node.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <aside className="forge-sysmap__inspector" aria-live="polite">
          <p className="forge-sysmap__inspector-kicker">
            {selectedNode?.shortLabel ?? 'Explore'}
          </p>
          <p className="forge-sysmap__inspector-title">{selectedNode?.label ?? 'Select a node'}</p>
          <p className="forge-sysmap__inspector-body">
            {selectedNode?.description ??
              'Choose a domain on the field to see how it connects across Hyperion’s product graph.'}
          </p>
          {selectedNode?.href && (
            <a href={selectedNode.href} className="forge-sysmap__inspector-link">
              Open surface <ArrowUpRight size={15} aria-hidden />
            </a>
          )}
        </aside>
      </div>
    </section>
  );
}
