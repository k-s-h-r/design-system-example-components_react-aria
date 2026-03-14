import type { Meta } from '@storybook/react';
import React from 'react';
import { Label } from './Label';

const meta = {
  title: 'Component/Field-Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <Label>ラベル</Label>
    <Label isDisabled={true}>ラベル(isDisabled)</Label>
    <Label size='sm'>ラベル(size: small)</Label>
    <Label size='md'>ラベル(size: medium)</Label>
    <Label size='lg'>ラベル(size: large)</Label>
    <Label size='sm' bold={true}>
      ラベル(size: small, bold: true)
    </Label>
    <Label size='md' bold={true}>
      ラベル(size: medium, bold: true)
    </Label>
    <Label size='lg' bold={true}>
      ラベル(size: large, bold: true)
    </Label>
  </div>
);
