import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-[transform,box-shadow] duration-500 ease-(--ease-out-quart) hover:-translate-y-1.5 hover:shadow-card-hover motion-reduce:hover:translate-y-0"
      >
        <div className="relative aspect-3/2 overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-(--ease-out-quart) group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
          <Badge className="absolute top-4 left-4" variant="on-dark">
            {post.category}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl leading-snug text-charcoal-900 transition-colors group-hover:text-copper-600">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-charcoal-500">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-3 pt-5 text-xs text-charcoal-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
