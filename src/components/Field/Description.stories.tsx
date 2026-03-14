import type { Meta } from '@storybook/react';
import React from 'react';
import { Description } from './Description';

const meta = {
  title: 'Component/Field-Description',
  component: Description,
  tags: ['autodocs'],
} satisfies Meta<typeof Description>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <Description>サポートテキスト</Description>
  </div>
);
