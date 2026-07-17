import { useId, useState, type ReactElement, type ReactNode, cloneElement } from 'react';
import { cn } from '../../lib/utils';

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement<{ 'aria-describedby'?: string }>;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const placementClasses: Record<NonNullable<TooltipProps['placement']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * Lightweight, dependency-free tooltip suited to in-page trigger elements.
 * For triggers near a viewport edge or inside a scroll container that needs
 * collision detection, swap this for @floating-ui/react — the visual shell
 * (bg-drop-bg panel, border, text-xs) should stay the same.
 */
export function Tooltip({ content, children, placement = 'top', className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}>
      {cloneElement(children, { 'aria-describedby': open ? id : undefined })}
      <span
        role="tooltip"
        id={id}
        className={cn(
          'absolute z-50 pointer-events-none whitespace-nowrap bg-drop-bg border border-border-strong text-text text-xs px-2.5 py-1.5 transition-opacity duration-150',
          placementClasses[placement],
          open ? 'opacity-100' : 'opacity-0',
          className,
        )}>
        {content}
      </span>
    </span>
  );
}
