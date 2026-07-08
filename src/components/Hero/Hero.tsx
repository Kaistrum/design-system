import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  /** Rendered behind the content, e.g. an animated map/grid backdrop. */
  background?: ReactNode;
  showScrollIndicator?: boolean;
  className?: string;
}

export function Hero({ eyebrow, title, subtitle, background, showScrollIndicator = true, className }: HeroProps) {
  return (
    <section className={cn('h-screen relative overflow-hidden bg-black', className)}>
      {background}

      <div className="noise-overlay absolute inset-0 opacity-[0.45] mix-blend-overlay pointer-events-none z-10" aria-hidden="true" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-28 z-20 px-4 text-center pointer-events-none">
        <motion.p
          className="text-[10px] sm:text-xs uppercase tracking-[0.28em] mb-5 font-medium text-accent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          {eyebrow}
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[0.92] mb-5 max-w-3xl text-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-sm sm:text-base md:text-lg max-w-lg leading-relaxed text-text-dim"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}>
            {subtitle}
          </motion.p>
        )}
      </div>

      {showScrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}>
          <span className="text-[9px] uppercase tracking-[0.24em] text-text-muted">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={16} className="text-text-muted" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
