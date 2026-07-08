import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Field } from '@/components/Field/Field';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, label, hint, error, required, leadingIcon, trailingIcon, id, ...props }, ref) => {
    return (
      <Field label={label} htmlFor={id} hint={hint} error={error} required={required} className={wrapperClassName}>
        {(fieldId, describedBy) => (
          <div className="relative flex items-center">
            {leadingIcon && (
              <span className="absolute left-3 flex items-center text-text-muted pointer-events-none">
                {leadingIcon}
              </span>
            )}
            <input
              ref={ref}
              id={fieldId}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              className={cn(
                'w-full bg-bg-surface border text-text text-sm rounded-none px-4 py-3.5 outline-none transition-colors duration-200 placeholder:text-text-muted disabled:opacity-50 disabled:cursor-not-allowed',
                error ? 'border-danger' : 'border-border focus:border-accent',
                leadingIcon && 'pl-9',
                trailingIcon && 'pr-9',
                className,
              )}
              {...props}
            />
            {trailingIcon && (
              <span className="absolute right-3 flex items-center text-text-muted pointer-events-none">
                {trailingIcon}
              </span>
            )}
          </div>
        )}
      </Field>
    );
  },
);
Input.displayName = 'Input';
