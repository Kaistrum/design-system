import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';

const meta = {
  title: 'Organisms/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Geospatial Solutions and Services',
    title: (
      <>
        Map. Analyse.{' '}
        <em className="font-serif italic font-light text-accent-dim">Decide.</em>
      </>
    ),
    subtitle:
      'For governments, utilities and transportation companies, natural resource companies and agencies that run on authoritative spatial data.',
  },
};
