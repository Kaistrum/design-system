import type { HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-none border text-[10px] uppercase tracking-[0.12em] font-semibold px-2.5 py-1 whitespace-nowrap',
  {
    variants: {
      variant: {
        neutral: 'bg-bg-surface border-border text-text-dim',
        accent: 'bg-accent-faint border-transparent text-accent',
        success: 'bg-success-faint border-transparent text-success',
        warning: 'bg-warning-faint border-transparent text-warning',
        danger: 'bg-danger-faint border-transparent text-danger',
        info: 'bg-info-faint border-transparent text-info',
        outline: 'bg-transparent border-border text-text-dim',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  icon?: ReactNode;
  /** Small solid dot before the label — common for status badges. */
  dot?: boolean;
}

export function Badge({ className, variant, icon, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />}
      {icon}
      {children}
    </span>
  );
}
