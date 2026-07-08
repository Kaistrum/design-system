import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta = {
  title: 'Navigation/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { type: 'single', defaultValue: 'sla', children: null },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Accordion {...args} className="max-w-lg">
      <AccordionItem value="sla">
        <AccordionTrigger>What's included in the SLA?</AccordionTrigger>
        <AccordionContent>
          24/7 monitoring, a dedicated account manager, and guaranteed response times
          based on severity — from 1 hour for critical incidents to 1 business day for
          general questions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="migration">
        <AccordionTrigger>How long does a typical migration take?</AccordionTrigger>
        <AccordionContent>
          Most geodatabase migrations complete in 2–4 weeks depending on data volume and
          topology complexity, with zero-downtime cutover for live production systems.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="training">
        <AccordionTrigger>Is training included?</AccordionTrigger>
        <AccordionContent>
          Every deployment includes onboarding training. Ongoing workshops are available
          as a separate service, tailored to your platform and team roles.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['sla', 'migration'], children: null },
  render: Default.render,
};
