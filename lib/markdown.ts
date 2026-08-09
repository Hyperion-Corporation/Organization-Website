import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');
const pagesDirectory = path.join(process.cwd(), '_pages'); 

export interface PostData {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
  category: string;
  tags: string[];
}

/**
 * Returns a list of slugs (filenames without extension) for all valid posts.
 */
export function getAllPostSlugs(): { slug: string }[] {
  if (!fs.existsSync(postsDirectory)) {
    // console.error(`Post directory not found: ${postsDirectory}`);
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(fileName => 
      !fileName.startsWith('.') &&
      fileName.endsWith('.md') &&
      /^\d{4}-\d{2}-\d{2}-/.test(fileName)
    )
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      return { slug };
    });
}

/**
 * Returns a list of slugs for all static pages (e.g., 'about', 'media').
 */
export function getAllPageSlugs(): { slug: string }[] {
  if (!fs.existsSync(pagesDirectory)) {
    // console.error(`Pages directory not found: ${pagesDirectory}`);
    return [];
  }
  
  const fileNames = fs.readdirSync(pagesDirectory);
  
  return fileNames
    .filter(fileName => 
      !fileName.startsWith('.') &&
      fileName.endsWith('.md')
    )
    .map(fileName => {
      // Slug is the file name without extension
      const slug = fileName.replace(/\.md$/, '');
      return { slug };
    });
}


/**
 * Reads Markdown content from either _posts or _pages/ directory.
 */
export async function getMarkdownData(slug: string): Promise<PostData> {
  let directory: string;
  
  // Determine if it's a page or a post based on slug structure
  if (/^\d{4}-\d{2}-\d{2}-/.test(slug)) {
    directory = postsDirectory; // It's a blog post
  } else {
    directory = pagesDirectory; // It's a static page
  }
  
  const fullPath = path.join(directory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
      throw new Error(`Markdown file not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const data = matterResult.data;
  const dateString = data.date ? new Date(data.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  
  const defaultTitle = parseSlug(slug).name;
  
  return {
    slug,
    contentHtml,
    title: data.title as string || defaultTitle,
    date: dateString,
    category: data.category as string || 'Uncategorized',
    tags: Array.isArray(data.tags) ? data.tags as string[] : (data.tags ? [data.tags as string] : []),
  };
}

// Keeping parseSlug as a helper function for title fallback
export function parseSlug(slug: string): { date: string, name: string } {
  const parts = slug.split('-');
  const date = parts.slice(0, 3).join('-'); 
  const name = parts.slice(3).join(' ');
  if (parts.length < 4) {
    return { date: '', name: slug.charAt(0).toUpperCase() + slug.slice(1) };
  }
  return { date, name };
}