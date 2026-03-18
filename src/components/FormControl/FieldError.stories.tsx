import type { Meta } from '@storybook/react';
import { TextField } from '@/components';
import { FieldError } from './FieldError';

const meta = {
  title: 'Component/FormControl/FieldError',
  component: FieldError,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldError>;

export default meta;

export const Example = (_args) => (
  <div className='flex f_argscol gap-8'>
    <TextField isInvalid>
      <FieldError>＊エラーテキスト</FieldError>
    </TextField>
  </div>
);
