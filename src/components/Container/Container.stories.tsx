import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    width: { control: 'select', options: ['content', 'wide', 'narrow', 'full'] },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="bg-bg-surface border border-border p-6 text-sm text-text-dim">
        max-w-6xl mx-auto px-4 md:px-6 — the default content width
      </div>
    </Container>
  ),
};

export const AllWidths: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['narrow', 'content', 'wide', 'full'] as const).map((width) => (
        <Container key={width} width={width}>
          <div className="bg-bg-surface border border-border p-4 text-xs text-text-dim">{width}</div>
        </Container>
      ))}
    </div>
  ),
};
