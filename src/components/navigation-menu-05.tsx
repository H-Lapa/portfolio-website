"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navigationMenuItems = [
  { title: "Blog", href: "/blog" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
];

export default function NavigationMenuWithActiveItem() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add backdrop blur and border when scrolled
      setScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
        setMobileMenuOpen(false); // Close mobile menu when hiding navbar
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 origin-top",
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3"
            : "bg-transparent py-4",
          hidden ? "-translate-y-full scale-95 opacity-0 blur-sm" : "translate-y-0 scale-100 opacity-100 blur-0"
        )}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex flex-col group">
            <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Hugo Marinho Lapa
            </span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
              Platform Engineer
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-8">
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
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-lg"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={cn(
            "absolute top-20 left-0 right-0 px-4 transition-all duration-300",
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          )}
        >
          <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            {navigationMenuItems.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-6 py-4 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                  index !== navigationMenuItems.length - 1 && "border-b border-border"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
