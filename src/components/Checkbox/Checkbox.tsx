import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, disabled, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'group inline-flex items-start gap-3 cursor-pointer select-none',
          disabled && 'opacity-50 cursor-not-allowed',
        )}>
        <span className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            disabled={disabled}
            className="peer absolute inset-0 w-5 h-5 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            {...props}
          />
          <span
            className={cn(
              'w-5 h-5 flex items-center justify-center border border-border bg-bg-surface text-transparent transition-colors duration-150',
              'peer-checked:bg-accent peer-checked:border-accent peer-checked:text-text-on-accent',
              'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
              className,
            )}>
            <Check size={13} strokeWidth={3} />
          </span>
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
Checkbox.displayName = 'Checkbox';
