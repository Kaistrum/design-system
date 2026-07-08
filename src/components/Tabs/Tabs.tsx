import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  indicatorId: string;
}
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* components must be rendered inside <Tabs>');
  return ctx;
}

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className }: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const indicatorId = useId();
  const value = controlledValue ?? uncontrolledValue;
  const setValue = onValueChange ?? setUncontrolledValue;

  return (
    <TabsContext.Provider value={{ value, setValue, indicatorId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="tablist" className={cn('flex border-b border-border overflow-x-auto', className)}>
      {children}
    </div>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { value: active, setValue, indicatorId } = useTabsContext();
  const isActive = active === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      onClick={() => setValue(value)}
      className={cn(
        'relative px-5 py-4 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200',
        isActive ? 'text-accent' : 'text-text-muted hover:text-text-dim',
        className,
      )}>
      {children}
      {isActive && (
        <motion.div
          layoutId={`tabs-indicator-${indicatorId}`}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </button>
  );
}

export function TabsContent({ value, children, className }: TabsTriggerProps) {
  const { value: active } = useTabsContext();
  if (active !== value) return null;
  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
}
