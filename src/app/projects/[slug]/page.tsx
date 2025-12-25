import { getProject, getProjects } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Image from "next/image";
import { extractHeadings } from "@/lib/reading-time";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Breadcrumb from "@/components/Breadcrumb";
import MarkdownContent from "@/components/MarkdownContent";
import { GithubIcon } from "lucide-react";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const headings = extractHeadings(project.content);

  return (
    <>
      <ReadingProgressBar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: project.title },
          ]}
        />

        {project.image && (
          <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        <div className="flex gap-12">
          <article className="flex-1 min-w-0">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {project.date && (
                  <span className="text-sm font-mono text-muted-foreground/40">
                    {project.date}
                  </span>
                )}
                <span className="text-sm font-mono text-muted-foreground/40">
                  {project.readingTime} min read
                </span>
                {project.lastUpdated && (
                  <span className="text-sm font-mono text-muted-foreground/40">
                    Updated: {project.lastUpdated}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 bg-primary/10 text-primary rounded border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors px-4 py-2 bg-card border border-border hover:border-primary rounded-lg"
                  >
                    <GithubIcon className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
              </div>
            </header>

            <MarkdownContent content={project.content} />
          </article>

          <aside className="w-64 flex-shrink-0">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </>
  );
}
