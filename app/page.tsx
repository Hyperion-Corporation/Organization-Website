import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroModel from '../src/frameworks/react/components/models/HeroModel';
import VgpStructureDemo from '../src/frameworks/react/components/products/VgpStructureDemo';
import { appPath } from '../src/utils/paths';

/**
 * Marketing homepage — sparse product aesthetics (HydraDB / Cerebrium lessons):
 * one hero statement, one primary visual, one interactive, one CTA close.
 * Anti-pattern avoided: simultaneous lab dump + charts + tag clouds + metrics walls.
 */
export default function Home() {
  return (
    <div className="forge-home forge-home--cinematic">
      {/* Hero: one message + one visual */}
      <section className="cine-hero" aria-labelledby="hero-title">
        <div className="cine-hero__copy">
          <p className="cine-hero__eyebrow">Hyperion Corporation · early stage</p>
          <h1 id="hero-title" className="cine-hero__title">
            Structure tools for
            <br />
            <span>creative systems.</span>
          </h1>
          <p className="cine-hero__lead">
            We build software that helps developers, artists, and designers see how modules, assets,
            and storyboards connect—so teams ship games and simulations with less friction.
          </p>
          <div className="cine-hero__actions">
            <a href={appPath('/content/products')} className="forge-btn forge-btn--primary">
              See products <ArrowRight size={18} aria-hidden />
            </a>
            <a href={appPath('/content/about')} className="forge-btn forge-btn--ghost">
              About Hyperion
            </a>
          </div>
        </div>
        <div className="cine-hero__visual" aria-hidden={false}>
          <HeroModel />
        </div>
      </section>

      {/* Single focus strip — not a logo wall of fake partners */}
      <p className="cine-focus" role="note">
        Flagship direction: <strong>Visual Graph Programming</strong> — in development · demos are
        illustrative
      </p>

      {/* Three quiet pillars */}
      <section className="cine-pillars" aria-labelledby="pillars-title">
        <h2 id="pillars-title" className="sr-only">
          What we focus on
        </h2>
        <a href={appPath('/content/products')} className="cine-pillar">
          <span className="cine-pillar__k">01</span>
          <h3 className="cine-pillar__t">See structure</h3>
          <p className="cine-pillar__d">Modules, assets, and boards in one graph metaphor.</p>
        </a>
        <a href={appPath('/content/products')} className="cine-pillar">
          <span className="cine-pillar__k">02</span>
          <h3 className="cine-pillar__t">Measure on the graph</h3>
          <p className="cine-pillar__d">Metrics attached to things people edit—not free-floating noise.</p>
        </a>
        <a href={appPath('/content/about')} className="cine-pillar">
          <span className="cine-pillar__k">03</span>
          <h3 className="cine-pillar__t">Serve both crafts</h3>
          <p className="cine-pillar__d">Built for engineers and creative roles on the same production.</p>
        </a>
      </section>

      {/* One interactive only */}
      <section className="cine-demo" aria-labelledby="demo-title">
        <div className="cine-demo__head">
          <p className="forge-kicker">Interactive</p>
          <h2 id="demo-title" className="cine-demo__title">
            A taste of the VGP idea.
          </h2>
          <p className="cine-demo__lead">
            One prototype graph—not a page of competing widgets. Full product narrative lives on
            Products.
          </p>
        </div>
        <VgpStructureDemo />
        <div className="cine-demo__foot">
          <a href={appPath('/content/products')} className="forge-btn forge-btn--primary">
            Full products story <ArrowRight size={16} aria-hidden />
          </a>
        </div>
      </section>

      {/* Closing CTA — Cerebrium-style calm end */}
      <section className="cine-close" aria-labelledby="close-title">
        <h2 id="close-title" className="cine-close__title">
          Early. Honest. Building in public.
        </h2>
        <p className="cine-close__lead">
          Follow the GitHub organization for open work, or read how we think about the product
          direction.
        </p>
        <div className="cine-hero__actions">
          <a
            href="https://github.com/Hyperion-Corporation"
            className="forge-btn forge-btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub organization
          </a>
          <a href={appPath('/content/projects')} className="forge-btn forge-btn--ghost">
            Projects
          </a>
        </div>
      </section>
    </div>
  );
}
