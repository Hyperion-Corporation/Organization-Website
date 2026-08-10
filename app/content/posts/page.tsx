import React from 'react';
import Link from 'next/link';
import { CorpPage, CorpSection } from '@/src/frameworks/react/components/ui/CorpPage';
import { appPath } from '@/src/utils/paths';

interface PostData {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
}

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

export default function NewsPage() {
  return (
    <CorpPage
      kicker="Newsroom"
      title="News & updates"
      lead="Organization announcements and product notes—formatted as a corporate dispatch list, not a personal blog index."
    >
      <CorpSection kicker="Latest" title="Dispatches">
        <ol className="corp-news">
          {POSTS_DATA.map((post, index) => (
            <li key={post.slug} className="corp-news__item">
              <div className="corp-news__num" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </div>
              <article className="corp-news__card">
                <div className="corp-news__meta">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="corp-news__cat">{post.category}</span>
                </div>
                <h3 className="corp-news__title">
                  <Link href={appPath(`/content/posts/${post.slug}`)}>{post.title}</Link>
                </h3>
                <p className="corp-news__excerpt">{post.excerpt}</p>
                <div className="corp-news__tags">
                  {post.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </CorpSection>
    </CorpPage>
  );
}
