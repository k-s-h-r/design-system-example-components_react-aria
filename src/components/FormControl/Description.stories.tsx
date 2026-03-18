import type { Meta } from '@storybook/react';
import { Description } from './Description';

const meta = {
  title: 'Component/FormControl/Description',
  component: Description,
  tags: ['autodocs'],
} satisfies Meta<typeof Description>;

export default meta;

export const Example = (_args) => (
  <div className='flex flex-col gap-8'>
    <Description>サポートテキスト</Description>
  </div>
);
