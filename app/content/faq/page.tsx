import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection } from '@/src/frameworks/react/components/ui/CorpPage';
import { appPath } from '@/src/utils/paths';

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What is Hyperion Corporation?',
    a: (
      <>
        An organization building software that optimizes creative and engineering work—especially for games,
        simulations, and related interactive systems. See{' '}
        <Link href={appPath('/content/about')} className="corp-inline-link">
          About
        </Link>
        .
      </>
    ),
  },
  {
    q: 'What is Visual Graph Programming (VGP)?',
    a: (
      <>
        Our flagship direction: graph and metrics visualization of modules, assets, and storyboards so teams can
        understand and author structure together. Details on the{' '}
        <Link href={appPath('/content/products')} className="corp-inline-link">
          Products
        </Link>{' '}
        page.
      </>
    ),
  },
  {
    q: 'Is this open source?',
    a: (
      <>
        Public repositories live under{' '}
        <a href="https://github.com/Hyperion-Corporation" className="corp-inline-link">
          github.com/Hyperion-Corporation
        </a>
        . Licensing varies by repository—check each project&apos;s LICENSE.
      </>
    ),
  },
  {
    q: 'How is this website deployed?',
    a: (
      <>
        Fully static Next.js export on GitHub Pages (project site base path). No required backend for the public
        marketing surface.
      </>
    ),
  },
  {
    q: 'Do you hire?',
    a: (
      <>
        When roles open we list them on{' '}
        <Link href={appPath('/content/careers')} className="corp-inline-link">
          Careers
        </Link>
        . Speculative interest can go through{' '}
        <Link href={appPath('/content/contact')} className="corp-inline-link">
          Contact
        </Link>
        .
      </>
    ),
  },
  {
    q: 'How is this different from a personal portfolio site?',
    a: (
      <>
        This is an organization product surface: mission, products, research notes, and corporate pages (FAQ,
        careers, press). Personal research portfolios use a different IA and visual language.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <CorpPage
      kicker="Support"
      title="Frequently asked questions"
      lead="Short answers about Hyperion, VGP, open work, and this site. For anything else, use Contact."
      cta={{ href: appPath('/content/contact'), label: 'Contact' }}
    >
      <CorpSection kicker="Answers" title="Common questions">
        <div className="corp-faq">
          {FAQS.map((item) => (
            <details key={item.q} className="corp-faq__item">
              <summary className="corp-faq__q">{item.q}</summary>
              <div className="corp-faq__a">{item.a}</div>
            </details>
          ))}
        </div>
      </CorpSection>
    </CorpPage>
  );
}
