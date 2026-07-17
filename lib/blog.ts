import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "@/lib/utils";

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  author: {
    name: string;
    role: string;
  };
  readingTime: number;
}

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFile(filename: string): { meta: PostMeta; content: string } {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    meta: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      category: data.category,
      tags: data.tags ?? [],
      image: data.image,
      imageAlt: data.imageAlt ?? data.title,
      author: data.author,
      readingTime: Math.max(1, Math.round(words / 200)),
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parseFile(f).meta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostSource(slug: string) {
  const filename = `${slug}.mdx`;
  if (!fs.existsSync(path.join(BLOG_DIR, filename))) return null;
  return parseFile(filename);
}

export function getToc(content: string): TocEntry[] {
  const entries: TocEntry[] = [];
  // Strip fenced code blocks so # inside them doesn't register.
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  for (const match of withoutCode.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const text = match[2].replace(/[*_`]/g, "").trim();
    entries.push({
      id: slugify(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }
  return entries;
}

export function getRelatedPosts(slug: string, category: string, count = 3) {
  const all = getAllPosts().filter((p) => p.slug !== slug);
  const same = all.filter((p) => p.category === category);
  const rest = all.filter((p) => p.category !== category);
  return [...same, ...rest].slice(0, count);
}

export function getBlogCategories(): string[] {
  return [...new Set(getAllPosts().map((p) => p.category))].sort();
}
