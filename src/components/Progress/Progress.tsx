import { cn } from '../../lib/utils';

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Progress({ value, max = 100, label, showValue, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs text-text-muted">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-1.5 w-full bg-bg-surface border border-border-subtle">
        <div className="h-full bg-accent transition-[width] duration-300 ease-standard" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
