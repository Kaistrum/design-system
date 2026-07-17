import { type ReactNode, useId } from 'react';
import { cn } from '../../lib/utils';

export interface FieldProps {
  label?: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  children: (id: string, describedBy: string | undefined) => ReactNode;
}

/**
 * Layout wrapper shared by Input/Textarea/Select: uppercase tracked label
 * above, control in the middle, hint or error text below. Not usually
 * reached for directly — Input/Textarea/Select use it internally — but
 * exported for composing custom form controls in the same visual language.
 */
export function Field({ label, htmlFor, hint, error, required, className, children }: FieldProps) {
  const generatedId = useId();
  const id = htmlFor ?? generatedId;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-[10px] uppercase tracking-[0.16em] font-medium text-text-muted">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      {children(id, describedBy)}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
