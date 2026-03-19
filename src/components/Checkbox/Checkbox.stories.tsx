import type { Meta } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Component/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Example = (_args) => (
  <div className='flex flex-col gap-1'>
    <Checkbox value='1' isSelected>
      選択肢
    </Checkbox>
    <Checkbox value='2'>選択肢</Checkbox>
  </div>
);

export const Disabeld = (_args) => (
  <div className='flex flex-col gap-1'>
    <Checkbox value='3' isDisabled isSelected>
      選択肢
    </Checkbox>
    <Checkbox value='3' isDisabled>
      選択肢
    </Checkbox>
  </div>
);

export const Invalid = (_args) => (
  <div className='flex flex-col gap-1'>
    <Checkbox value='1' isInvalid isSelected>
      選択肢
    </Checkbox>
    <Checkbox value='2' isInvalid>
      選択肢
    </Checkbox>
  </div>
);

export const Readonly = (_args) => (
  <div className='flex flex-col gap-1'>
    <Checkbox value='1' isReadOnly isSelected>
      選択肢
    </Checkbox>
    <Checkbox value='2' isReadOnly>
      選択肢
    </Checkbox>
  </div>
);

export const Indeterminate = (_args) => (
  <div className='flex flex-col gap-1'>
    <Checkbox value='1' isIndeterminate>
      選択肢
    </Checkbox>
    <Checkbox value='2' isIndeterminate isDisabled>
      選択肢
    </Checkbox>
  </div>
);

export const Size = (_args) => (
  <div className='flex flex-col gap-1'>
    <Checkbox size='sm'>smaill</Checkbox>
    <Checkbox size='md'>medium</Checkbox>
    <Checkbox size='lg'>large</Checkbox>
  </div>
);
