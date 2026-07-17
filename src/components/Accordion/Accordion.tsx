import { createContext, useContext, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion.* components must be rendered inside <Accordion>');
  return ctx;
}

export interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  children: ReactNode;
  className?: string;
}

export function Accordion({ type = 'single', defaultValue, children, className }: AccordionProps) {
  const initial = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
  const [openValues, setOpenValues] = useState<string[]>(initial);

  const toggle = (value: string) => {
    setOpenValues((prev) => {
      const isOpen = prev.includes(value);
      if (type === 'single') return isOpen ? [] : [value];
      return isOpen ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggle }}>
      <div className={cn('flex flex-col border-t border-border', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

const ItemContext = createContext<string | null>(null);

export function AccordionItem({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  return (
    <ItemContext.Provider value={value}>
      <div className={cn('border-b border-border', className)}>{children}</div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { openValues, toggle } = useAccordionContext();
  const value = useContext(ItemContext);
  if (value === null) throw new Error('AccordionTrigger must be rendered inside <AccordionItem>');
  const isOpen = openValues.includes(value);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => toggle(value)}
      className={cn(
        'w-full flex items-center justify-between gap-4 py-5 text-left text-sm font-medium text-text transition-colors duration-200 hover:text-accent',
        className,
      )}>
      {children}
      <ChevronDown
        size={16}
        className={cn('shrink-0 text-text-muted transition-transform duration-200', isOpen && 'rotate-180 text-accent')}
      />
    </button>
  );
}

export function AccordionContent({ children, className }: { children: ReactNode; className?: string }) {
  const { openValues } = useAccordionContext();
  const value = useContext(ItemContext);
  if (value === null) throw new Error('AccordionContent must be rendered inside <AccordionItem>');
  const isOpen = openValues.includes(value);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden">
          <div className={cn('pb-5 text-sm text-text-dim leading-relaxed', className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
