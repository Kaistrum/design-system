import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Feedback/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const WithLabel: Story = {
  args: { label: 'or' },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-10">
      <span className="text-sm text-text-dim">Services</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-text-dim">Industries</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-text-dim">Contact</span>
    </div>
  ),
};
