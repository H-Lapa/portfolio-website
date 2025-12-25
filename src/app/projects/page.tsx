import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/markdown";
import { GithubIcon } from "lucide-react";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-12 mt-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Projects</h1>
        <p className="text-muted-foreground">
          A collection of infrastructure and platform engineering projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={`/projects/${project.slug}`}
            className="block group"
          >
            <div className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-card rounded-lg">
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20"
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
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded border border-border hover:border-primary"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
