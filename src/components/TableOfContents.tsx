'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (activeId) {
      const activeElement = document.querySelector(`a[href="#${activeId}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeId]);

  if (headings.length === 0) {
    return null;
  }

  return (
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
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
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
  );
}
