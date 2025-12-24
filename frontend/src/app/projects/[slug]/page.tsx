import { getProject, getProjects } from "@/lib/markdown";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <article>
        {project.image && (
          <div className="relative h-80 w-full mb-8 mt-8 rounded-lg overflow-hidden">
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

        <header className="mb-8 mt-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {project.description}
          </p>
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
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
