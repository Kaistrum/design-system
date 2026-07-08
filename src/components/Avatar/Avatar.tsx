import { useState, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center shrink-0 overflow-hidden border border-border bg-accent-faint text-accent font-medium tracking-wide shrink-0',
  {
    variants: {
      size: {
        sm: 'w-7 h-7 text-[10px]',
        md: 'w-9 h-9 text-[11px]',
        lg: 'w-12 h-12 text-sm',
        xl: 'w-16 h-16 text-base',
      },
      shape: {
        square: 'rounded-none',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'square',
    },
  },
);

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  name: string;
  status?: 'online' | 'offline' | 'busy';
}

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const statusColor: Record<NonNullable<AvatarProps['status']>, string> = {
  online: 'bg-success',
  offline: 'bg-text-muted',
  busy: 'bg-danger',
};

export function Avatar({ className, size, shape, src, name, status, ...props }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <span className={cn(avatarVariants({ size, shape }), className)} {...props}>
      {src && !imgError ? (
        <img src={src} alt={name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
      ) : (
        <span aria-label={name}>{initials(name)}</span>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg',
            statusColor[status],
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}
