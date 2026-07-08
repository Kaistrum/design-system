import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { value: 65, max: 100 },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: '18 of 20 seats used', showValue: true, value: 18, max: 20 },
};

export const Complete: Story = {
  args: { value: 100, label: 'Migration complete', showValue: true },
};

export const Empty: Story = {
  args: { value: 0, label: 'Not started', showValue: true },
};
