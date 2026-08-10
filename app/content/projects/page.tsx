import React from 'react';
import Link from 'next/link';
import { Network, Code, Layers, Gamepad2, FileText } from 'lucide-react';
import SectionHeading from '@/src/frameworks/react/components/ui/SectionHeading';
import GlassCard from '@/src/frameworks/react/components/ui/GlassCard';
import Badge from '@/src/frameworks/react/components/ui/Badge';
import pageImage from '@/assets/icons/Hyperion-Corp-small.png';

const linkStyles =
  'inline-flex items-center text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors';

export default function ProjectsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto pb-16">
      <div className="flex justify-center mb-8">
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-slate-700/50 bg-slate-900 flex items-center justify-center p-6">
          <img
            src={pageImage.src}
            alt="Hyperion Corporation"
            width={960}
            height={411}
            className="object-contain w-full h-full max-h-48"
          />
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Projects</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Products and initiatives from Hyperion Corporation.
        </p>
      </div>

      <section>
        <SectionHeading title="Flagship" icon={<Network className="text-pink-500" />} />
        <div className="grid md:grid-cols-1 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Visual Graph Programming (VGP)
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              An in-progress solution to augment programmers and designers with graph and metrics visualization in
              2D/3D. Teams can understand how existing code modules, assets, and storyboards relate—and create new
              code modules from that shared model, with room for further extensions over time.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>Graph visualization</Badge>
              <Badge>Metrics</Badge>
              <Badge>Authoring</Badge>
              <Badge>Games &amp; sims</Badge>
            </div>
            <Link
              href="https://github.com/Hyperion-Corporation"
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyles}
            >
              <Code className="w-4 h-4 mr-1" /> Hyperion on GitHub
            </Link>
          </GlassCard>
        </div>
      </section>

      <section>
        <SectionHeading title="Platform & presence" icon={<Layers className="text-amber-500" />} />
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Organization Website</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              This site—Hyperion&apos;s public presence on GitHub Pages. Next.js static export, React, TypeScript,
              Tailwind.
            </p>
            <Link
              href="https://github.com/Hyperion-Corporation/Organization-Website"
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyles}
            >
              <Code className="w-4 h-4 mr-1" /> Repository
            </Link>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Creative work optimization</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Broader product direction: software that optimizes human work for developers, artists, and designers
              across games, simulations, and related computer systems.
            </p>
            <Link href="/content/about" className={linkStyles}>
              <FileText className="w-4 h-4 mr-1" /> About Hyperion
            </Link>
          </GlassCard>
        </div>
      </section>

      <section>
        <SectionHeading title="Target domains" icon={<Gamepad2 className="text-teal-500" />} />
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Games &amp; interactive media</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Keep code, art, and narrative systems coherent with shared graph models and metrics.
            </p>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Simulations &amp; simulators</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore structure and relationships in complex simulation codebases and scenario graphs.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
