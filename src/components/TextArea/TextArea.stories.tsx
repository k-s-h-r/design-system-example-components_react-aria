import type { Meta } from '@storybook/react';
import { TextArea } from './TextArea';

const meta = {
  title: 'Component/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TextArea>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-4'>
    <TextArea {...args} defaultValue='デフォルトテキスト' />
  </div>
);

export const Disabled = (args) => (
  <div className='flex flex-col gap-4'>
    <TextArea {...args} disabled defaultValue='編集不可テキスト' />
  </div>
);

export const AriaDisabled = (args) => (
  <div className='flex flex-col gap-4'>
    <TextArea {...args} aria-disabled defaultValue='デフォルトテキスト' />
  </div>
);

export const Invalid = (args) => (
  <div className='flex flex-col gap-4'>
    <TextArea {...args} aria-invalid defaultValue='デフォルトテキスト' />
  </div>
);

export const ReadOnly = (args) => (
  <div className='flex flex-col gap-4'>
    <TextArea {...args} readOnly defaultValue='デフォルトテキスト' />
  </div>
);
