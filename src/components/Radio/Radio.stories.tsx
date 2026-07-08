import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Primitives/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'On-premise', name: 'deployment' },
};

export const Checked: Story = {
  args: { label: 'Cloud', name: 'deployment', defaultChecked: true },
};

export const Group: Story = {
  render: () => (
    <RadioGroup label="Deployment model" name="deployment-group">
      <Radio label="Cloud" value="cloud" defaultChecked />
      <Radio label="On-premise" value="on-prem" />
      <Radio label="Hybrid" value="hybrid" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { label: 'Hybrid (coming soon)', name: 'deployment-disabled', disabled: true },
};
