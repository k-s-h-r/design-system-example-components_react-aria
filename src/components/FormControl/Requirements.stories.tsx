import type { Meta } from '@storybook/react';
import { Requirements } from './Requirements';

const meta = {
  title: 'Component/FormControl/Requirements',
  component: Requirements,
  tags: ['autodocs'],
} satisfies Meta<typeof Requirements>;

export default meta;

export const Required = (args) => (
  <div>
    <Requirements {...args}>※必須</Requirements>
  </div>
);

Required.args = {
  variant: 'required',
};

export const Optional = (args) => (
  <div>
    <Requirements {...args}>※任意</Requirements>
  </div>
);

Optional.args = {
  variant: 'optional',
};

export const Readonly = (args) => (
  <div>
    <Requirements {...args}>変更不可</Requirements>
  </div>
);

Readonly.args = {
  variant: 'readonly',
};

export const Disabled = (args) => (
  <div>
    <Requirements {...args}>無効</Requirements>
  </div>
);

Disabled.args = {
  variant: 'disabled',
};
