import React from 'react';
import { PenTool, Calendar, ArrowRight } from 'lucide-react';
import GlassCard from '@/src/frameworks/react/components/ui/GlassCard';
import SectionHeading from '@/src/frameworks/react/components/ui/SectionHeading';
import Badge from '@/src/frameworks/react/components/ui/Badge';
import pageImage from '@/assets/icons/Hyperion-Corp-small.png';
import { appPath } from '@/src/utils/paths';

interface PostData {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
}

/** Organization updates; HTML bodies live under public/posts/. */
const POSTS_DATA: PostData[] = [
  {
    slug: 'Notes_on_RL_an_Introduction',
    title: 'Visual Graph Programming: mapping modules, assets, and storyboards',
    date: '2026-08-01',
    tags: ['VGP', 'Visualization'],
    category: 'Product',
    excerpt:
      'How Hyperion approaches graph and metrics visualization so teams can see relationships across code, assets, and narrative boards.',
  },
  {
    slug: 'Attention_Learn_to_Solve_Routing_Problem',
    title: 'Optimizing creative and engineering workflows',
    date: '2026-07-15',
    tags: ['Tools', 'Workflows'],
    category: 'Engineering',
    excerpt:
      'Reducing friction for developers, artists, and designers working on games, simulations, and related systems.',
  },
  {
    slug: 'Combinatorial_Optimization_an_Introduction',
    title: 'Organization site: static export on GitHub Pages',
    date: '2026-07-01',
    tags: ['Web', 'Architecture'],
    category: 'Infrastructure',
    excerpt:
      'Why this organization website is a fully static Next.js export—and how interactive islands support demos without a heavy runtime.',
  },
].sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

async function getAllPosts(): Promise<PostData[]> {
  return POSTS_DATA;
}

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 flex items-center justify-center p-6">
          <img
            src={pageImage.src}
            alt="Hyperion Corporation"
            width={640}
            height={360}
            className="object-contain w-full h-full max-h-40"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <SectionHeading title="Updates" icon={<PenTool className="text-purple-500" />} />
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <GlassCard key={post.slug} className="group hover:border-blue-500/30 transition-colors">
            <div className="p-6">
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {post.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">{post.category}</span>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <a
                  href={appPath(`/content/posts/${post.slug}`)}
                  className="hover:underline decoration-blue-500/30 underline-offset-4"
                >
                  {post.title}
                </a>
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
                  href={appPath(`/content/posts/${post.slug}`)}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Read more <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
