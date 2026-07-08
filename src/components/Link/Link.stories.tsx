import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  title: 'Navigation/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    href: '#',
    children: 'Read full case study',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Accent: Story = {
  args: { variant: 'accent' },
};

export const WithArrow: Story = {
  args: { variant: 'accent', arrow: true },
};

export const AsButton: Story = {
  args: { variant: 'button-primary', children: 'Contact us' },
};

export const External: Story = {
  args: { variant: 'accent', arrow: true, external: true, children: 'View on GitHub' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Link href="#" variant="default">Default</Link>
      <Link href="#" variant="accent" arrow>Accent + arrow</Link>
      <Link href="#" variant="button-primary">Button primary</Link>
      <Link href="#" variant="button-outline">Button outline</Link>
      <Link href="#" variant="button-ghost">Button ghost</Link>
    </div>
  ),
};
