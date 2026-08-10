import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import PostWrapper from '@/src/frameworks/react/PostWrapper';

// Define the type for the URL parameters
interface PostPageProps {
  params: {
    slug: string;
  };
}

// Map slugs to HTML under public/posts/ and display titles
const POSTS_HTML_MAP: Record<string, { file: string; title: string }> = {
  Attention_Learn_to_Solve_Routing_Problem: {
    file: 'Attention_Learn_to_Solve_Routing_Problem.html',
    title: 'Optimizing creative and engineering workflows',
  },
  Combinatorial_Optimization_an_Introduction: {
    file: 'Combinatorial_Optimization_an_Introduction.html',
    title: 'Organization site: static export on GitHub Pages',
  },
  Notes_on_RL_an_Introduction: {
    file: 'Notes_on_RL_an_Introduction.html',
    title: 'Visual Graph Programming: mapping modules, assets, and storyboards',
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS_HTML_MAP).map((slug) => ({
    slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = POSTS_HTML_MAP[slug];

  if (!post) {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'public', 'posts', post.file);

  let content = '';
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Extract only the content inside the <body> tags
    const bodyMatch = fileContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);

    // Strip MathJax loaders if present; PostWrapper may inject its own
    content = (bodyMatch ? bodyMatch[1] : fileContent)
      .replace(/<script src="https:\/\/polyfill.io\/v3\/polyfill.min.js\?features=es6"><\/script>/i, '')
      .replace(
        /<script id="MathJax-script" async src="https:\/\/cdn.jsdelivr.net\/npm\/mathjax@3\/es5\/tex-mml-chtml.js"><\/script>/i,
        ''
      );
  } catch (error) {
    console.error(`Error reading file ${post.file}:`, error);
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-6">
        <Link
          href="/content/posts"
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Updates
        </Link>
      </div>

      <PostWrapper content={content} title={post.title} />
    </div>
  );
}