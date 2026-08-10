import React from 'react';
import { CorpPage, CorpSection, CorpCard } from '@/src/frameworks/react/components/ui/CorpPage';
import orgLogo from '@/assets/icons/Hyperion-Corp-small.png';
import mark from '@/assets/icons/Hyperion-mark.png';

export default function PressPage() {
  return (
    <CorpPage
      kicker="Media"
      title="Press kit"
      lead="Boilerplate, naming, and logo assets for Hyperion Corporation. Replaces a personal “media taste” page with organization-ready materials."
    >
      <CorpSection kicker="Boilerplate" title="About the company">
        <CorpCard>
          <p className="corp-prose">
            <strong>Hyperion Corporation</strong> builds software that optimizes the human work of developers,
            artists, and designers for games, simulations, and related interactive systems. Its flagship direction,{' '}
            <strong>Visual Graph Programming (VGP)</strong>, focuses on graph and metrics visualization of modules,
            assets, and storyboards so teams can understand and author structure together.
          </p>
        </CorpCard>
      </CorpSection>

      <CorpSection kicker="Assets" title="Logos">
        <div className="corp-split">
          <CorpCard>
            <p className="corp-card__title">Wordmark / lockup</p>
            <div className="corp-press-asset">
              <img src={orgLogo.src} alt="Hyperion Corporation lockup" width={280} height={120} />
            </div>
            <p className="corp-card__body">Use on light or dark fields with clear space around the mark.</p>
          </CorpCard>
          <CorpCard>
            <p className="corp-card__title">Icon mark</p>
            <div className="corp-press-asset corp-press-asset--mark">
              <img src={mark.src} alt="Hyperion mark" width={96} height={96} />
            </div>
            <p className="corp-card__body">Prefer for favicons, avatars, and dense UI chrome.</p>
          </CorpCard>
        </div>
      </CorpSection>

      <CorpSection kicker="Naming" title="How to refer to us">
        <CorpCard>
          <ul className="corp-list">
            <li>
              <strong>Full:</strong> Hyperion Corporation
            </li>
            <li>
              <strong>Short:</strong> Hyperion
            </li>
            <li>
              <strong>Product:</strong> Visual Graph Programming (VGP)
            </li>
            <li>
              <strong>Avoid:</strong> treating Hyperion as a personal brand or portfolio handle
            </li>
          </ul>
        </CorpCard>
      </CorpSection>
    </CorpPage>
  );
}
