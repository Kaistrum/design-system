import { forwardRef, type InputHTMLAttributes, type ReactNode, createContext, useContext, useId } from 'react';
import { cn } from '../../lib/utils';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, disabled, name: nameProp, ...props }, ref) => {
    const group = useContext(RadioGroupContext);
    return (
      <label
        htmlFor={id}
        className={cn(
          'group inline-flex items-center gap-3 cursor-pointer select-none',
          disabled && 'opacity-50 cursor-not-allowed',
        )}>
        <span
          className={cn(
            'relative w-5 h-5 shrink-0 rounded-full border border-border bg-bg-surface transition-colors duration-150 flex items-center justify-center',
            'has-[:checked]:border-accent',
            'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent',
            className,
          )}>
          <input
            ref={ref}
            type="radio"
            id={id}
            name={nameProp ?? group?.name}
            disabled={disabled}
            className="peer absolute inset-0 w-5 h-5 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            {...props}
          />
          <span className="w-2.5 h-2.5 rounded-full bg-accent scale-0 peer-checked:scale-100 transition-transform duration-150" />
        </span>
        {label && <span className="text-sm text-text">{label}</span>}
      </label>
    );
  },
);
Radio.displayName = 'Radio';

interface RadioGroupContextValue {
  name: string;
}
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name?: string;
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({ name, label, children, className }: RadioGroupProps) {
  const generatedName = useId();
  return (
    <RadioGroupContext.Provider value={{ name: name ?? generatedName }}>
      <div role="radiogroup" aria-label={typeof label === 'string' ? label : undefined} className={cn('flex flex-col gap-1.5', className)}>
        {label && <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-text-muted">{label}</span>}
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </RadioGroupContext.Provider>
  );
}
