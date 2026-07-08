import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: ReactNode;
}

export function Divider({ className, orientation = 'horizontal', label, ...props }: DividerProps) {
  if (orientation === 'vertical') {
    return <div role="separator" aria-orientation="vertical" className={cn('w-px self-stretch bg-border', className)} {...props} />;
  }

  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)} {...props}>
        <div role="separator" className="h-px flex-1 bg-border" />
        <span className="text-xs text-text-muted whitespace-nowrap">{label}</span>
        <div role="separator" className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return <div role="separator" className={cn('h-px w-full bg-border', className)} {...props} />;
}
