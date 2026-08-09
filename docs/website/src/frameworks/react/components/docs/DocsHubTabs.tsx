import React, { useRef, useState } from 'react';
import { DOCS_HUB_TABS, type HubTab } from '../../../../constants/docsHub';

export interface DocsHubTabsProps {
  tabs?: HubTab[];
  /** Maps a site-relative `to` onto a real href (Docusaurus base URL, etc.). */
  resolveHref?: (to: string) => string;
  initialTabId?: string;
}

/**
 * Tabbed documentation hub: one panel per documentation surface, each with a
 * short thesis, three headline numbers, and its real entry points.
 *
 * Implements the WAI-ARIA tabs pattern with manual activation — arrow keys move
 * focus along the strip and Enter/Space (or a click) activates — so a keyboard
 * user can survey the tabs without loading each panel in turn.
 */
export function DocsHubTabs({ tabs = DOCS_HUB_TABS, resolveHref = (to) => to, initialTabId }: DocsHubTabsProps) {
  const [activeId, setActiveId] = useState(initialTabId ?? tabs[0]?.id ?? '');
  const stripRef = useRef<HTMLDivElement | null>(null);

  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + tabs.length) % tabs.length;
    const strip = stripRef.current;
    strip?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  if (!active) return null;

  return (
    <div className="hy-tabs" id="documentation-hub">
      <div className="hy-tabs__list" role="tablist" aria-label="Documentation surfaces" ref={stripRef}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`hy-tab-${tab.id}`}
            className="hy-tab"
            aria-selected={tab.id === active.id}
            aria-controls={`hy-panel-${tab.id}`}
            tabIndex={tab.id === active.id ? 0 : -1}
            onClick={() => setActiveId(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.nav}
          </button>
        ))}
      </div>

      <div
        className="hy-tabs__panel hy-panel"
        role="tabpanel"
        id={`hy-panel-${active.id}`}
        aria-labelledby={`hy-tab-${active.id}`}
        tabIndex={0}
        key={active.id}
      >
        <div>
          <p className="hy-eyebrow">{active.nav}</p>
          <h3>{active.title}</h3>
          <p>{active.lead}</p>
          <dl className="hy-stat-grid">
            {active.stats.map((stat) => (
              <div className="hy-stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="hy-link-list">
          {active.links.map((link) => (
            <li key={link.title}>
              <a href={resolveHref(link.to)}>
                <strong>{link.title}</strong>
                <span>{link.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DocsHubTabs;
