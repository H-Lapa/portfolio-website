import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail
} from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hugo-lapa/",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/H-Lapa",
    icon: <Github className="w-5 h-5" />,
  },
  {
    name: "Email",
    href: "mailto:hugolapa888@gmail.com",
    icon: <Mail className="w-5 h-5" />,
  },
];

export default function GetInTouch() {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-4 flex-wrap">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 font-bold">
          Get in touch
        </h2>
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={link.name}
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </section>
  );
}
