'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ExternalLink } from 'lucide-react';
import SectionHeading from '@/src/frameworks/react/components/ui/SectionHeading';
import GlassCard from '@/src/frameworks/react/components/ui/GlassCard';
import pageImage from '@/assets/icons/Hyperion-Corp-small.png';

const OTHER_ITEMS = [
  {
    id: 'math-curriculum',
    title: 'Mathematics Curriculum',
    category: 'Education',
    description: 'Interactive curriculum explorer for structured learning paths.',
  },
];

export default function OtherIndexPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 flex items-center justify-center p-8">
          <img
            src={pageImage.src}
            alt="Hyperion Corporation"
            width={720}
            height={400}
            className="object-contain w-full h-full max-h-40"
          />
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Other Resources</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Supplementary explorers and experiments that do not fit the main product sections.
        </p>
      </div>

      <section>
        <SectionHeading title="Available resources" icon={<FileText className="text-amber-500" />} />
        <div className="grid md:grid-cols-2 gap-6">
          {OTHER_ITEMS.map((item) => (
            <Link key={item.id} href={`/content/other/${item.id}`} className="group">
              <GlassCard className="p-6 h-full hover:border-amber-500/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-amber-500 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <ExternalLink size={18} className="text-slate-400 group-hover:text-amber-500" />
                </div>
                <p className="text-sm text-slate-500 mt-4">{item.description}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
