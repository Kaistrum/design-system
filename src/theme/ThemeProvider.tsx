import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEY = 'design-system-theme';

interface ThemeProviderProps {
  children: ReactNode;
  /** Root element the `.light` class is toggled on. Defaults to <html>. */
  target?: () => HTMLElement | null;
  defaultTheme?: Theme;
}

/**
 * Applies the theme by toggling a `.light` class on the root element —
 * tokens.css keys its light-mode overrides off `:root.light`, so this is
 * the only thing that needs to happen for every token-driven component to
 * repaint. Persists the choice so it survives reloads.
 */
export function ThemeProvider({
  children,
  target = () => document.documentElement,
  defaultTheme = 'dark',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) applyTheme(stored);
    function applyTheme(next: Theme) {
      setThemeState(next);
      const el = target();
      el?.classList.toggle('light', next === 'light');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    target()?.classList.toggle('light', next === 'light');
    localStorage.setItem(STORAGE_KEY, next);
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
