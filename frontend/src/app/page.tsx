import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, getProjects } from "@/lib/markdown";

export default function Home() {
  const blogPosts = getBlogPosts().slice(0, 2); // Get latest 2 posts
  const projects = getProjects().slice(0, 4); // Get first 4 projects
  return (
    <div className="justify-center max-w-5xl mx-auto px-4 py-6">

      <div className="flex flex-col items-center gap-6 my-12">
        <Image
          src="/profile-picture.jpg"
          alt="Picture of Hugos Face"
          width={200}
          height={200}
          className="rounded-full border-4 border-border shadow-lg"
        />
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Hugo Marinho Lapa</h1>
          <p className="text-lg text-muted-foreground">Platform Engineer @ Go Reply</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            📍 London, UK
          </p>
        </div>
      </div>


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
          <Link
            key={index}
            href={`/projects/${project.slug}`}
            className="block"
          >
            <div className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-card rounded-lg">
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {project.description}
                  </p>
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>



    </div>
  );
}
