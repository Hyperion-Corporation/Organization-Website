import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection, CorpCard } from '@/src/frameworks/react/components/ui/CorpPage';
import { appPath } from '@/src/utils/paths';

/**
 * Research library. HTML under public/reports/ is retained reference material
 * while product-facing VGP reports are authored.
 */
const REPORTS = [
  { id: 'anime-gen', title: 'Anime Generation Model', category: 'Generative systems' },
  { id: 'gen-arch', title: 'Generative Architecture', category: 'Architecture' },
  { id: 'local-ai', title: 'Local AI Coding', category: 'Developer tools' },
  { id: 'semantic', title: 'Semantic Search', category: 'Search & retrieval' },
  { id: 'strategic', title: 'Strategic Generative Pipeline', category: 'Strategy' },
  { id: 'timeseries', title: 'Time Series Forecasting', category: 'Analytics' },
  { id: 'vrp', title: 'Vehicle Routing Problem', category: 'Optimization' },
  { id: 'pcvrp', title: 'Periodic Capacitated Vehicle Routing', category: 'Optimization' },
  { id: 'audio-signal-proc', title: 'Audio Signal Processing', category: 'Signal processing' },
  { id: 'waste-logistics-architecture', title: 'Waste Logistics Architecture', category: 'Systems' },
];

export default function ResearchLibraryPage() {
  return (
    <CorpPage
      kicker="Research"
      title="Research library"
      lead="Longer-form technical write-ups. Entries below are a reference library while Hyperion authors product research for Visual Graph Programming and related tooling."
    >
      <CorpSection kicker="Catalog" title="Reports">
        <div className="corp-report-grid">
          {REPORTS.map((report) => (
            <Link
              key={report.id}
              href={appPath(`/content/reports/${report.id}`)}
              className="corp-report-card"
            >
              <span className="corp-report-card__cat">{report.category}</span>
              <h3 className="corp-report-card__title">{report.title}</h3>
              <span className="corp-report-card__cta">Open report</span>
            </Link>
          ))}
        </div>
      </CorpSection>

      <CorpSection kicker="Note" title="Provenance">
        <CorpCard>
          <p className="corp-prose">
            Some HTML reports predate Hyperion product framing and remain available for technical
            reference. They are not presented as Hyperion product metrics without attribution.
          </p>
        </CorpCard>
      </CorpSection>
    </CorpPage>
  );
}
