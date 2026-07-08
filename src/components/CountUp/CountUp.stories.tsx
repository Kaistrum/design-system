import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountUp } from './CountUp';

const meta = {
  title: 'Primitives/CountUp',
  component: CountUp,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { value: '99.9%' },
} satisfies Meta<typeof CountUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <CountUp {...args} className="text-6xl font-light text-text" />,
};

export const Group: Story = {
  render: () => (
    <div className="flex gap-10">
      {['20+', '5+', '99.9%'].map((v) => (
        <CountUp key={v} value={v} className="text-5xl font-light text-text" />
      ))}
    </div>
  ),
};
