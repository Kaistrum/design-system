import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Moon, X, Trash2 } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Primitives/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'ghost', 'accent'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    icon: <Moon size={15} />,
    'aria-label': 'Toggle theme',
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ghost: Story = {
  args: { variant: 'ghost', icon: <X size={16} />, 'aria-label': 'Close' },
};

export const Accent: Story = {
  args: { variant: 'accent', icon: <Trash2 size={15} />, 'aria-label': 'Delete' },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} size="sm" />
      <IconButton {...args} size="md" />
      <IconButton {...args} size="lg" />
    </div>
  ),
};
