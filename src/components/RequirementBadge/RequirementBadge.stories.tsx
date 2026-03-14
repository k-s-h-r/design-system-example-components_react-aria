import type { Meta } from '@storybook/react';
import React from 'react';
import { RequirementBadge } from './';

const meta = {
  title: 'Component/RequirementBadge',
  component: RequirementBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof RequirementBadge>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <RequirementBadge {...args}>※必須</RequirementBadge>
  </div>
);

export const Optional = (args) => (
  <div className='flex flex-col gap-8'>
    <RequirementBadge isOptional={true}>任意</RequirementBadge>
  </div>
);
