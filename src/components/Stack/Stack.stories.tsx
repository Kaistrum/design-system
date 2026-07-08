import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

function Box({ children }: { children: React.ReactNode }) {
  return <div className="bg-accent-faint border border-accent text-accent text-xs px-3 py-2">{children}</div>;
}

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { children: null },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = {
  args: { direction: 'column' },
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};

export const Row: Story = {
  args: { direction: 'row' },
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};
