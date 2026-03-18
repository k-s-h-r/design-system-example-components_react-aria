import type { Meta } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button, Description, FieldError, Label, Requirements } from '@/components';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta = {
  title: 'Component/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  args: {
    className: 'flex gap-2 flex-col',
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

export const Example = (args) => (
  <CheckboxGroup {...args}>
    <Label>
      ラベル<Requirements variant='optional'>任意</Requirements>
    </Label>
    <Description>サポートテキスト</Description>
    <div className='flex flex-col'>
      <Checkbox name='x' value='1'>
        選択肢1
      </Checkbox>
      <Checkbox name='x' value='2'>
        選択肢2
      </Checkbox>
      <Checkbox name='x' value='3'>
        選択肢3
      </Checkbox>
      <Checkbox name='x' value='4'>
        選択肢4
      </Checkbox>
    </div>
    <FieldError />
  </CheckboxGroup>
);

export const Disabeld = (args) => <Example {...args} />;

Disabeld.args = {
  isDisabled: true,
};

export const Validation = (args) => (
  <Form className='flex flex-col gap-2 items-start'>
    <Example {...args} />
    <Button type='submit' variant='secondary'>
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
