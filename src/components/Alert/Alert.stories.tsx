import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
  },
  decorators: [(Story) => <div className="max-w-lg"><Story /></div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { variant: 'info', title: 'Scheduled maintenance', children: 'Kaistrum Cloud will be briefly unavailable on Sunday 02:00–02:30 UTC.' },
};

export const Success: Story = {
  args: { variant: 'success', title: 'Message sent!', children: "Thanks for reaching out — we'll be in touch within one business day." },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Approaching seat limit', children: "You're using 18 of 20 licensed seats on this plan." },
};

export const Danger: Story = {
  args: { variant: 'danger', title: 'Something went wrong', children: 'Try emailing us directly at hello@kaistrum.com.' },
};

export const Dismissible: Story = {
  args: { variant: 'info', title: 'New feature', children: 'Remote sensing alerts are now available in beta.', onDismiss: fn() },
};

export const NoTitle: Story = {
  args: { variant: 'info', children: 'This deployment uses the default retention policy (30 days).' },
};
