import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestimonialCard } from './TestimonialCard';

const meta = {
  title: 'Organisms/TestimonialCard',
  component: TestimonialCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    quote:
      'We replaced five separate GIS tools with Kaistrum and cut our licence cost by 35% in year one. The migration support was exceptional.',
    name: 'Dr. Asha Wangari',
    title: 'Director of Urban Planning, Nairobi County Government',
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-none">
      <TestimonialCard
        quote="We replaced five separate GIS tools with Kaistrum and cut our licence cost by 35% in year one."
        name="Dr. Asha Wangari"
        title="Director of Urban Planning, Nairobi County Government"
      />
      <TestimonialCard
        quote="Inspectors now capture gas leak reports with GPS coordinates, photos, and sensor readings in the field."
        name="James Ochieng"
        title="GIS Manager, Kenya Pipeline Company"
      />
      <TestimonialCard
        quote="The remote sensing module caught a landslide risk zone six weeks before the rainy season hit."
        name="Fatuma Al-Hassan"
        title="Head of Geospatial Operations, Tanzania TANESCO"
      />
    </div>
  ),
};
