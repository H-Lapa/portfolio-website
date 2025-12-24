import { getBlogPost, getBlogPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <article>
        <header className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-primary/60 bg-primary/10 px-2 py-1 rounded border border-primary/20">
              {post.category}
            </span>
            <span className="text-sm font-mono text-muted-foreground/40">
              {post.date}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {post.description}
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
  