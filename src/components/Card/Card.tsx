import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const cardVariants = cva('border border-border rounded-none', {
  variants: {
    surface: {
      surface: 'bg-bg-surface',
      card: 'bg-bg-card',
      transparent: 'bg-transparent',
    },
    padding: {
      none: '',
      compact: 'p-6',
      standard: 'p-7 md:p-8',
      spacious: 'p-8 md:p-10',
    },
    interactive: {
      true: 'transition-colors duration-200 hover:border-accent',
      false: '',
    },
  },
  defaultVariants: {
    surface: 'surface',
    padding: 'standard',
    interactive: false,
  },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, surface, padding, interactive, ...props }: CardProps) {
  return <div className={cn(cardVariants({ surface, padding, interactive }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 mb-5', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold text-text leading-snug', className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-text-dim leading-relaxed', className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center gap-3 mt-6 pt-5 border-t border-border', className)} {...props} />;
}
