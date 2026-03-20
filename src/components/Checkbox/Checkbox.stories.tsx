import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Component/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <Checkbox value='1' isSelected>
        選択肢
      </Checkbox>
      <Checkbox value='2'>選択肢</Checkbox>
    </div>
  ),
};

export const Standalone: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <Checkbox value='1'></Checkbox>
    </div>
  ),
};

export const Disabeld: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <Checkbox value='3' isDisabled isSelected>
        選択肢
      </Checkbox>
      <Checkbox value='3' isDisabled>
        選択肢
      </Checkbox>
    </div>
  ),
};

export const AriaDisabled: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <Checkbox value='1' aria-disabled isSelected>
        選択肢
      </Checkbox>
      <Checkbox value='2' aria-disabled>
        選択肢
      </Checkbox>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <Checkbox value='1' isInvalid isSelected>
        選択肢
      </Checkbox>
      <Checkbox value='2' isInvalid>
        選択肢
      </Checkbox>
    </div>
  ),
};

export const Readonly: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <Checkbox value='1' isReadOnly isSelected>
        選択肢
      </Checkbox>
      <Checkbox value='2' isReadOnly>
        選択肢
      </Checkbox>
    </div>
  ),
};

function IndeterminateExample() {
  const childOptions = [
    { value: 'news', label: 'お知らせを受け取る' },
    { value: 'event', label: 'イベント情報を受け取る' },
    { value: 'campaign', label: 'キャンペーン情報を受け取る' },
  ] as const;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const isAllSelected = selectedValues.length === childOptions.length;
  const isIndeterminate = selectedValues.length > 0 && !isAllSelected;

  const handleParentChange = (nextValue: boolean) => {
    setSelectedValues(nextValue ? childOptions.map((option) => option.value) : []);
  };

  const handleChildChange = (value: string, nextValue: boolean) => {
    setSelectedValues((prevValues) =>
      nextValue ? [...prevValues, value] : prevValues.filter((item) => item !== value),
    );
  };

  const handleReset = () => setSelectedValues([]);

  return (
    <div className='flex flex-col gap-3'>
      <Checkbox
        value='all'
        isSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onChange={handleParentChange}
      >
        すべて選択
      </Checkbox>
      <div className='pl-6 flex flex-col gap-1'>
        {childOptions.map((option) => (
          <Checkbox
            key={option.value}
            value={option.value}
            isSelected={selectedValues.includes(option.value)}
            onChange={(nextValue) => handleChildChange(option.value, nextValue)}
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
      <div className='flex items-center gap-3'>
        <Button size='sm' variant='secondary' onPress={handleReset}>
          すべて解除
        </Button>
        <p className='text-dns-14N-130 text-solid-gray-700'>
          {isIndeterminate ? '一部選択' : isAllSelected ? 'すべて選択' : '未選択'}
        </p>
      </div>
      <Checkbox value='2' isIndeterminate isDisabled>
        選択肢
      </Checkbox>
    </div>
  );
}

export const Indeterminate: Story = {
  render: () => <IndeterminateExample />,
};

export const Size: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <Checkbox size='sm'>smaill</Checkbox>
      <Checkbox size='md'>medium</Checkbox>
      <Checkbox size='lg'>large</Checkbox>
    </div>
  ),
};
