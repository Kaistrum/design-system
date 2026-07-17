import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const containerVariants = cva('w-full mx-auto px-4 md:px-6', {
  variants: {
    width: {
      content: 'max-w-6xl',
      wide: 'max-w-7xl',
      narrow: 'max-w-3xl',
      full: 'max-w-none',
    },
  },
  defaultVariants: { width: 'content' },
});

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

/** The recurring `max-w-6xl mx-auto px-4 md:px-6` content wrapper, see Foundations/Spacing & Layout. */
export function Container({ className, width, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ width }), className)} {...props} />;
}
