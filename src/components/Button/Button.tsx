import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-text-on-accent hover:opacity-90',
        outline: 'border border-accent text-accent bg-transparent hover:bg-accent-faint',
        ghost: 'border border-transparent text-text-dim hover:text-text hover:bg-bg-surface',
        danger: 'bg-danger text-text-on-danger hover:opacity-90',
      },
      size: {
        sm: 'text-xs px-4 py-2',
        md: 'text-sm px-6 py-3',
        lg: 'text-sm px-7 py-3.5',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  /** Leading icon, rendered plainly before the label. */
  icon?: ReactNode;
  /**
   * Trailing icon rendered inside the source site's signature "chip" — a
   * small square that inverts the button's colors and scales up on hover.
   * Reserved for the `primary` variant's main CTA pattern.
   */
  iconChip?: ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, icon, iconChip, loading, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          iconChip && 'group pl-5 pr-1.5 py-1.5 hover:gap-3',
          className,
        )}
        {...props}>
        {loading && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
        {!loading && icon}
        {children}
        {!loading && iconChip && (
          <span
            className={cn(
              'w-8 h-8 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110',
              variant === 'primary' ? 'bg-bg text-accent' : 'bg-accent text-text-on-accent',
            )}>
            {iconChip}
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
