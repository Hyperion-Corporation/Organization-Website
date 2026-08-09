'use client';

import { useState } from 'react';

/** Illustrative VGP-style structure map: modules, assets, and storyboard hubs. */
const nodes = [
  { id: 'core', label: 'Core modules', x: 50, y: 50 },
  { id: 'assets', label: 'Asset library', x: 28, y: 22 },
  { id: 'boards', label: 'Storyboards', x: 78, y: 35 },
  { id: 'tools', label: 'Tooling', x: 65, y: 78 },
];

export default function StructureMap() {
  const [selected, setSelected] = useState('core');
  const current = nodes.find((node) => node.id === selected) ?? nodes[0];

  return (
    <section
      className="rounded-2xl border border-emerald-400/20 bg-emerald-950/80 p-5 text-white"
      aria-labelledby="structure-map-title"
    >
      <h2 id="structure-map-title" className="text-xl font-bold">
        Structure map
      </h2>
      <p className="mt-1 text-sm text-emerald-100">
        Select a node to inspect how production systems connect—an early Visual Graph Programming metaphor.
      </p>
      <div className="relative mt-5 aspect-[1.7] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,#14532d,#052e16)]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M50 50 L28 22 M50 50 L78 35 M50 50 L65 78"
            fill="none"
            stroke="#6ee7b7"
            strokeDasharray="3 2"
            strokeWidth="1.5"
          />
        </svg>
        {nodes.map((node) => (
          <button
            type="button"
            key={node.id}
            onClick={() => setSelected(node.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[.65rem] font-bold ${
              selected === node.id ? 'bg-emerald-300 text-emerald-950' : 'bg-emerald-900 text-emerald-100'
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            aria-pressed={selected === node.id}
          >
            {node.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm" aria-live="polite">
        Selected: <strong>{current.label}</strong> · relationship view (illustrative)
      </p>
    </section>
  );
}
