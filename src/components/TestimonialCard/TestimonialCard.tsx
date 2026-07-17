import { cn } from '../../lib/utils';

export interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  className?: string;
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2);
}

export function TestimonialCard({ quote, name, title, className }: TestimonialCardProps) {
  return (
    <div className={cn('p-7 md:p-8 flex flex-col gap-6 border border-border bg-bg-surface', className)}>
      <span className="font-serif leading-none select-none text-[3rem] text-accent-faint">"</span>
      <p className="text-sm sm:text-base leading-[1.7] flex-1 -mt-4 text-text-dim">{quote}</p>
      <div className="border-t border-border pt-5 flex items-center gap-3">
        <div className="w-9 h-9 shrink-0 flex items-center justify-center text-[11px] font-medium tracking-wide border border-border bg-accent-faint text-accent">
          {initials(name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-text">{name}</p>
          <p className="text-xs mt-0.5 text-text-muted">{title}</p>
        </div>
      </div>
    </div>
  );
}
