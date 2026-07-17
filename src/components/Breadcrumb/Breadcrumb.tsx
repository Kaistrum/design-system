import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-xs', className)}>
      <ol className="flex items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a href={item.href} className="text-text-muted hover:text-text transition-colors duration-200">
                  {item.label}
                </a>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-text font-medium' : 'text-text-muted'}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={12} className="text-text-muted shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
