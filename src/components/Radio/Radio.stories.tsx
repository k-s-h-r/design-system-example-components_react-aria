import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './';

const meta = {
  title: 'Component/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <RadioGroup defaultValue='1'>
        <Radio value='1'>選択肢1</Radio>
        <Radio value='2'>選択肢2</Radio>
        <Radio value='3'>選択肢3</Radio>
      </RadioGroup>
    </div>
  ),
};

export const Disabeld: Story = {
  render: () => (
    <RadioGroup isDisabled defaultValue='1'>
      <Radio value='1'>選択肢</Radio>
      <Radio value='2'>選択肢</Radio>
    </RadioGroup>
  ),
};

export const AriaDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue='1'>
      <Radio value='1' aria-disabled>
        選択肢
      </Radio>
      <Radio value='2' aria-disabled>
        選択肢
      </Radio>
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup isInvalid defaultValue='1'>
      <Radio value='1'>選択肢</Radio>
      <Radio value='2'>選択肢</Radio>
    </RadioGroup>
  ),
};

export const Readonly: Story = {
  render: () => (
    <RadioGroup isReadOnly defaultValue='1'>
      <Radio value='1'>選択肢</Radio>
      <Radio value='2'>選択肢</Radio>
    </RadioGroup>
  ),
};

export const Size: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <RadioGroup>
        <Radio value='1' size='sm'>
          smaill
        </Radio>
        <Radio value='2' size='md'>
          medium
        </Radio>
        <Radio value='3' size='lg'>
          large
        </Radio>
      </RadioGroup>
    </div>
  ),
};
