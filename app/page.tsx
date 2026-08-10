import React from 'react';
import {
  ArrowRight,
  Network,
  Layers,
  Gamepad2,
  Cpu,
  PenTool,
  Calendar,
  Star,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import GlassCard from '../src/frameworks/react/components/ui/GlassCard';
import Badge from '../src/frameworks/react/components/ui/Badge';
import { BlogPost, Project } from '../src/interfaces/types';
import HeroModel from '../src/frameworks/react/components/models/HeroModel';
import ResearchConstellation from '../src/frameworks/react/components/graph/ResearchConstellation';
import ConvergenceSimulation from '../src/frameworks/react/components/routes/ConvergenceSimulation';
import LabShowcase from '../src/frameworks/react/components/home/LabShowcase';
import { appPath } from '../src/utils/paths';

/**
 * Product-site homepage composition (Helios Forge).
 * Intentionally not the github-pages personal stack:
 * hero → constellation → convergence → field-notes dump → posts list → projects.
 */

const PILLARS = [
  {
    icon: Network,
    title: 'Visual Graph Programming',
    body: 'See how modules, assets, and storyboards relate—then author new structure from that shared model.',
    href: appPath('/content/projects'),
    cta: 'Flagship direction',
  },
  {
    icon: Gamepad2,
    title: 'Games & simulations',
    body: 'Tools aimed at creative and technical teams shipping interactive worlds, not another personal portfolio grid.',
    href: appPath('/content/about'),
    cta: 'Domains we serve',
  },
  {
    icon: Cpu,
    title: 'Workflow optimization',
    body: 'Reduce friction between art, design, and engineering with structure, metrics, and clear relationships.',
    href: appPath('/content/tools'),
    cta: 'Tooling surface',
  },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'Notes_on_RL_an_Introduction',
    date: 'Coming soon',
    category: 'Product',
    title: 'Visual Graph Programming: mapping modules, assets, and storyboards',
    excerpt:
      'How Hyperion is building graph and metrics visualization so teams can see how code modules, assets, and narrative boards relate—and create new modules from that understanding.',
    tags: ['VGP', 'Visualization'],
  },
  {
    id: 'Attention_Learn_to_Solve_Routing_Problem',
    date: 'Coming soon',
    category: 'Engineering',
    title: 'Optimizing creative and engineering workflows',
    excerpt:
      'Our approach to reducing friction for developers, artists, and designers working on games, simulations, and other complex interactive systems.',
    tags: ['Tools', 'Workflows'],
  },
  {
    id: 'Combinatorial_Optimization_an_Introduction',
    date: 'Coming soon',
    category: 'Research',
    title: 'From static sites to interactive product surfaces',
    excerpt:
      'Why this organization site is a static Next.js export on GitHub Pages—and how interactive islands support demos without a heavy runtime.',
    tags: ['Web', 'Architecture'],
  },
];

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Visual Graph Programming',
    description:
      'In-progress platform that augments programmers and designers with graph and metrics visualization in 2D/3D. Explore how code modules, assets, and storyboards connect—and author new modules from that shared model.',
    links: [
      {
        label: 'GitHub Organization',
        url: 'https://github.com/Hyperion-Corporation',
        icon: <ExternalLink size={14} className="w-4 h-4 mr-1" />,
      },
    ],
    stats: 'Flagship',
    icon: undefined,
    iconColorClass: '',
  },
  {
    id: 'p2',
    title: 'Creative pipeline tooling',
    description:
      'Software aimed at games, simulations/simulators, and related computer work—helping teams keep technical systems and creative production in sync.',
    links: [
      {
        label: 'About Hyperion',
        url: appPath('/content/about'),
        icon: <Layers size={14} className="w-4 h-4 mr-1" />,
      },
    ],
    stats: 'Focus',
    icon: undefined,
    iconColorClass: '',
  },
  {
    id: 'p3',
    title: 'Organization Website',
    description:
      'This site: the public face of Hyperion Corporation on GitHub Pages. Built with Next.js, React, and Tailwind CSS as a fully static export.',
    links: [
      {
        label: 'Repository',
        url: 'https://github.com/Hyperion-Corporation/Organization-Website',
        icon: <ExternalLink size={14} className="w-4 h-4 mr-1" />,
      },
    ],
    stats: 'Next.js',
    icon: undefined,
    iconColorClass: '',
  },
];

export default function Home() {
  return (
    <div className="forge-home">
      {/* 1 · Full-bleed product hero (not personal observatory 2-col copy+model only) */}
      <section className="forge-hero" aria-labelledby="hero-title">
        <div className="forge-hero__glow" aria-hidden="true" />
        <div className="forge-hero__grid">
          <div className="forge-hero__copy">
            <Badge variant="default" className="bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
              <span className="status-pulse" aria-hidden="true" /> Building tools for makers
            </Badge>
            <p className="forge-kicker">Hyperion Corporation · Helios Forge</p>
            <h1 id="hero-title" className="forge-hero__title">
              Software that optimizes <span>human creative work.</span>
            </h1>
            <p className="forge-hero__summary">
              We build for <strong>developers, artists, and designers</strong> shipping{' '}
              <strong>games, simulations, and complex interactive systems</strong>—so teams can
              understand structure, metrics, and relationships with less friction.
            </p>
            <div className="forge-hero__actions">
              <a href={appPath('/content/projects')} className="forge-btn forge-btn--primary">
                Explore projects <ArrowRight size={18} aria-hidden />
              </a>
              <a href={appPath('/content/about')} className="forge-btn forge-btn--ghost">
                About Hyperion
              </a>
            </div>
            <ul className="forge-stat-rail" aria-label="Organization focus">
              <li>
                <span>Focus</span>
                <strong>Work tools</strong>
              </li>
              <li>
                <span>Domains</span>
                <strong>Games · Sims</strong>
              </li>
              <li>
                <span>Product</span>
                <strong>VGP</strong>
              </li>
            </ul>
          </div>
          <div className="forge-hero__stage">
            <HeroModel />
          </div>
        </div>
      </section>

      {/* 2 · Pillar cards — product org IA */}
      <section className="forge-section" aria-labelledby="pillars-title">
        <div className="forge-section-head">
          <p className="forge-kicker">What we build</p>
          <h2 id="pillars-title" className="forge-section-title">
            Three rails, one mission.
          </h2>
        </div>
        <div className="forge-pillars">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <a key={p.title} href={p.href} className="forge-pillar">
                <span className="forge-pillar__icon" aria-hidden>
                  <Icon size={22} />
                </span>
                <h3 className="forge-pillar__title">{p.title}</h3>
                <p className="forge-pillar__body">{p.body}</p>
                <span className="forge-pillar__cta">
                  {p.cta} <ArrowRight size={14} aria-hidden />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* 3 · Flagship band */}
      <section className="forge-flagship" aria-labelledby="flagship-title">
        <div className="forge-flagship__inner">
          <div>
            <p className="forge-kicker forge-kicker--on-dark">Flagship</p>
            <h2 id="flagship-title" className="forge-flagship__title">
              Visual Graph Programming
            </h2>
            <p className="forge-flagship__lead">
              Graph and metrics visualization for modules, assets, and storyboards—so creative and
              engineering teams share one structural model instead of siloed tools.
            </p>
            <a href={appPath('/content/projects')} className="forge-btn forge-btn--primary">
              View product direction <ArrowRight size={18} aria-hidden />
            </a>
          </div>
          <dl className="forge-flagship__facts">
            <div>
              <dt>Audience</dt>
              <dd>Devs · artists · designers</dd>
            </div>
            <div>
              <dt>Mode</dt>
              <dd>2D / 3D graphs</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>In progress</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 4 · System map (constellation) — supporting, not first after hero like portfolio */}
      <section className="forge-section forge-section--map" aria-label="Product system map">
        <ResearchConstellation />
      </section>

      {/* 5 · Convergence as proof panel inside a band */}
      <section className="forge-section" aria-label="Simulation proof">
        <div className="forge-section-head">
          <p className="forge-kicker">Explainable interaction</p>
          <h2 className="forge-section-title">Metrics and structure, not black boxes.</h2>
          <p className="forge-section-lead">
            Interactive demos stay progressive enhancements over clear product language.
          </p>
        </div>
        <ConvergenceSimulation />
      </section>

      {/* 6 · Tabbed lab (not personal field-notes grid) */}
      <div className="forge-section">
        <LabShowcase />
      </div>

      {/* 7 · Updates as card grid (not stacked full-width list) */}
      <section className="forge-section" aria-labelledby="updates-title">
        <div className="forge-section-head forge-section-head--row">
          <div>
            <p className="forge-kicker">
              <PenTool size={14} aria-hidden className="inline mr-1" /> Updates
            </p>
            <h2 id="updates-title" className="forge-section-title">
              Latest from Hyperion
            </h2>
          </div>
          <a href={appPath('/content/posts')} className="forge-text-link">
            View all <ArrowRight size={14} aria-hidden />
          </a>
        </div>
        <div className="forge-update-grid">
          {BLOG_POSTS.map((post) => (
            <GlassCard key={post.id} className="forge-update-card group">
              <div className="p-5 flex flex-col h-full">
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-slate-400 mb-3">
                  <Calendar size={12} aria-hidden />
                  {post.date}
                  <span className="text-amber-700 dark:text-amber-300 font-semibold">{post.category}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                  <a href={appPath(`/content/posts/${post.id}`)}>{post.title}</a>
                </h3>
                <p className="text-sm text-stone-600 dark:text-slate-400 mt-2 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 8 · Projects as horizontal feature strip */}
      <section className="forge-section" aria-labelledby="projects-title">
        <div className="forge-section-head forge-section-head--row">
          <div>
            <p className="forge-kicker">Portfolio</p>
            <h2 id="projects-title" className="forge-section-title">
              Featured projects
            </h2>
          </div>
          <a href={appPath('/content/projects')} className="forge-text-link">
            View all projects <ArrowRight size={14} aria-hidden />
          </a>
        </div>
        <div className="forge-project-rail">
          {PROJECTS.map((project) => (
            <article key={project.id} className="forge-project-card">
              <div className="forge-project-card__top">
                <h3 className="forge-project-card__title">{project.title}</h3>
                {project.stats && (
                  <span className="forge-project-card__badge">
                    <Star size={10} fill="currentColor" aria-hidden /> {project.stats}
                  </span>
                )}
              </div>
              <p className="forge-project-card__body">{project.description}</p>
              <div className="forge-project-card__links">
                {project.links?.map((link, idx) => (
                  <a key={idx} href={link.url} className="forge-text-link">
                    {link.icon} {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9 · Closing CTA band */}
      <section className="forge-cta" aria-labelledby="cta-title">
        <Sparkles className="forge-cta__icon" size={28} aria-hidden />
        <div>
          <h2 id="cta-title" className="forge-cta__title">
            Mission in one line
          </h2>
          <p className="forge-cta__body">
            Hyperion builds software that optimizes the human work of developers, artists, and
            designers—starting with graph- and metrics-centric tools for games, simulations, and
            related computer systems.
          </p>
        </div>
        <a href={appPath('/content/about')} className="forge-btn forge-btn--primary">
          Read about us <ArrowRight size={18} aria-hidden />
        </a>
      </section>
    </div>
  );
}
