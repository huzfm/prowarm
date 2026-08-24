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

export interface Post extends PostMeta {
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
}

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

type ApiPost = {
  title: string;
  excerpt: string;
  coverImage: string;
  tags?: string[];
  category: string;
  readingTime: number;
  slug: string;
  publishedAt: string;
  content?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
};

type ApiListResponse = { items: ApiPost[] };

const API_BASE = process.env.PROWARM_BLOG_API_BASE_URL ?? "http://localhost:5050/api/public";

function toPost(post: ApiPost): Post {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt,
    category: post.category,
    tags: post.tags ?? [],
    image: post.coverImage,
    imageAlt: post.title,
    author: { name: post.author ?? "ProWarm India", role: "ProWarm India team" },
    readingTime: post.readingTime,
    content: post.content ?? "",
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    seoImage: post.seoImage,
    canonicalUrl: post.canonicalUrl,
    schemaMarkup: post.schemaMarkup,
  };
}

async function fetchBlog<T>(path: string): Promise<T | null> {
  const apiKey = process.env.PROWARM_BLOG_API_KEY;
  if (!apiKey) {
    console.warn("Blog API is not configured. Set PROWARM_BLOG_API_KEY in .env.local.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { "x-api-key": apiKey },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Blog API returned ${response.status}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error("Unable to fetch blog content.", error);
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const data = await fetchBlog<ApiListResponse>("/blogs?limit=50");
  return (data?.items ?? [])
    .map(toPost)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostSource(slug: string): Promise<Post | null> {
  const post = await fetchBlog<ApiPost>(`/blogs/${encodeURIComponent(slug)}`);
  return post ? toPost(post) : null;
}

export function getToc(content: string): TocEntry[] {
  const entries: TocEntry[] = [];
  if (content.trimStart().startsWith("<")) {
    for (const match of content.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
      const text = match[2].replace(/<[^>]+>/g, "").trim();
      entries.push({ id: slugify(text), text, level: Number(match[1]) as 2 | 3 });
    }
    return entries;
  }

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

export async function getRelatedPosts(slug: string, category: string, count = 3) {
  const all = (await getAllPosts()).filter((p) => p.slug !== slug);
  const same = all.filter((p) => p.category === category);
  const rest = all.filter((p) => p.category !== category);
  return [...same, ...rest].slice(0, count);
}

export function getBlogCategories(posts: PostMeta[]): string[] {
  return [...new Set(posts.map((p) => p.category))].sort();
}
