import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, id, disabled, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer select-none',
          disabled && 'opacity-50 cursor-not-allowed',
        )}>
        <span
          className={cn(
            'relative w-10 h-6 shrink-0 rounded-full border border-border bg-bg-surface transition-colors duration-200',
            'has-[:checked]:bg-accent has-[:checked]:border-accent',
            'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent',
            className,
          )}>
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={id}
            disabled={disabled}
            className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            {...props}
          />
          <span className="absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-text-muted transition-all duration-200 peer-checked:left-4.5 peer-checked:bg-text-on-accent" />
        </span>
        {(label || description) && (
          <span className="flex flex-col">
            {label && <span className="text-sm text-text">{label}</span>}
            {description && <span className="text-xs text-text-muted">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);
Switch.displayName = 'Switch';
