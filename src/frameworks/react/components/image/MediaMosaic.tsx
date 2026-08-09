import knowledgeGraph from '@/assets/images/knowledge_graph.png';
import orgLogo from '@/assets/icons/Hyperion-mark.png';

const media = [
  { src: knowledgeGraph.src, alt: 'Knowledge graph visualization', label: 'Graph structure', fit: 'cover' as const },
  { src: orgLogo.src, alt: 'Hyperion Corporation', label: 'Hyperion', fit: 'contain' as const },
  {
    src: knowledgeGraph.src,
    alt: 'Metrics and relationships in a knowledge graph',
    label: 'Metrics',
    fit: 'cover' as const,
  },
];

export default function MediaMosaic() {
  return (
    <section aria-labelledby="media-mosaic-title">
      <h2 id="media-mosaic-title" className="mb-4 font-bold text-slate-900 dark:text-white">
        Visual references
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {media.map((item, index) => (
          <figure
            key={`${item.label}-${index}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-slate-900/80 dark:bg-slate-800"
          >
            <img
              src={item.src}
              alt={item.alt}
              width={400}
              height={400}
              className={`h-full w-full transition duration-500 group-hover:scale-110 ${
                item.fit === 'contain' ? 'object-contain p-4' : 'object-cover'
              }`}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-2 text-[.65rem] font-bold text-white">
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
