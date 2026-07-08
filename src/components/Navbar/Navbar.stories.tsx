import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { ThemeProvider } from '@/theme/ThemeProvider';

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="h-[420px] relative bg-bg">
          <Story />
          <div className="pt-24 px-8 text-sm text-text-muted">Page content scrolls beneath the fixed navbar.</div>
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const logo = (
  <a href="/" className="flex items-center gap-2.5" aria-label="Home">
    <span className="w-6 h-6 bg-accent" />
    <span className="text-lg font-bold tracking-widest uppercase text-text">Kaistrum</span>
  </a>
);

export const Default: Story = {
  args: {
    logo,
    items: [
      {
        label: 'Services',
        dropdown: [
          { label: 'Infrastructure Deployment', href: '#', description: 'End-to-end GIS deployment' },
          { label: 'Data Migration', href: '#', description: 'Move legacy spatial data without loss' },
          { label: 'Custom Development', href: '#', description: 'Tailored GIS web & mobile applications' },
        ],
      },
      {
        label: 'Industries',
        dropdown: [
          { label: 'Government & Defense', href: '#' },
          { label: 'Utilities & Infrastructure', href: '#' },
          { label: 'Transportation & Logistics', href: '#' },
        ],
      },
      { label: 'Case Studies', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    cta: { label: 'Contact', href: '#' },
    actions: <ThemeToggle />,
  },
};

export const NoDropdowns: Story = {
  args: {
    logo,
    items: [
      { label: 'About', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    cta: { label: 'Sign up', href: '#' },
    actions: <ThemeToggle />,
  },
};
