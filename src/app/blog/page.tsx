import { PageHero } from "@/components/site/page-hero";
import { PostCard } from "@/components/blog/post-card";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Ghiduri și sfaturi practice despre saltele, materiale și îngrijirea produselor de somn."
      />

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
