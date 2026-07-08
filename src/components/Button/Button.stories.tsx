import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ArrowRight, Download, Trash2 } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete', icon: <Trash2 size={15} /> },
};

export const WithIconChip: Story = {
  name: 'With icon chip (CTA pattern)',
  args: { children: 'Contact', iconChip: <ArrowRight size={13} /> },
};

export const Loading: Story = {
  args: { loading: true, children: 'Sending…' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" iconChip={<ArrowRight size={13} />}>Contact</Button>
      <Button variant="outline" icon={<Download size={15} />}>Download</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger" icon={<Trash2 size={15} />}>Delete</Button>
    </div>
  ),
};
