import { Gamepad2, Sparkles } from 'lucide-react';

export default function PrototypeCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-950 p-5 text-white">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fuchsia-200">
          <Gamepad2 size={15} /> Games &amp; sims
        </span>
        <Sparkles size={18} className="text-fuchsia-300" aria-hidden="true" />
      </div>
      <h2 className="mt-8 text-2xl font-black">Tools for makers of interactive worlds.</h2>
      <p className="mt-2 text-sm leading-relaxed text-indigo-100">
        Hyperion builds software that optimizes work for developers, artists, and designers—starting with graph- and
        metrics-centric views of code, assets, and storyboards.
      </p>
      <div className="mt-6 flex gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Games</span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Simulations</span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">VGP</span>
      </div>
    </article>
  );
}
