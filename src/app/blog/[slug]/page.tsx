import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, formatDate } from "@/lib/blog";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16">
      <nav className="font-sans text-sm text-ink-soft">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-forest">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{post.title}</span>
      </nav>

      <p className="mt-6 font-sans text-sm font-medium uppercase tracking-wide text-wood">
        {post.tag}
      </p>
      <h1 className="mt-2 text-4xl">{post.title}</h1>
      <p className="mt-3 font-sans text-sm text-ink-soft">
        {formatDate(post.date)} · {post.readTime} citire
      </p>

      <div className="mt-8 aspect-[16/9] w-full rounded-2xl bg-wood-slats" />

      <div className="mt-8 flex flex-col gap-4 font-sans text-base text-ink-soft">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 border-t border-line pt-6">
        <Link href="/blog" className="font-sans text-sm font-medium text-forest hover:text-forest-secondary">
          ← Înapoi la blog
        </Link>
      </div>
    </article>
  );
}
