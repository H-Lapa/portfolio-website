import { getProjects } from "@/lib/markdown";
import ProjectCard from "@/components/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Projects</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          A collection of infrastructure and platform engineering projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
