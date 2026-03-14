import type { Meta } from '@storybook/react';
import { TextField } from '@/components';
import { Input, Label } from './';

const meta = {
  title: 'Component/Field-Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    className: 'flex gap-2 flex-col',
  },
} satisfies Meta<typeof Input>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField {...args}>
      <Input />
    </TextField>
  </div>
);

export const Disabled = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isDisabled {...args}>
      <Input />
    </TextField>
  </div>
);

export const Invalid = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isInvalid {...args}>
      <Input />
    </TextField>
  </div>
);

export const ReadOnly = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isReadOnly {...args}>
      <Input defaultValue={'デフォルトテキスト'} />
    </TextField>
  </div>
);

export const Size = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField {...args}>
      <Label>サイズ: small</Label>
      <Input size='sm' />
    </TextField>
    <TextField {...args}>
      <Label>サイズ: medium</Label>
      <Input size='md' />
    </TextField>
    <TextField {...args}>
      <Label>サイズ: large</Label>
      <Input size='lg' />
    </TextField>
  </div>
);
