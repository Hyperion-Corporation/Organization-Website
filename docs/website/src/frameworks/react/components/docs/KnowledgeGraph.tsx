import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DOCS_GRAPH_EDGES,
  DOCS_GRAPH_NODES,
  DOCS_GRAPH_VIEWBOX,
  DOCS_NODE_COLORS,
  type DocsEdge,
  type DocsNode,
} from '../../../../constants/docsGraph';

export interface KnowledgeGraphProps {
  nodes?: DocsNode[];
  edges?: DocsEdge[];
  /** Maps a site-relative `to` onto a real href (Docusaurus base URL, etc.). */
  resolveHref?: (to: string) => string;
  /** Node selected on first render; defaults to the first node. */
  initialSelectedId?: string;
  /** Rendered above the map as its accessible name. */
  label?: string;
}

interface Transform {
  x: number;
  y: number;
  k: number;
}

const IDENTITY: Transform = { x: 0, y: 0, k: 1 };
/** SVG user units of breathing room around the authored layout. */
const PADDING = 64;
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 3;

function clampZoom(k: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, k));
}

const VIEW_WIDTH = DOCS_GRAPH_VIEWBOX.width + PADDING * 2;
const VIEW_HEIGHT = DOCS_GRAPH_VIEWBOX.height + PADDING * 2;

/**
 * Converts client coordinates to SVG user units, accounting for the
 * letterboxing that `preserveAspectRatio="xMidYMid meet"` introduces when the
 * surface and the viewBox have different aspect ratios. Without this, zooming
 * drifts away from the cursor and panning runs at the wrong speed.
 */
function clientToUser(rect: DOMRect, clientX: number, clientY: number) {
  const scale = Math.min(rect.width / VIEW_WIDTH, rect.height / VIEW_HEIGHT);
  const offsetX = (rect.width - VIEW_WIDTH * scale) / 2;
  const offsetY = (rect.height - VIEW_HEIGHT * scale) / 2;
  return {
    x: -PADDING + (clientX - rect.left - offsetX) / scale,
    y: -PADDING + (clientY - rect.top - offsetY) / scale,
    scale,
  };
}

/**
 * Zoomable, pannable map of the documentation corpus (docs/moon/roadmaps/
 * interactive_features.md, IF3–IF4).
 *
 * The visual layer is plain SVG — no renderer, no layout solver — so it works
 * on the static export at any quality tier. Interaction contract:
 *
 * - Pointer: drag to pan, wheel to zoom about the cursor, buttons for zoom/reset.
 * - Keyboard: every node is a focusable button; Enter/Space selects it, and the
 *   detail panel below is a live region describing the selection.
 * - Equivalence: the same nodes are always present as an ordinary list of
 *   links underneath, so nothing is reachable only through the canvas.
 * - Colour encodes node kind, but the kind is also written in the detail panel
 *   and the list, so colour is never the sole carrier of meaning.
 */
export function KnowledgeGraph({
  nodes = DOCS_GRAPH_NODES,
  edges = DOCS_GRAPH_EDGES,
  resolveHref = (to) => to,
  initialSelectedId,
  label = 'Documentation knowledge map',
}: KnowledgeGraphProps) {
  const [transform, setTransform] = useState<Transform>(IDENTITY);
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId ?? nodes[0]?.id ?? '');
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);

  const selected = useMemo(
    () => nodes.find((node) => node.id === selectedId) ?? nodes[0],
    [nodes, selectedId]
  );

  /** Ids directly connected to the selection (plus the selection itself). */
  const neighbourhood = useMemo(() => {
    const ids = new Set<string>([selected?.id ?? '']);
    for (const edge of edges) {
      if (edge.from === selected?.id) ids.add(edge.to);
      if (edge.to === selected?.id) ids.add(edge.from);
    }
    return ids;
  }, [edges, selected]);

  const byId = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);

  const zoomBy = useCallback((factor: number) => {
    setTransform((current) => {
      const k = clampZoom(current.k * factor);
      // Zoom about the centre of the viewport so the map does not wander.
      const cx = DOCS_GRAPH_VIEWBOX.width / 2;
      const cy = DOCS_GRAPH_VIEWBOX.height / 2;
      return {
        k,
        x: cx - ((cx - current.x) / current.k) * k,
        y: cy - ((cy - current.y) / current.k) * k,
      };
    });
  }, []);

  // React registers `onWheel` as a passive root listener, so `preventDefault()`
  // there cannot stop the page from scrolling — the zoom handler has to be a
  // non-passive native listener on the surface itself.
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      // Pointer position in SVG user units before the zoom.
      const { x: px, y: py } = clientToUser(surface!.getBoundingClientRect(), event.clientX, event.clientY);
      setTransform((current) => {
        const k = clampZoom(current.k * (event.deltaY < 0 ? 1.12 : 1 / 1.12));
        return {
          k,
          x: px - ((px - current.x) / current.k) * k,
          y: py - ((py - current.y) / current.k) * k,
        };
      });
    }

    surface.addEventListener('wheel', onWheel, { passive: false });
    return () => surface.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const surface = surfaceRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !surface) return;
    const { scale } = clientToUser(surface.getBoundingClientRect(), event.clientX, event.clientY);
    const dx = (event.clientX - drag.x) / scale;
    const dy = (event.clientY - drag.y) / scale;
    dragRef.current = { ...drag, x: event.clientX, y: event.clientY };
    setTransform((current) => ({ ...current, x: current.x + dx, y: current.y + dy }));
  }, []);

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  function onNodeKeyDown(event: React.KeyboardEvent<SVGGElement>, id: string) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setSelectedId(id);
  }

  return (
    <div className="hy-map">
      <div className="hy-stage hy-stage--map">
        <div className="hy-stage__halo" aria-hidden="true" />
        <div
          ref={surfaceRef}
          className="hy-graph"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
        {/* The viewBox is inset by PADDING so node labels at the extremes of
            the layout (and the controls/hint overlays) never clip. */}
        <svg
          viewBox={`${-PADDING} ${-PADDING} ${DOCS_GRAPH_VIEWBOX.width + PADDING * 2} ${
            DOCS_GRAPH_VIEWBOX.height + PADDING * 2
          }`}
          role="group"
          aria-label={label}
        >
          <defs>
            <linearGradient id="hy-edge-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>

          <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
            {edges.map((edge) => {
              const from = byId.get(edge.from);
              const to = byId.get(edge.to);
              if (!from || !to) return null;
              const active = edge.from === selected?.id || edge.to === selected?.id;
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  className={`hy-graph__edge${active ? ' is-active' : ''}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                />
              );
            })}

            {nodes.map((node) => {
              const isSelected = node.id === selected?.id;
              const muted = !neighbourhood.has(node.id);
              return (
                <g
                  key={node.id}
                  className={`hy-graph__node${isSelected ? ' is-selected' : ''}${muted ? ' is-muted' : ''}`}
                  style={{ color: DOCS_NODE_COLORS[node.kind] }}
                  transform={`translate(${node.x} ${node.y})`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${node.label} — ${node.kind}`}
                  onClick={() => setSelectedId(node.id)}
                  onKeyDown={(event) => onNodeKeyDown(event, node.id)}
                >
                  <circle className="hy-graph__node-ring" r={node.r} />
                  <circle className="hy-graph__node-dot" r={node.r / 3.2} />
                  <text className="hy-graph__node-label" y={node.r + 15}>
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <p className="hy-graph__hint">Drag to pan · scroll to zoom · tab to a node</p>

        <div className="hy-stage__controls">
          <button type="button" className="hy-icon-button" onClick={() => zoomBy(1.25)} aria-label="Zoom in">
            +
          </button>
          <button type="button" className="hy-icon-button" onClick={() => zoomBy(1 / 1.25)} aria-label="Zoom out">
            −
          </button>
          <button
            type="button"
            className="hy-icon-button"
            onClick={() => setTransform(IDENTITY)}
            aria-label="Reset view"
          >
            ⟳
          </button>
        </div>
        </div>
      </div>

      {selected ? (
        <div className="hy-graph-detail" aria-live="polite">
          <span className="hy-graph-detail__kind">{selected.kind}</span>
          <h3>{selected.label}</h3>
          <p>{selected.summary}</p>
          <a href={resolveHref(selected.to)}>Open {selected.label} →</a>
        </div>
      ) : null}

      <ul className="hy-node-list">
        {nodes.map((node) => (
          <li key={node.id}>
            <a href={resolveHref(node.to)}>
              <span data-kind={node.kind} style={{ color: DOCS_NODE_COLORS[node.kind] }} aria-hidden="true" />
              {node.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KnowledgeGraph;
