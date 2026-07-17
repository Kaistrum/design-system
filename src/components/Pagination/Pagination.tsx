import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function pageRange(page: number, totalPages: number): (number | 'ellipsis')[] {
  const range: (number | 'ellipsis')[] = [];
  const window = 1;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - window && i <= page + window)) {
      range.push(i);
    } else if (range[range.length - 1] !== 'ellipsis') {
      range.push('ellipsis');
    }
  }
  return range;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="w-9 h-9 flex items-center justify-center border border-border text-text-dim disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:border-accent hover:not-disabled:text-accent transition-colors duration-200">
        <ChevronLeft size={15} />
      </button>

      {pageRange(page, totalPages).map((entry, i) =>
        entry === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-text-muted text-sm">
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            aria-current={entry === page ? 'page' : undefined}
            onClick={() => onPageChange(entry)}
            className={cn(
              'w-9 h-9 flex items-center justify-center border text-sm transition-colors duration-200',
              entry === page
                ? 'bg-accent border-accent text-text-on-accent'
                : 'border-border text-text-dim hover:border-accent hover:text-accent',
            )}>
            {entry}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="w-9 h-9 flex items-center justify-center border border-border text-text-dim disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:border-accent hover:not-disabled:text-accent transition-colors duration-200">
        <ChevronRight size={15} />
      </button>
    </nav>
  );
}
