import React from 'react';
import { Briefcase, Target, Heart, Building2, Network } from 'lucide-react';
import SectionHeading from '@/src/frameworks/react/components/ui/SectionHeading';
import GlassCard from '@/src/frameworks/react/components/ui/GlassCard';
import orgLogo from '@/assets/icons/Hyperion-Corp.png';

export default function AboutPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-8">
          <img
            src={orgLogo.src}
            alt="Hyperion Corporation logo"
            className="object-contain w-full h-full max-h-64"
          />
        </div>
      </div>

      <div className="space-y-2 text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white">About Hyperion</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Software that optimizes creative and engineering work
        </p>
      </div>

      <section id="mission" className="scroll-mt-20">
        <SectionHeading title="Mission" icon={<Target className="text-blue-500" />} />
        <GlassCard className="p-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            <strong>Hyperion Corporation</strong> exists to create software that optimizes the human work of{' '}
            <strong>developers, artists, and designers</strong>—especially for{' '}
            <strong>games, simulations and simulators</strong>, and other computer-related production.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Large interactive projects bury structure across code modules, assets, and narrative or design boards.
            We build tools that make those relationships visible, measurable, and authorable—so teams spend less time
            reconstructing context and more time building.
          </p>
        </GlassCard>
      </section>

      <section id="what-we-build" className="scroll-mt-20">
        <SectionHeading title="What we build" icon={<Network className="text-purple-500" />} />
        <GlassCard className="p-6 space-y-4">
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Visual Graph Programming (VGP)</strong> — an in-progress platform for graph and metrics
              visualization in 2D/3D, helping people understand how existing code modules, assets, and storyboards
              relate, and to create new code modules from that shared model.
            </li>
            <li>
              <strong>Workflow-oriented tooling</strong> — software that reduces cognitive load across technical and
              creative roles in games, sims, and adjacent domains.
            </li>
            <li>
              <strong>This organization website</strong> — a static Next.js site on GitHub Pages that presents our
              mission, products, and updates.
            </li>
          </ul>
        </GlassCard>
      </section>

      <section id="who-we-serve" className="scroll-mt-20">
        <SectionHeading title="Who we serve" icon={<Briefcase className="text-green-500" />} />
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Technical roles</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              <li>Programmers and technical directors navigating large codebases</li>
              <li>Engineers working on simulations and interactive systems</li>
              <li>Tooling teams integrating metrics and structure into daily workflows</li>
            </ul>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Creative roles</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              <li>Artists and designers connecting assets to systems and storyboards</li>
              <li>Narrative and content teams mapping boards to implementation</li>
              <li>Multidisciplinary game and sim production pipelines</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      <section id="values" className="scroll-mt-20">
        <SectionHeading title="Principles" icon={<Heart className="text-red-500" />} />
        <GlassCard className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3 dark:text-white">How we work</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                <li>Make structure visible before asking people to memorize it</li>
                <li>Prefer tools that respect both craft and engineering rigor</li>
                <li>Ship progressive, inspectable demos where they help understanding</li>
                <li>Keep deployment simple (static where it fits)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 dark:text-white">Domains</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Games',
                  'Simulations',
                  'Graph visualization',
                  'Metrics',
                  'Developer tools',
                  'Design tooling',
                  'Asset relationships',
                  'Storyboards',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <section id="presence" className="scroll-mt-20">
        <SectionHeading title="Presence" icon={<Building2 className="text-yellow-500" />} />
        <GlassCard className="p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Hyperion Corporation publishes open work under the{' '}
            <a
              href="https://github.com/Hyperion-Corporation"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Hyperion-Corporation
            </a>{' '}
            GitHub organization. This website is hosted on GitHub Pages from the{' '}
            <a
              href="https://github.com/Hyperion-Corporation/Organization-Website"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Organization-Website
            </a>{' '}
            repository.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
