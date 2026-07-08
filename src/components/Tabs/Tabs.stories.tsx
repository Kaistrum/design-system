import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { defaultValue: 'deployment', children: null },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Tabs {...args} className="max-w-xl">
      <TabsList>
        <TabsTrigger value="deployment">Infrastructure Deployment</TabsTrigger>
        <TabsTrigger value="migration">Data Migration</TabsTrigger>
        <TabsTrigger value="development">Custom Development</TabsTrigger>
      </TabsList>
      <TabsContent value="deployment" className="py-6 text-sm text-text-dim leading-relaxed">
        Enterprise-grade GIS infrastructure, hardened and benchmarked before handover.
      </TabsContent>
      <TabsContent value="migration" className="py-6 text-sm text-text-dim leading-relaxed">
        Move legacy spatial data across platforms with zero-downtime strategies.
      </TabsContent>
      <TabsContent value="development" className="py-6 text-sm text-text-dim leading-relaxed">
        Bespoke web and mobile GIS applications, tightly integrated with your workflows.
      </TabsContent>
    </Tabs>
  ),
};
