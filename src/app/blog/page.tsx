import Link from "next/link";
import { getBlogPosts } from "@/lib/markdown";

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-12 mt-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts on platform engineering, cloud infrastructure, and DevOps practices.
        </p>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <Link
            key={index}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="p-6 -mx-6 rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-primary/60 bg-primary/10 px-2 py-1 rounded border border-primary/20">
                      {post.category}
                    </span>
                    <span className="text-sm font-mono text-muted-foreground/40">
                      {post.date}
                    </span>
                  </div>
                </div>
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform mt-2 md:mt-0">
                  →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
