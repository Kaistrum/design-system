import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { IconButton } from '../IconButton/IconButton';
import { Button } from '../Button/Button';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    content: 'Tooltip content',
    children: <IconButton aria-label="More info" icon={<Info size={15} />} />,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <Tooltip content="99.9% cloud uptime SLA">
      <IconButton aria-label="More info" icon={<Info size={15} />} />
    </Tooltip>
  ),
};

export const OnButton: Story = {
  args: {},
  render: () => (
    <Tooltip content="Requires an active support contract">
      <Button variant="outline">Request diagnostics</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-10 py-10">
      <Tooltip content="Top" placement="top"><Button variant="ghost">Top</Button></Tooltip>
      <Tooltip content="Bottom" placement="bottom"><Button variant="ghost">Bottom</Button></Tooltip>
      <Tooltip content="Left" placement="left"><Button variant="ghost">Left</Button></Tooltip>
      <Tooltip content="Right" placement="right"><Button variant="ghost">Right</Button></Tooltip>
    </div>
  ),
};
