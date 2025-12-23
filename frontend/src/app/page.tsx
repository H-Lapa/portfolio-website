import Image from "next/image";
import { Card } from "@/components/ui/card"

export default function Home() {
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


      <div className="flex items-center mb-10 mt-16">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 font-bold">
          Blog
        </h2>
        <div className="ml-4 h-px flex-grow bg-border opacity-20" />
      </div>

      <div className="space-y-4 mb-16">
        {[
          { title: "Why we moved to a Service Mesh", category: "Infrastructure", date: "2024" },
          { title: "Terraform State Best Practices", category: "Guide", date: "2023" }
        ].map((post, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between group p-4 -mx-4 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
          >
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
        ))}
      </div>

      <div id="projects" className="flex items-center mb-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 font-bold">
          Pinned Projects
        </h2>
        <div className="ml-4 h-px flex-grow bg-border opacity-20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {[
          {
            title: "Automated Landing Zones",
            description: "Multi-account AWS environments with automated governance and compliance.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
            tags: ["Terraform", "AWS", "Python"]
          },
          {
            title: "GitOps Delivery Pipeline",
            description: "Standardized software delivery using ArgoCD and declarative configs.",
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop",
            tags: ["ArgoCD", "Kubernetes", "GitOps"]
          },
          {
            title: "Service Mesh Implementation",
            description: "Resilient microservices communication with Istio and observability.",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
            tags: ["Istio", "Prometheus", "Grafana"]
          },
          {
            title: "Kubernetes Platform",
            description: "Self-service developer platform with automated scaling and monitoring.",
            image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop",
            tags: ["Kubernetes", "Go", "Helm"]
          }
        ].map((project, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-border/50 bg-card"
          >
            <div className="relative h-64 overflow-hidden">
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
          </Card>
        ))}
      </div>



    </div>
  );
}
