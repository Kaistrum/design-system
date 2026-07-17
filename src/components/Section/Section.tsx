import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Container, type ContainerProps } from '../Container/Container';

const sectionVariants = cva('px-4 md:px-6', {
  variants: {
    spacing: {
      standard: 'py-20 md:py-24',
      hero: 'py-20 md:py-32',
      compact: 'py-12 md:py-16',
    },
    surface: {
      bg: 'bg-bg',
      surface: 'bg-bg-surface',
      transparent: '',
    },
  },
  defaultVariants: { spacing: 'standard', surface: 'bg' },
});

export interface SectionProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  containerWidth?: ContainerProps['width'];
}

/** Top-level page section: the `py-20 md:py-24 px-4 md:px-6` envelope + a Container. */
export function Section({ className, spacing, surface, containerWidth, children, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ spacing, surface }), className)} {...props}>
      <Container width={containerWidth} className="px-0">
        {children}
      </Container>
    </section>
  );
}
