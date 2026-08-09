import React from 'react';
import { PenTool, Calendar, Star, Code, ArrowRight, Network, Layers, Sparkles } from 'lucide-react';
import GlassCard from '../src/frameworks/react/components/ui/GlassCard';
import SectionHeading from '../src/frameworks/react/components/ui/SectionHeading';
import Badge from '../src/frameworks/react/components/ui/Badge';
import { BlogPost, Project } from '../src/interfaces/types';
import HeroModel from '../src/frameworks/react/components/models/HeroModel';
import ResearchConstellation from '../src/frameworks/react/components/graph/ResearchConstellation';
import ConvergenceSimulation from '../src/frameworks/react/components/routes/ConvergenceSimulation';
import AudioSpectrum from '../src/frameworks/react/components/audio/AudioSpectrum';
import ResearchShelf from '../src/frameworks/react/components/books/ResearchShelf';
import StructureCanvas from '../src/frameworks/react/components/canvas/StructureCanvas';
import PrototypeCard from '../src/frameworks/react/components/games/PrototypeCard';
import MediaMosaic from '../src/frameworks/react/components/image/MediaMosaic';
import StructureMap from '../src/frameworks/react/components/maps/StructureMap';
import MediaReel from '../src/frameworks/react/components/video/MediaReel';
import { StarfieldWrapper } from '../src/frameworks/astro/components/StarfieldWrapper';
import { AureliaWrapper } from '../src/frameworks/aurelia/components/AureliaWrapper';
import { WebGPUExperiment } from '../src/frameworks/react/components/canvas/WebGPUExperiment';
import { WebXRExperiment } from '../src/frameworks/react/components/canvas/WebXRExperiment';
import { GaussianSplatGallery } from '../src/frameworks/react/components/models/GaussianSplatGallery';
import { appPath } from '../src/utils/paths';

/**
 * Featured updates — replace with Markdown-backed content as org publishing matures.
 */
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
        icon: <Code size={14} className="w-4 h-4 mr-1" />,
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
        url: appPath("/content/about"),
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
        icon: <Code size={14} className="w-4 h-4 mr-1" />,
      },
    ],
    stats: 'Next.js',
    icon: undefined,
    iconColorClass: '',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-observatory mb-20" aria-labelledby="hero-title">
        <div className="hero-observatory__copy">
          <Badge variant="default" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <span className="status-pulse" aria-hidden="true" /> Building tools for makers
          </Badge>
          <p className="hero-kicker">Hyperion Corporation</p>
          <h1 id="hero-title" className="hero-title">
            Software that optimizes <span>human creative work.</span>
          </h1>
          <p className="hero-summary">
            We create tools for <strong>developers, artists, and designers</strong> working on{' '}
            <strong>games, simulations, and related systems</strong>—so teams can understand structure, metrics, and relationships, and ship with less friction.
          </p>
          <div className="hero-actions">
            <a href={appPath("/content/projects")} className="hero-action hero-action--primary">
              Explore projects <ArrowRight size={18} />
            </a>
            <a href={appPath("/content/about")} className="hero-action hero-action--secondary">
              About Hyperion
            </a>
          </div>
          <dl className="hero-metrics" aria-label="Organization focus areas">
            <div>
              <dt>Focus</dt>
              <dd>Work tools</dd>
            </div>
            <div>
              <dt>Domains</dt>
              <dd>Games · Sims</dd>
            </div>
            <div>
              <dt>Product</dt>
              <dd>VGP</dd>
            </div>
          </dl>
        </div>
        <HeroModel />
      </section>

      <ResearchConstellation />

      <ConvergenceSimulation />

      <section className="mb-20" aria-labelledby="field-notes-title">
        <div className="mb-8">
          <p className="hero-kicker">Interactive surfaces</p>
          <h2 id="field-notes-title" className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            Experiments that preview how Hyperion thinks about systems.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <StructureMap />
          <StructureCanvas />
          <AudioSpectrum />
          <PrototypeCard />
          <ResearchShelf />
          <MediaMosaic />
          <div className="lg:col-span-2">
            <WebGPUExperiment />
          </div>
          <div className="lg:col-span-2">
            <GaussianSplatGallery />
          </div>
          <div className="lg:col-span-2">
            <WebXRExperiment />
          </div>
          <div className="lg:col-span-2">
            <StarfieldWrapper />
          </div>
          <div className="lg:col-span-2">
            <AureliaWrapper />
          </div>
          <div className="lg:col-span-2">
            <MediaReel />
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <SectionHeading title="Latest Updates" icon={<PenTool className="text-purple-500" />} />
          <a
            href={appPath("/content/posts")}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid gap-6">
          {BLOG_POSTS.map((post) => (
            <GlassCard key={post.id} className="group hover:border-blue-500/30 transition-colors">
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <a href={appPath(`/content/posts/${post.id}`)}>{post.title}</a>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={appPath(`/content/posts/${post.id}`)}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Read more <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Latest Projects Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <SectionHeading title="Featured Projects" icon={<Network className="text-blue-500" />} />
          <a
            href={appPath("/content/projects")}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View all projects <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <GlassCard key={project.id} className="h-full flex flex-col">
              <div className="p-6 flex-1">
                <h4 className="text-lg font-bold font-display flex items-center gap-3 text-slate-900 dark:text-white">
                  {project.title}
                  {project.stats && (
                    <span className="hidden sm:flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 rounded-full border border-yellow-200 dark:border-yellow-800">
                      <Star size={10} fill="currentColor" /> {project.stats}
                    </span>
                  )}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex items-center gap-4 text-sm mt-auto">
                  {project.links &&
                    project.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {link.icon} {link.label}
                      </a>
                    ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="text-blue-500 shrink-0 mt-1" size={22} />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Mission in one line</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Hyperion builds software that optimizes the human work of developers, artists, and designers—starting with graph- and metrics-centric tools for games, simulations, and related computer systems.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </>
  );
}
