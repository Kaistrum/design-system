import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';
import { IconButton } from '../IconButton/IconButton';

export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** Requires an ancestor <ThemeProvider> — see src/theme/ThemeProvider.tsx. */
export function ThemeToggle({ size = 'md', className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      onClick={toggleTheme}
      size={size}
      className={className}
    />
  );
}
