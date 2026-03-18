import type { Meta } from '@storybook/react';
import { TextField } from '@/components';
import { TextArea } from './TextArea';

const meta = {
  title: 'Component/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    className: 'flex gap-2 flex-col',
  },
} satisfies Meta<typeof TextArea>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField {...args}>
      <TextArea />
    </TextField>
  </div>
);

export const Disabled = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isDisabled {...args}>
      <TextArea />
    </TextField>
  </div>
);

export const Invalid = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isInvalid {...args}>
      <TextArea />
    </TextField>
  </div>
);

export const ReadOnly = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField isReadOnly {...args}>
      <TextArea defaultValue={'デフォルトテキスト'} />
    </TextField>
  </div>
);
