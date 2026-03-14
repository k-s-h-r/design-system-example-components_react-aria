import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button, Description, FieldError, Label, RequirementBadge } from '@/components';
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
type Story = StoryObj<typeof meta>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Example = (args: any) => (
  <RadioGroup {...args}>
    <Label>
      ラベル<RequirementBadge isOptional={true}>任意</RequirementBadge>
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Disabeld = (args: any) => <Example {...args} />;
Disabeld.args = {
  isDisabled: true,
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Validation = (args: any) => (
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
