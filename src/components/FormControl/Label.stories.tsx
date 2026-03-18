import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const labelPatterns = [
  { children: 'ラベル', size: 'sm' as const, bold: false, isDisabled: false },
  { children: 'ラベル(size: medium)', size: 'md' as const, bold: false, isDisabled: false },
  { children: 'ラベル(size: large)', size: 'lg' as const, bold: false, isDisabled: false },
  {
    children: 'ラベル(size: small, bold: true)',
    size: 'sm' as const,
    bold: true,
    isDisabled: false,
  },
  {
    children: 'ラベル(size: medium, bold: true)',
    size: 'md' as const,
    bold: true,
    isDisabled: false,
  },
  {
    children: 'ラベル(size: large, bold: true)',
    size: 'lg' as const,
    bold: true,
    isDisabled: false,
  },
];

const meta = {
  title: 'Component/FormControl/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {labelPatterns.map(({ children, size, bold }) => (
        <Label key={`${size}-${bold}-${children}`} size={size} bold={bold}>
          {children}
        </Label>
      ))}
    </div>
  ),
};
