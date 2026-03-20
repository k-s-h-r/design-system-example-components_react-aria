import type { Meta } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button } from '@/components';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Component/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  args: {
    label: 'ラベル',
    description: 'サポートテキスト',
    orientation: 'vertical',
  },
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

export const Example = (args) => (
  <CheckboxGroup {...args}>
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
  </CheckboxGroup>
);

export const Disabeld = (args) => <Example {...args} />;

Disabeld.args = {
  isDisabled: true,
};

export const AriaDisabled = (args) => (
  <CheckboxGroup {...args}>
    <Checkbox name='x' value='1' aria-disabled>
      選択肢1
    </Checkbox>
    <Checkbox name='x' value='2' aria-disabled>
      選択肢2
    </Checkbox>
    <Checkbox name='x' value='3'>
      選択肢3
    </Checkbox>
    <Checkbox name='x' value='4'>
      選択肢4
    </Checkbox>
  </CheckboxGroup>
);

export const Horizontal = (args) => <Example {...args} />;

Horizontal.args = {
  orientation: 'horizontal',
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
  errorMessage: '1つ以上選択してください。',
};
