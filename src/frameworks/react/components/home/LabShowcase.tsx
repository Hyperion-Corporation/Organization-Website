'use client';

import React, { useState } from 'react';
import StructureMap from '../maps/StructureMap';
import StructureCanvas from '../canvas/StructureCanvas';
import AudioSpectrum from '../audio/AudioSpectrum';
import PrototypeCard from '../games/PrototypeCard';
import ResearchShelf from '../books/ResearchShelf';
import MediaMosaic from '../image/MediaMosaic';
import MediaReel from '../video/MediaReel';
import { StarfieldWrapper } from '../../../astro/components/StarfieldWrapper';
import { AureliaWrapper } from '../../../aurelia/components/AureliaWrapper';
import { WebGPUExperiment } from '../canvas/WebGPUExperiment';
import { WebXRExperiment } from '../canvas/WebXRExperiment';
import { GaussianSplatGallery } from '../models/GaussianSplatGallery';

type LabTab = {
  id: string;
  label: string;
  blurb: string;
  render: () => React.ReactNode;
};

const TABS: LabTab[] = [
  {
    id: 'structure',
    label: 'Structure',
    blurb: 'Graph and map views for modules, assets, and relationships—the VGP language in miniature.',
    render: () => (
      <div className="forge-lab__panel-grid">
        <StructureMap />
        <StructureCanvas />
      </div>
    ),
  },
  {
    id: 'creative',
    label: 'Creative',
    blurb: 'Audio, media, and prototype surfaces that speak to game and sim production pipelines.',
    render: () => (
      <div className="forge-lab__panel-grid">
        <AudioSpectrum />
        <PrototypeCard />
        <ResearchShelf />
        <MediaMosaic />
      </div>
    ),
  },
  {
    id: 'frontier',
    label: 'Frontier',
    blurb: 'Capability-gated experiments (WebGPU, splats, XR, islands). Optional; not default product claims.',
    render: () => (
      <div className="forge-lab__panel-stack">
        <WebGPUExperiment />
        <GaussianSplatGallery />
        <WebXRExperiment />
        <StarfieldWrapper />
        <AureliaWrapper />
        <MediaReel />
      </div>
    ),
  },
];

/**
 * Tabbed lab — product-site composition instead of dumping every demo in a
 * personal-portfolio 2-column “field notes” grid.
 */
export default function LabShowcase() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section className="forge-lab" aria-labelledby="lab-title">
      <div className="forge-section-head">
        <p className="forge-kicker">Interactive lab</p>
        <h2 id="lab-title" className="forge-section-title">
          Surfaces that preview how Hyperion thinks about systems.
        </h2>
        <p className="forge-section-lead">
          Browse by theme. Each panel is a progressive-enhancement demo with a static story underneath—
          not a personal research dump.
        </p>
      </div>

      <div className="forge-lab__tabs" role="tablist" aria-label="Lab themes">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`lab-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`lab-panel-${t.id}`}
            className={`forge-lab__tab ${active === t.id ? 'is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        id={`lab-panel-${tab.id}`}
        role="tabpanel"
        aria-labelledby={`lab-tab-${tab.id}`}
        className="forge-lab__body"
      >
        <p className="forge-lab__blurb">{tab.blurb}</p>
        {tab.render()}
      </div>
    </section>
  );
}
