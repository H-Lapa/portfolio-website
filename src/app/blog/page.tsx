import { getBlogPosts } from "@/lib/markdown";
import BlogSearch from "@/components/BlogSearch";

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-8 mt-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts on platform engineering, cloud infrastructure, and DevOps practices.
        </p>
      </div>

      <BlogSearch posts={blogPosts} />
    </div>
  );
}
