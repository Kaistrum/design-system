import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Feedback/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    surface: { control: 'select', options: ['surface', 'card', 'transparent'] },
    padding: { control: 'select', options: ['none', 'compact', 'standard', 'spacious'] },
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Infrastructure Deployment</CardTitle>
        <CardDescription>
          Enterprise-grade GIS infrastructure, hardened and benchmarked before handover.
        </CardDescription>
      </CardHeader>
      <p className="text-sm text-text-dim leading-relaxed">
        From geodatabase configuration to cloud architecture, we deliver fully hardened
        environments that scale with your organisation.
      </p>
    </Card>
  ),
};

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Data Migration</CardTitle>
        <CardDescription>Move legacy spatial data without losing a single record.</CardDescription>
      </CardHeader>
      <p className="text-xs uppercase tracking-[0.16em] text-accent font-medium flex items-center gap-1.5">
        Learn more <ArrowRight size={11} style={{ transform: 'rotate(-45deg)' }} />
      </p>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Starter plan</CardTitle>
        <CardDescription>For teams getting their first deployment live.</CardDescription>
      </CardHeader>
      <p className="text-3xl font-semibold text-text">$0<span className="text-sm text-text-muted font-normal"> / seat</span></p>
      <CardFooter>
        <Button variant="primary" size="sm" fullWidth>Get started</Button>
      </CardFooter>
    </Card>
  ),
};

export const Surfaces: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4">
      <Card surface="surface"><CardTitle>surface</CardTitle></Card>
      <Card surface="card"><CardTitle>card</CardTitle></Card>
      <Card surface="transparent"><CardTitle>transparent</CardTitle></Card>
    </div>
  ),
};
