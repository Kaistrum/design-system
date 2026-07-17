import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const gridVariants = cva('grid grid-cols-1', {
  variants: {
    columns: {
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-2 lg:grid-cols-3',
      4: 'sm:grid-cols-2 lg:grid-cols-4',
      5: 'sm:grid-cols-2 lg:grid-cols-5',
    },
    gap: {
      sm: 'gap-4',
      md: 'gap-5',
      lg: 'gap-6',
    },
  },
  defaultVariants: {
    columns: 3,
    gap: 'md',
  },
});

export interface GridProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {}

/** Responsive card-grid primitive matching the source site's breakpoints (industries: 5-col, case studies/testimonials: 2–3col). */
export function Grid({ className, columns, gap, ...props }: GridProps) {
  return <div className={cn(gridVariants({ columns, gap }), className)} {...props} />;
}
