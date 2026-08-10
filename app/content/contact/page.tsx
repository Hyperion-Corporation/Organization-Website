import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection, CorpCard } from '@/src/frameworks/react/components/ui/CorpPage';
import { appPath } from '@/src/utils/paths';

export default function ContactPage() {
  return (
    <CorpPage
      kicker="Reach us"
      title="Contact"
      lead="For product interest, research collaboration, press, or general inquiries—use the channels below. There is no form backend on this static site."
    >
      <CorpSection kicker="Channels" title="How to get in touch">
        <div className="corp-triad">
          <CorpCard accent>
            <h3 className="corp-card__title">GitHub Organization</h3>
            <p className="corp-card__body">
              Issues and discussions on public repositories are welcome for engineering topics.
            </p>
            <a
              href="https://github.com/Hyperion-Corporation"
              className="forge-text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hyperion-Corporation
            </a>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">This website</h3>
            <p className="corp-card__body">
              Site bugs and content corrections: open an issue on the Organization-Website repository.
            </p>
            <a
              href="https://github.com/Hyperion-Corporation/Organization-Website/issues"
              className="forge-text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open an issue
            </a>
          </CorpCard>
          <CorpCard>
            <h3 className="corp-card__title">Press &amp; partnership</h3>
            <p className="corp-card__body">
              Brand assets and boilerplate live in the press kit. Partnership inquiries can start as a GitHub
              Discussion or org-level contact once published.
            </p>
            <Link href={appPath('/content/press')} className="forge-text-link">
              Press kit
            </Link>
          </CorpCard>
        </div>
      </CorpSection>

      <CorpSection kicker="Note" title="Static export">
        <CorpCard>
          <p className="corp-prose">
            This marketing site does not collect form data server-side. Prefer GitHub for durable, public technical
            conversation.
          </p>
        </CorpCard>
      </CorpSection>
    </CorpPage>
  );
}
