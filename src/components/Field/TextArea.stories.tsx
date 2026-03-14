import type { Meta } from '@storybook/react';
import { TextField } from '@/components';
import { TextArea } from './TextArea';

const meta = {
  title: 'Component/Field-TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    className: 'flex gap-2 flex-col',
  },
} satisfies Meta<typeof TextArea>;

export default meta;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Example = (args: any) => (
  <div className='flex flex-col gap-8'>
    <TextField {...args}>
      <TextArea />
    </TextField>
  </div>
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Disabled = (args: any) => (
  <div className='flex flex-col gap-8'>
    <TextField isDisabled {...args}>
      <TextArea />
    </TextField>
  </div>
);
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Invalid = (args: any) => (
  <div className='flex flex-col gap-8'>
    <TextField isInvalid {...args}>
      <TextArea />
    </TextField>
  </div>
);
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const ReadOnly = (args: any) => (
  <div className='flex flex-col gap-8'>
    <TextField isReadOnly {...args}>
      <TextArea defaultValue={'デフォルトテキスト'} />
    </TextField>
  </div>
);
