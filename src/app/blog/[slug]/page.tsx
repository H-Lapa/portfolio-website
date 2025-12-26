import { getBlogPost, getBlogPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { extractHeadings } from "@/lib/reading-time";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Breadcrumb from "@/components/Breadcrumb";
import MarkdownContent from "@/components/MarkdownContent";
import { GithubIcon, ExternalLink } from "lucide-react";

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

  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgressBar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        <div className="flex gap-12">
          <article className="flex-1 min-w-0">
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {post.description}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono text-primary/60 bg-primary/10 px-2 py-1 rounded border border-primary/20">
                  {post.category}
                </span>
                <span className="text-sm font-mono text-muted-foreground/40">
                  {post.date}
                </span>
                <span className="text-sm font-mono text-muted-foreground/40">
                  {post.readingTime} min read
                </span>
                {post.lastUpdated && (
                  <span className="text-sm font-mono text-muted-foreground/40">
                    Updated: {post.lastUpdated}
                  </span>
                )}
              </div>

              {(post.liveUrl || post.githubUrl) && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {post.liveUrl && (
                    <a
                      href={post.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors px-4 py-2 bg-primary/10 border border-primary/20 hover:border-primary rounded-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  )}
                  {post.githubUrl && (
                    <a
                      href={post.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors px-4 py-2 bg-card border border-border hover:border-primary rounded-lg"
                    >
                      <GithubIcon className="w-4 h-4" />
                      View on GitHub
                    </a>
                  )}
                </div>
              )}
            </header>

            <MarkdownContent content={post.content} />
          </article>

          <aside className="w-64 flex-shrink-0">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </>
  );
}
