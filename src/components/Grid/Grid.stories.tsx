import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';

function Tile({ children }: { children: React.ReactNode }) {
  return <div className="bg-bg-card border border-border p-4 text-sm text-text-dim">{children}</div>;
}

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    columns: { control: 'select', options: [2, 3, 4, 5] },
    gap: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { children: null },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: { columns: 3 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => <Tile key={i}>Item {i + 1}</Tile>)}
    </Grid>
  ),
};

export const FiveColumns: Story = {
  args: { columns: 5, gap: 'sm' },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 10 }, (_, i) => <Tile key={i}>Item {i + 1}</Tile>)}
    </Grid>
  ),
};
