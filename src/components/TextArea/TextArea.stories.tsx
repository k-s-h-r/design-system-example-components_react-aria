import type { Meta } from '@storybook/react';
import { TextField } from '@/components';
import { TextArea } from './TextArea';

const meta = {
  title: 'Component/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TextArea>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField defaultValue='デフォルトテキスト'>
      <TextArea {...args} />
    </TextField>
  </div>
);

export const Disabled = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isDisabled defaultValue='デフォルトテキスト'>
      <TextArea {...args} />
    </TextField>
  </div>
);

export const AriaDisabled = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField defaultValue='デフォルトテキスト'>
      <TextArea {...args} aria-disabled />
    </TextField>
  </div>
);

export const Invalid = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isInvalid defaultValue='デフォルトテキスト'>
      <TextArea {...args} />
    </TextField>
  </div>
);

export const ReadOnly = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isReadOnly defaultValue='デフォルトテキスト'>
      <TextArea {...args} />
    </TextField>
  </div>
);
