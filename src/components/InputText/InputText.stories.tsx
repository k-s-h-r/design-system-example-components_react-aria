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
    <TextField defaultValue='デフォルトテキスト'>
      <InputText {...args} />
    </TextField>
  </div>
);

export const Disabled = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isDisabled defaultValue='デフォルトテキスト'>
      <InputText {...args} />
    </TextField>
  </div>
);

export const AriaDisabled = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField defaultValue='デフォルトテキスト'>
      <InputText {...args} aria-disabled />
    </TextField>
  </div>
);

export const Invalid = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isInvalid defaultValue='デフォルトテキスト'>
      <InputText {...args} />
    </TextField>
  </div>
);

export const ReadOnly = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isReadOnly defaultValue={'デフォルトテキスト'}>
      <InputText {...args} />
    </TextField>
  </div>
);

export const Size = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField>
      <Label>サイズ: small</Label>
      <InputText {...args} size='sm' />
    </TextField>
    <TextField>
      <Label>サイズ: medium</Label>
      <InputText {...args} size='md' />
    </TextField>
    <TextField>
      <Label>サイズ: large</Label>
      <InputText {...args} size='lg' />
    </TextField>
  </div>
);
