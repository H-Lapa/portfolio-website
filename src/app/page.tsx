import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, getProjects } from "@/lib/markdown";
import ProjectCard from "@/components/ProjectCard";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  const blogPosts = getBlogPosts().slice(0, 2); // Get latest 2 posts
  const projects = getProjects().filter(p => p.pinned); // Get only pinned projects
  return (
    <div className="justify-center max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

      <div className="flex flex-col items-center gap-4 sm:gap-6 mt-4 mb-12">
        <Image
          src="/profile-picture.jpg"
          alt="Picture of Hugos Face"
          width={200}
          height={200}
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-border shadow-lg"
        />
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Hugo Marinho Lapa</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Platform Engineer @ Go Reply</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            📍 London, UK
          </p>
        </div>
      </div>

      <GetInTouch />

      <div className="flex items-center justify-between mb-10 mt-16">
        <div className="flex items-center flex-1">
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 font-bold">
            Blog
          </h2>
          <div className="ml-4 h-px flex-grow bg-border opacity-20" />
        </div>
        <Link
          href="/blog"
          className="ml-4 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
        >
          View All
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="space-y-4 mb-16">
        {blogPosts.map((post, index) => (
          <Link
            key={index}
            href={`/blog/${post.slug}`}
            className="block"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between group p-4 -mx-4 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
              <h3 className="text-foreground group-hover:text-primary transition-colors font-medium">
                {post.title}
              </h3>
              <div className="flex items-center space-x-4 mt-2 md:mt-0">
                <span className="text-xs font-mono text-muted-foreground/30">
                  {post.category}
                </span>
                <span className="text-sm font-mono text-muted-foreground/20">
                  {post.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div id="projects" className="flex items-center justify-between mb-10">
        <div className="flex items-center flex-1">
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 font-bold">
            Pinned Projects
          </h2>
          <div className="ml-4 h-px flex-grow bg-border opacity-20" />
        </div>
        <Link
          href="/projects"
          className="ml-4 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
        >
          View All
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

    </div>
  );
}
