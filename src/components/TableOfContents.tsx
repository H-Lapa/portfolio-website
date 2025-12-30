'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu when clicking a link
    document.getElementById(headingId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      {/* Mobile TOC - Collapsible */}
      <div className="xl:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <span className="text-sm font-semibold text-foreground">
            Table of Contents
          </span>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] mt-2" : "max-h-0"
          )}
        >
          <div className="px-4 py-3 bg-card border border-border rounded-lg">
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleLinkClick(e, heading.id)}
                    style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                    className={cn(
                      "block py-1.5 transition-all hover:text-foreground",
                      activeId === heading.id
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop TOC - Sticky Sidebar */}
      <nav className="sticky top-24 hidden xl:block">
        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 font-bold mb-4">
            Contents
          </h4>
        </div>
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
          <ul className="space-y-2 text-sm border-l border-border/40">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`border-l-2 -ml-px transition-all ${
                activeId === heading.id
                  ? 'border-primary'
                  : 'border-transparent'
              }`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleLinkClick(e, heading.id)}
                style={{ paddingLeft: `${(heading.level - 1) * 0.75 + 1}rem` }}
                className={`block py-1 transition-all hover:text-foreground ${
                  activeId === heading.id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
