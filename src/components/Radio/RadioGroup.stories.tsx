import type { Meta } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button, Description, FieldError, Label, Requirements } from '@/components';
import { Radio, RadioGroup } from './';

const meta = {
  title: 'Component/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    className: 'flex gap-2 flex-col',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Example = (args) => (
  <RadioGroup {...args}>
    <Label>
      ラベル<Requirements variant='optional'>任意</Requirements>
    </Label>
    <Description>サポートテキスト</Description>
    <div className='flex flex-col'>
      <Radio value='1'>選択肢1</Radio>
      <Radio value='2'>選択肢2</Radio>
      <Radio value='3'>選択肢3</Radio>
      <Radio value='4'>選択肢4</Radio>
    </div>
    <FieldError />
  </RadioGroup>
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
