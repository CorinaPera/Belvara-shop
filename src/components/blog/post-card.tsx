import Link from "next/link";
import { BlogPost, formatDate } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col overflow-hidden rounded-xl border border-line bg-white"
    >
      <div className="aspect-[16/9] bg-wood-slats" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood">
          {post.tag}
        </p>
        <h3 className="text-lg leading-snug">{post.title}</h3>
        <p className="font-sans text-sm text-ink-soft">{post.excerpt}</p>
        <p className="mt-auto pt-2 font-sans text-xs text-ink-soft">
          {formatDate(post.date)} · {post.readTime} citire
        </p>
      </div>
    </Link>
  );
}
