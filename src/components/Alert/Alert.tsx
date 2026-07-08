import type { HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/IconButton/IconButton';

const alertVariants = cva('flex gap-3 border p-4', {
  variants: {
    variant: {
      info: 'bg-info-faint border-info/30 text-text',
      success: 'bg-success-faint border-success/30 text-text',
      warning: 'bg-warning-faint border-warning/30 text-text',
      danger: 'bg-danger-faint border-danger/30 text-text',
    },
  },
  defaultVariants: { variant: 'info' },
});

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const iconColor: Record<AlertVariant, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

const defaultIcon: Record<AlertVariant, ReactNode> = {
  info: <Info size={18} />,
  success: <CheckCircle2 size={18} />,
  warning: <AlertTriangle size={18} />,
  danger: <XCircle size={18} />,
};

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  title?: ReactNode;
  icon?: ReactNode;
  onDismiss?: () => void;
}

export function Alert({ className, variant: variantProp, title, icon, onDismiss, children, ...props }: AlertProps) {
  const variant: AlertVariant = variantProp ?? 'info';
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <span className={cn('shrink-0 mt-0.5', iconColor[variant])}>{icon ?? defaultIcon[variant]}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-text mb-1">{title}</p>}
        <div className="text-sm text-text-dim leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <IconButton
          aria-label="Dismiss"
          icon={<X size={13} />}
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="shrink-0"
        />
      )}
    </div>
  );
}
