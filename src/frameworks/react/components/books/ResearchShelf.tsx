import { BookOpen, ExternalLink } from 'lucide-react';

const reading = [
  {
    title: 'Visual Graph Programming',
    kind: 'Product',
    note: 'Graph and metrics visualization for modules, assets, and storyboards.',
  },
  {
    title: 'Creative production systems',
    kind: 'Domain',
    note: 'How games and sims keep code, art, and narrative coherent.',
  },
  {
    title: 'Static export on GitHub Pages',
    kind: 'Platform',
    note: 'Organization site architecture: Next.js export, interactive islands.',
  },
];

export default function ResearchShelf() {
  return (
    <section aria-labelledby="research-shelf-title">
      <div className="mb-4 flex items-center gap-2 text-violet-500">
        <BookOpen size={18} />
        <h2 id="research-shelf-title" className="font-bold">
          Focus areas
        </h2>
      </div>
      <div className="grid gap-3">
        {reading.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/60"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[.65rem] font-bold uppercase tracking-widest text-violet-500">{item.kind}</p>
                <h3 className="mt-1 font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.note}</p>
              </div>
              <ExternalLink size={15} aria-hidden="true" className="shrink-0 text-slate-400" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
