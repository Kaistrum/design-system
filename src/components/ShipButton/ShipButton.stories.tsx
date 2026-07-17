import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ShipButton } from './ShipButton';

const meta = {
  title: 'Primitives/ShipButton',
  component: ShipButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    outcome: { control: 'inline-radio', options: ['success', 'failure'] },
  },
  args: {
    outcome: 'success',
    onResult: fn(),
  },
} satisfies Meta<typeof ShipButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click to ship — the truck drives the full route and the order arrives. */
export const Succeeds: Story = {
  args: { outcome: 'success' },
};

/**
 * Click to ship — the truck crashes mid-route (nose-dive, skid marks, dust)
 * and the button holds a danger state. Clicking again retries.
 */
export const Fails: Story = {
  args: { outcome: 'failure' },
};

export const CustomLabels: Story = {
  args: {
    outcome: 'success',
    idleLabel: 'Dispatch parcel',
    successLabel: 'On its way',
    errorLabel: 'Route blocked · retry',
  },
};

export const SideBySide: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <ShipButton outcome="success" />
        <span className="text-xs text-text-muted">outcome: success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ShipButton outcome="failure" />
        <span className="text-xs text-text-muted">outcome: failure</span>
      </div>
    </div>
  ),
};
