import type { Meta } from '@storybook/react';
import { Label, TextField } from '@/components';
import { InputText } from './';

const meta = {
  title: 'Component/InputText',
  component: InputText,
  tags: ['autodocs'],
  args: {
    className: 'flex gap-2 flex-col',
  },
} satisfies Meta<typeof InputText>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField {...args}>
      <InputText />
    </TextField>
  </div>
);

export const Disabled = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isDisabled {...args}>
      <InputText />
    </TextField>
  </div>
);

export const Invalid = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isInvalid {...args}>
      <InputText />
    </TextField>
  </div>
);

export const ReadOnly = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isReadOnly {...args}>
      <InputText defaultValue={'デフォルトテキスト'} />
    </TextField>
  </div>
);

export const Size = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField {...args}>
      <Label>サイズ: small</Label>
      <InputText size='sm' />
    </TextField>
    <TextField {...args}>
      <Label>サイズ: medium</Label>
      <InputText size='md' />
    </TextField>
    <TextField {...args}>
      <Label>サイズ: large</Label>
      <InputText size='lg' />
    </TextField>
  </div>
);
