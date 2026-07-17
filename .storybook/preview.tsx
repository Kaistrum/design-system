import type { Preview, Decorator } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/styles/globals.css';

const WithTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'light';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.style.background = 'var(--bg)';
  }, [theme]);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100%', padding: '1.5rem' }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Introduction', 'Colors', 'Typography', 'Spacing & Layout', 'Motion', 'Icons'],
          'Primitives',
          'Feedback',
          'Navigation',
          'Layout',
          'Organisms',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Design system theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'light', icon: 'sun', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [WithTheme],
};

export default preview;
