import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled({ totalPages }: { totalPages: number }) {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />;
}

export const Default: Story = {
  args: { page: 1, totalPages: 5, onPageChange: () => {} },
  render: () => <Controlled totalPages={5} />,
};

export const ManyPages: Story = {
  args: { page: 1, totalPages: 20, onPageChange: () => {} },
  render: () => <Controlled totalPages={20} />,
};
