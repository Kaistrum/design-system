import { cn } from '../../lib/utils';
import { CountUp } from '../CountUp/CountUp';

export interface Stat {
  value: string;
  label: string;
}

export interface StatStripProps {
  stats: Stat[];
  className?: string;
}

export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-10 border-t border-border', className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-light text-4xl sm:text-5xl md:text-6xl mb-1 text-text">
            <CountUp value={stat.value} />
          </p>
          <p className="text-xs sm:text-sm leading-snug text-text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
