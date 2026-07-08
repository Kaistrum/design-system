import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const options = [
  { value: 'gov', label: 'Government & Defense' },
  { value: 'utilities', label: 'Utilities & Infrastructure' },
  { value: 'telecoms', label: 'Telecoms & Broadband' },
  { value: 'transport', label: 'Transportation & Logistics' },
];

const meta = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    label: 'Industry',
    options,
    placeholder: 'Choose an industry',
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Select an industry.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
