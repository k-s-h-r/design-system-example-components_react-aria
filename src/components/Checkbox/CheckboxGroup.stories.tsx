import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button, Description, FieldError, Label, RequirementBadge } from '@/components';
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
type Story = StoryObj<typeof meta>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Example = (args: any) => (
  <CheckboxGroup {...args}>
    <Label>
      ラベル<RequirementBadge isOptional={true}>任意</RequirementBadge>
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
