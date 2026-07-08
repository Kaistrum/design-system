import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Feedback/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['square', 'circle'] },
  },
  args: { name: 'Dr. Asha Wangari' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Circle: Story = {
  args: { shape: 'circle' },
};

export const WithStatus: Story = {
  args: { status: 'online' },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar name="Asha Wangari" shape="circle" className="ring-2 ring-bg" />
      <Avatar name="James Ochieng" shape="circle" className="ring-2 ring-bg" />
      <Avatar name="Fatuma Al-Hassan" shape="circle" className="ring-2 ring-bg" />
    </div>
  ),
};
