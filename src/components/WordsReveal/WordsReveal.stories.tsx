import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordsReveal } from './WordsReveal';

const meta = {
  title: 'Primitives/WordsReveal',
  component: WordsReveal,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { segments: [{ text: 'Preview' }] },
} satisfies Meta<typeof WordsReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <div className="text-3xl md:text-4xl leading-[1.08]">
      <WordsReveal
        justify="start"
        segments={[
          { text: 'Every service you need,', className: 'font-semibold text-text' },
          { text: ' one partner.', className: 'font-normal italic font-serif text-text-dim' },
        ]}
      />
    </div>
  ),
};

export const Centered: Story = {
  args: {},
  render: () => (
    <div className="text-4xl md:text-5xl leading-[0.95] text-center">
      <WordsReveal
        justify="center"
        segments={[
          { text: "Let's map", className: 'font-semibold text-text' },
          { text: ' your next project.', className: 'font-normal italic font-serif text-text-dim' },
        ]}
      />
    </div>
  ),
};
