import React, { useEffect, useRef } from 'react';
import { PHASE_STATUS_LABEL, ROADMAP_PHASES, type RoadmapPhase } from '../../../../constants/roadmapPhases';
import { useReducedMotion } from '../../../../hooks/useReducedMotion';

export interface RoadmapTimelineProps {
  phases?: RoadmapPhase[];
  /** Maps a site-relative `to` onto a real href (Docusaurus base URL, etc.). */
  resolveHref?: (to: string) => string;
}

/**
 * The R0–R8 phase gates from docs/moon/ROADMAP.md as a vertical timeline.
 *
 * Phases reveal as they scroll into view via `IntersectionObserver` — a
 * progressive enhancement layered on top of an ordinary list. Under
 * `prefers-reduced-motion: reduce` (and in any environment without the
 * observer) every phase is marked visible immediately, and the CSS drops the
 * transition, so the content is never gated behind an animation.
 */
export function RoadmapTimeline({ phases = ROADMAP_PHASES, resolveHref = (to) => to }: RoadmapTimelineProps) {
  const listRef = useRef<HTMLOListElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    const items = Array.from(list?.querySelectorAll<HTMLElement>('.hy-phase') ?? []);
    if (!list || !items.length) return;

    if (reducedMotion || typeof IntersectionObserver !== 'function') return;

    // Phases are visible by default; the hidden-then-reveal styling only
    // applies once this class is set, so a failure to observe (no JS, an
    // error above, a crawler) can never leave the roadmap blank.
    list.classList.add('is-armed');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      list.classList.remove('is-armed');
    };
  }, [phases, reducedMotion]);

  return (
    <ol className="hy-timeline" ref={listRef}>
      {phases.map((phase) => (
        <li className="hy-phase" data-status={phase.status} key={phase.id}>
          <div className="hy-phase__head">
            <span className="hy-phase__id">{phase.id}</span>
            <h3>{phase.title}</h3>
            <span className="hy-chip" data-status={phase.status}>
              {PHASE_STATUS_LABEL[phase.status]}
            </span>
          </div>
          <p>{phase.summary}</p>
          <a className="hy-bento__more" href={resolveHref(phase.to)}>
            Workstream →
          </a>
        </li>
      ))}
    </ol>
  );
}

export default RoadmapTimeline;
