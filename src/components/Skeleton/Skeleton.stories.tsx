import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { shape: 'text' },
  decorators: [(Story) => <div className="max-w-xs"><Story /></div>],
};

export const Circle: Story = {
  args: { shape: 'circle', className: 'w-10 h-10' },
};

export const CardSkeleton: Story = {
  name: 'Composed: card loading state',
  render: () => (
    <div className="max-w-sm border border-border bg-bg-surface p-7 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="w-9 h-9" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton shape="text" className="w-1/2" />
          <Skeleton shape="text" className="w-1/3 h-2.5" />
        </div>
      </div>
      <Skeleton shape="text" />
      <Skeleton shape="text" className="w-4/5" />
      <Skeleton shape="text" className="w-3/5" />
    </div>
  ),
};
