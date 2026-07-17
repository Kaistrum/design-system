import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center shrink-0 rounded-none border transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  {
    variants: {
      variant: {
        default: 'border-border text-text-dim bg-accent-faint hover:text-text hover:border-border-strong',
        ghost: 'border-transparent text-text-dim hover:text-text hover:bg-bg-surface',
        accent: 'border-transparent bg-accent text-text-on-accent hover:opacity-90',
      },
      size: {
        sm: 'w-7 h-7',
        md: 'w-9 h-9',
        lg: 'w-11 h-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof iconButtonVariants> {
  /** Required — icon-only buttons must be labeled for assistive tech. */
  'aria-label': string;
  icon: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}>
      {icon}
    </button>
  ),
);
IconButton.displayName = 'IconButton';
