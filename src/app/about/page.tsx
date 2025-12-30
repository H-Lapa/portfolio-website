import { Metadata } from "next";
import GetInTouch from "@/components/GetInTouch";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">About</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Platform Engineer passionate about cloud infrastructure and DevOps.
        </p>
      </div>

      <div className="mb-12 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          I'm a Platform Engineer at Go Reply, specializing in cloud infrastructure and DevOps practices.
          I'm passionate about building scalable systems and automating complex workflows.
        </p>

        <p>
          Currently based in London, I work with technologies like Terraform, Kubernetes, and various cloud platforms
          to help teams deploy and manage their infrastructure more effectively.
        </p>

        <p>
          When I'm not working on infrastructure, I enjoy writing about platform engineering,
          sharing knowledge with the community, and exploring new technologies.
        </p>
      </div>

      <GetInTouch />

      <div className="space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Skills & Technologies</h2>
          <div className="relative overflow-hidden">
            <div className="flex gap-6 sm:gap-8 animate-scroll-loop">
              {[
                { name: "Python", slug: "python" },
                { name: "Go", slug: "go" },
                { name: "Terraform", slug: "terraform" },
                { name: "JavaScript", slug: "javascript" },
                { name: "React", slug: "react" },
                { name: "Node.js", slug: "nodedotjs" },
                { name: "GCP", slug: "googlecloud" },
                { name: "Git", slug: "git" },
                { name: "Redis", slug: "redis" },
                { name: "Python", slug: "python" },
                { name: "Go", slug: "go" },
                { name: "Terraform", slug: "terraform" },
                { name: "JavaScript", slug: "javascript" },
                { name: "React", slug: "react" },
                { name: "Node.js", slug: "nodedotjs" },
                { name: "GCP", slug: "googlecloud" },
                { name: "Git", slug: "git" },
                { name: "Redis", slug: "redis" },
              ].map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex flex-col items-center gap-2 min-w-[60px] sm:min-w-[80px] flex-shrink-0"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}/gray`}
                      alt={skill.name}
                      className="w-full h-full opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground text-center whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
