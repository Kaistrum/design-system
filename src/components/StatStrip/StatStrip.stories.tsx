import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatStrip } from './StatStrip';

const meta = {
  title: 'Organisms/StatStrip',
  component: StatStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    stats: [
      { value: '20+', label: 'solutions delivered' },
      { value: '5+', label: 'countries' },
      { value: '10+', label: 'combined experience' },
      { value: '99.9%', label: 'cloud uptime SLA' },
    ],
  },
} satisfies Meta<typeof StatStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
