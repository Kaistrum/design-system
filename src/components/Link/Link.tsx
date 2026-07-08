import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/Button/Button';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'accent' | 'button-primary' | 'button-outline' | 'button-ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Trailing arrow, rotated -45° — the source site's "go to" affordance for text links. */
  arrow?: boolean;
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', size = 'md', arrow, external, target, rel, children, ...props }, ref) => {
    const isButton = variant.startsWith('button-');

    return (
      <a
        ref={ref}
        target={external ? '_blank' : target}
        rel={external ? 'noopener noreferrer' : rel}
        className={cn(
          isButton
            ? buttonVariants({ variant: variant.replace('button-', '') as 'primary' | 'outline' | 'ghost', size })
            : cn(
                'group inline-flex items-center gap-1.5 text-sm transition-colors duration-200',
                variant === 'accent' ? 'text-accent font-medium' : 'text-text-dim hover:text-text',
              ),
          className,
        )}
        {...props}>
        {children}
        {arrow && (
          <ArrowRight
            size={12}
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ transform: 'rotate(-45deg)' }}
          />
        )}
      </a>
    );
  },
);
Link.displayName = 'Link';
