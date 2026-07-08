import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search } from 'lucide-react';
import { Input } from './Input';

const meta = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    placeholder: 'jane@organisation.com',
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Email' },
};

export const WithHint: Story = {
  args: { label: 'Organisation', hint: 'Optional — helps us route your message.' },
};

export const WithError: Story = {
  args: { label: 'Email', error: 'Enter a valid email address.', defaultValue: 'not-an-email' },
};

export const Required: Story = {
  args: { label: 'Name', required: true, placeholder: 'Jane Doe' },
};

export const WithLeadingIcon: Story = {
  args: { label: 'Email', leadingIcon: <Mail size={15} /> },
};

export const Search_: Story = {
  name: 'Search (no label)',
  args: { placeholder: 'Search…', leadingIcon: <Search size={15} /> },
};

export const Disabled: Story = {
  args: { label: 'Email', disabled: true, defaultValue: 'jane@organisation.com' },
};
