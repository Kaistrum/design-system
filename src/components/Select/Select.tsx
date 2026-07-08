import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Field } from '@/components/Field/Field';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, wrapperClassName, label, hint, error, required, id, options, placeholder, ...props }, ref) => {
    return (
      <Field label={label} htmlFor={id} hint={hint} error={error} required={required} className={wrapperClassName}>
        {(fieldId, describedBy) => (
          <div className="relative flex items-center">
            <select
              ref={ref}
              id={fieldId}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              defaultValue={props.defaultValue ?? (placeholder ? '' : undefined)}
              className={cn(
                'w-full appearance-none bg-bg-surface border text-text text-sm rounded-none px-4 py-3.5 pr-9 outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                error ? 'border-danger' : 'border-border focus:border-accent',
                className,
              )}
              {...props}>
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 text-text-muted pointer-events-none" />
          </div>
        )}
      </Field>
    );
  },
);
Select.displayName = 'Select';
