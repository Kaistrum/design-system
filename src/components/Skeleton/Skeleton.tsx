import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  shape?: 'text' | 'block' | 'circle';
}

export function Skeleton({ className, shape = 'block', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-bg-surface animate-pulse',
        shape === 'text' && 'h-3.5 rounded-none w-full',
        shape === 'block' && 'rounded-none',
        shape === 'circle' && 'rounded-full',
        className,
      )}
      {...props}
    />
  );
}
