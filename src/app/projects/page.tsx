import { getProjects } from "@/lib/markdown";
import ProjectCard from "@/components/ProjectCard";

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
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
