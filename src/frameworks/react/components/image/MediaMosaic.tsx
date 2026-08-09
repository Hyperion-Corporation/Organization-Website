import knowledgeGraph from '@/assets/images/knowledge_graph.png';
import orgLogo from '@/assets/icons/Hyperion-Corp-small.png';

const media = [
  { src: knowledgeGraph.src, alt: 'Knowledge graph visualization', label: 'Graph structure' },
  { src: orgLogo.src, alt: 'Hyperion Corporation', label: 'Hyperion' },
  {
    src: knowledgeGraph.src,
    alt: 'Metrics and relationships in a knowledge graph',
    label: 'Metrics',
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
            className="group relative aspect-square overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
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
