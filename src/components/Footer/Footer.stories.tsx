import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: (
      <a href="/" className="flex items-center gap-2.5" aria-label="Home">
        <span className="w-5 h-5 bg-accent" />
        <span className="text-xs font-bold tracking-widest uppercase text-text">Kaistrum</span>
      </a>
    ),
    tagline: 'Spatial . Non-spatial . Limitless',
    columns: [
      {
        heading: 'Services',
        links: [
          { label: 'Infrastructure Deployment', href: '#' },
          { label: 'Data Migration', href: '#' },
          { label: 'Custom Development', href: '#' },
        ],
      },
      {
        heading: 'Industries',
        links: [
          { label: 'Government & Defense', href: '#' },
          { label: 'Utilities & Infrastructure', href: '#' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Careers', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
    ],
    email: 'hello@kaistrum.com',
  },
};
