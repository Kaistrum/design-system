import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  logo: ReactNode;
  tagline?: string;
  columns: FooterColumn[];
  email?: string;
  year?: number;
  className?: string;
}

export function Footer({ logo, tagline, columns, email, year = new Date().getFullYear(), className }: FooterProps) {
  return (
    <footer className={cn('py-16 md:py-20 px-4 md:px-6 border-t border-border bg-bg', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 mb-14">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">{logo}</div>
            {tagline && <p className="text-xs leading-relaxed max-w-[200px] text-text-muted">{tagline}</p>}
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] font-semibold mb-4 uppercase tracking-[0.18em] text-accent">{col.heading}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-xs sm:text-sm text-text-muted hover:text-text transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">© {year} All rights reserved.</p>
          {email && <p className="text-xs text-text-muted">{email}</p>}
        </div>
      </div>
    </footer>
  );
}
