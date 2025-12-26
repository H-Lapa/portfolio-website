"use client"

import Image from "next/image";
import { GithubIcon, FileText } from "lucide-react";
import type { Project } from "@/lib/markdown";

export default function ProjectCard({ project }: { project: Project }) {
  const handleCardClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleButtonClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleCardClick}
      className={`block group ${project.liveUrl ? 'cursor-pointer' : ''}`}
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
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <button
                    onClick={(e) => handleButtonClick(e, project.githubUrl!)}
                    className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded border border-border hover:border-primary z-10 relative"
                    title="View on GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </button>
                )}
                {project.blogPostSlug && (
                  <button
                    onClick={(e) => handleButtonClick(e, `/blog/${project.blogPostSlug}`)}
                    className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded border border-border hover:border-primary z-10 relative"
                    title="Read Blog Post"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
