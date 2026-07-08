import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';

const meta = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    spacing: { control: 'select', options: ['standard', 'hero', 'compact'] },
    surface: { control: 'select', options: ['bg', 'surface', 'transparent'] },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Section {...args}>
      <p className="text-[10px] uppercase tracking-[0.22em] text-accent font-medium mb-4">Section label</p>
      <h2 className="text-3xl font-semibold text-text">A page section</h2>
    </Section>
  ),
};

export const OnSurface: Story = {
  args: { surface: 'surface' },
  render: Default.render,
};
