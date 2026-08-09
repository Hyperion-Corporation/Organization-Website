import React from 'react';
import { BookOpen, Compass, Braces, Palette } from 'lucide-react';
import type { NavCard, NavCardIcon } from '../../../../constants/navCards';
import { HOME_NAV_CARDS } from '../../../../constants/navCards';

const ICONS: Record<NavCardIcon, typeof BookOpen> = {
  docs: BookOpen,
  guides: Compass,
  api: Braces,
  storybook: Palette,
};

export interface BentoCardsProps {
  cards?: NavCard[];
  /** Maps a site-relative `to` onto a real href (Docusaurus base URL, etc.). */
  resolveHref?: (to: string) => string;
}

/**
 * Bento grid of the site's four documentation surfaces (UI5).
 *
 * Each card tracks the pointer and exposes its position as `--hy-mx`/`--hy-my`
 * so the CSS spotlight in observatory.css can follow the cursor. The effect is
 * purely decorative: the card is an ordinary link, works without JavaScript
 * having run, and the highlight also appears on `:focus-visible` for keyboard
 * users.
 */
export function BentoCards({ cards = HOME_NAV_CARDS, resolveHref = (to) => to }: BentoCardsProps) {
  function onPointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--hy-mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--hy-my', `${event.clientY - rect.top}px`);
  }

  return (
    <div className="hy-bento">
      {cards.map((card) => {
        const Icon = ICONS[card.icon] ?? BookOpen;
        return (
        <a key={card.title} className="hy-bento__card" href={resolveHref(card.to)} onPointerMove={onPointerMove}>
          <span className="hy-bento__icon" aria-hidden="true">
            <Icon size={19} strokeWidth={1.9} />
          </span>
          <h3 className="hy-bento__title">{card.title}</h3>
          <p className="hy-bento__desc">{card.description}</p>
          <span className="hy-bento__more">Open →</span>
        </a>
        );
      })}
    </div>
  );
}

export default BentoCards;
