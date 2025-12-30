import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 overflow-x-auto">
      {items.map((item, index) => (
        <div key={index} className="flex items-center shrink-0">
          {index > 0 && (
            <span className="mx-1.5 sm:mx-2 text-muted-foreground/40">›</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
