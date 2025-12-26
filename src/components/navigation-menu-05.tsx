"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";

const navigationMenuItems = [
  { title: "Blog", href: "/blog" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
];

export default function NavigationMenuWithActiveItem() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add backdrop blur and border when scrolled
      setScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3"
          : "bg-transparent py-4",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex flex-col group">
          <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            Hugo Marinho Lapa
          </span>
          <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
            Platform Engineer
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {navigationMenuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
