import { forwardRef, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Field } from '../Field/Field';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, wrapperClassName, label, hint, error, required, id, rows = 5, ...props }, ref) => {
    return (
      <Field label={label} htmlFor={id} hint={hint} error={error} required={required} className={wrapperClassName}>
        {(fieldId, describedBy) => (
          <textarea
            ref={ref}
            id={fieldId}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              'w-full bg-bg-surface border text-text text-sm rounded-none px-4 py-3.5 outline-none transition-colors duration-200 placeholder:text-text-muted resize-none disabled:opacity-50 disabled:cursor-not-allowed',
              error ? 'border-danger' : 'border-border focus:border-accent',
              className,
            )}
            {...props}
          />
        )}
      </Field>
    );
  },
);
Textarea.displayName = 'Textarea';
