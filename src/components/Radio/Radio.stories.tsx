import type { Meta } from '@storybook/react';
import React from 'react';
import { Radio, RadioGroup } from './';

const meta = {
  title: 'Component/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Radio>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-1'>
    <RadioGroup {...args} defaultValue={'1'}>
      <Radio value='1'>選択肢1</Radio>
      <Radio value='2'>選択肢2</Radio>
      <Radio value='x'>選択肢3</Radio>
    </RadioGroup>
  </div>
);

export const Disabeld = (args) => (
  <RadioGroup {...args} isDisabled defaultValue={'1'}>
    <Radio value='1'>選択肢</Radio>
    <Radio value='2'>選択肢</Radio>
  </RadioGroup>
);

export const Invalid = (args) => (
  <RadioGroup {...args} isInvalid defaultValue={'1'}>
    <Radio value='1'>選択肢</Radio>
    <Radio value='2'>選択肢</Radio>
  </RadioGroup>
);

export const Readonly = (args) => (
  <RadioGroup {...args} isReadOnly defaultValue={'1'}>
    <Radio value='1'>選択肢</Radio>
    <Radio value='2'>選択肢</Radio>
  </RadioGroup>
);

export const Size = (args) => (
  <div className='flex flex-col gap-1'>
    <RadioGroup {...args}>
      <Radio value='1' size='sm'>
        smaill
      </Radio>
      <Radio value='2' size='md'>
        medium
      </Radio>
      <Radio value='x' size='lg'>
        large
      </Radio>
    </RadioGroup>
  </div>
);
