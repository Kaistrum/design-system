import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '@/components/Button/Button';

const meta = {
  title: 'Navigation/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm deployment" size={size}>
        <p className="text-sm text-text-dim leading-relaxed mb-6">
          This will push the current configuration to production. Field crews using the
          mobile app will see the update within 5 minutes.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Deploy</Button>
        </div>
      </Modal>
    </>
  );
}

export const Default: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => <Demo />,
};

export const Small: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => <Demo size="sm" />,
};

export const Large: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => <Demo size="lg" />,
};
