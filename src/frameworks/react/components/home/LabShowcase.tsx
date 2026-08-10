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
  index: string;
  blurb: string;
  render: () => React.ReactNode;
};

const TABS: LabTab[] = [
  {
    id: 'structure',
    label: 'Structure',
    index: '01',
    blurb:
      'Graph and map views for modules, assets, and relationships—the VGP language in miniature.',
    render: () => (
      <div className="forge-workbench__canvas-grid">
        <StructureMap />
        <StructureCanvas />
      </div>
    ),
  },
  {
    id: 'creative',
    label: 'Creative',
    index: '02',
    blurb:
      'Audio, media, and prototype surfaces that speak to game and sim production pipelines.',
    render: () => (
      <div className="forge-workbench__canvas-grid">
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
    index: '03',
    blurb:
      'Capability-gated experiments (WebGPU, splats, XR, islands). Optional; not default product claims.',
    render: () => (
      <div className="forge-workbench__canvas-stack">
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
 * Workbench with vertical rail — not a personal field-notes 2-col grid or simple pill tabs.
 */
export default function LabShowcase() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section className="forge-workbench" aria-labelledby="lab-title">
      <div className="forge-workbench__mast">
        <p className="forge-kicker">Workbench</p>
        <h2 id="lab-title" className="forge-workbench__title">
          Capability bays
        </h2>
        <p className="forge-workbench__lede">
          Open a bay. Demos stay progressive enhancements over clear product language—grouped by
          intent, not scattered as curiosity tiles.
        </p>
      </div>

      <div className="forge-workbench__body">
        <div className="forge-workbench__rail" role="tablist" aria-label="Workbench bays" aria-orientation="vertical">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`lab-tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`lab-panel-${t.id}`}
              className={`forge-workbench__bay ${active === t.id ? 'is-active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span className="forge-workbench__bay-index">{t.index}</span>
              <span className="forge-workbench__bay-label">{t.label}</span>
            </button>
          ))}
        </div>

        <div
          id={`lab-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`lab-tab-${tab.id}`}
          className="forge-workbench__viewport"
        >
          <div className="forge-workbench__viewport-bar">
            <span className="forge-workbench__viewport-dot" aria-hidden />
            <span className="forge-workbench__viewport-name">{tab.label} bay</span>
          </div>
          <p className="forge-workbench__blurb">{tab.blurb}</p>
          {tab.render()}
        </div>
      </div>
    </section>
  );
}
