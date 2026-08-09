import React from 'react';
import { Gamepad2, Film, BookOpen, Network } from 'lucide-react';
import SectionHeading from '@/src/frameworks/react/components/ui/SectionHeading';
import GlassCard from '@/src/frameworks/react/components/ui/GlassCard';
import pageImage from '@/assets/images/knowledge_graph.png';
import { appPath } from '@/src/utils/paths';

export default function MediaPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-6xl mx-auto pb-16">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-100 dark:bg-slate-800">
          <img
            src={pageImage.src}
            alt="Graph and systems visualization"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Media</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          References and domains that inform Hyperion&apos;s tools for games, simulations, and creative production.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section>
            <SectionHeading title="Product domains" icon={<Gamepad2 className="text-purple-500" />} />
            <GlassCard className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">Games &amp; interactive media</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Production pipelines that mix code modules, art assets, and narrative or design boards—the core
                  relationship graph VGP aims to make visible.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">Simulations &amp; simulators</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Complex scenario and systems code where structure and metrics reduce the cost of understanding and change.
                </p>
              </div>
            </GlassCard>
          </section>

          <section>
            <SectionHeading title="Ideas we draw on" icon={<BookOpen className="text-blue-500" />} />
            <GlassCard className="p-6">
              <ul className="list-disc list-inside mt-2 text-slate-600 dark:text-slate-400 space-y-2 text-sm">
                <li>Program dependency and module graphs</li>
                <li>Asset and content relationship models</li>
                <li>Storyboard / timeline linked to implementation</li>
                <li>Metrics that surface structure, not just raw telemetry</li>
              </ul>
            </GlassCard>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <SectionHeading title="Visual language" icon={<Film className="text-red-500" />} />
            <GlassCard className="p-6 space-y-4">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Hyperion product surfaces favor clear hierarchy, progressive detail, and interactive graph exploration—so
                developers, artists, and designers can share one model of the work.
              </p>
            </GlassCard>
          </section>

          <section>
            <SectionHeading title="Flagship direction" icon={<Network className="text-green-500" />} />
            <GlassCard className="p-6">
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">Visual Graph Programming</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                2D/3D graph and metrics visualization to understand how modules, assets, and storyboards relate—and to
                author new code modules from that shared understanding.
              </p>
              <a
                href={appPath("/content/projects")}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                See projects →
              </a>
            </GlassCard>
          </section>
        </div>
      </div>
    </div>
  );
}
