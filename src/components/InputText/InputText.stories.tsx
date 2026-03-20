import type { Meta } from '@storybook/react';
import { Label } from '@/components';
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
  <div className='flex flex-col gap-4'>
    <InputText {...args} defaultValue='デフォルトテキスト' />
  </div>
);

export const Disabled = (args) => (
  <div className='flex flex-col gap-4'>
    <InputText {...args} disabled defaultValue='編集不可テキスト' />
  </div>
);

export const AriaDisabled = (args) => (
  <div className='flex flex-col gap-4'>
    <InputText {...args} aria-disabled defaultValue='デフォルトテキスト' />
  </div>
);

export const Invalid = (args) => (
  <div className='flex flex-col gap-4'>
    <InputText {...args} aria-invalid defaultValue='デフォルトテキスト' />
  </div>
);

export const ReadOnly = (args) => (
  <div className='flex flex-col gap-4'>
    <InputText {...args} readOnly defaultValue='デフォルトテキスト' />
  </div>
);

export const Size = (args) => (
  <div className='flex flex-col gap-8'>
    <div className='flex flex-col gap-2'>
      <Label>サイズ: small</Label>
      <InputText {...args} size='sm' />
    </div>
    <div className='flex flex-col gap-2'>
      <Label>サイズ: medium</Label>
      <InputText {...args} size='md' />
    </div>
    <div className='flex flex-col gap-2'>
      <Label>サイズ: large</Label>
      <InputText {...args} size='lg' />
    </div>
  </div>
);
