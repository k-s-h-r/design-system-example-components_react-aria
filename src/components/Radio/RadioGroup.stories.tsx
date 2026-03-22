import type { Meta } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button, Description, FieldError, Label, Requirements } from '@/components';
import { Radio, RadioGroup } from './';

const meta = {
  title: 'Component/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    label: 'ラベル',
    description: 'サポートテキスト',
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        component:
          '`label` / `description` / `errorMessage` / `requirement` の convenience props と、`<Label />` / `<Description />` / `<FieldError />` を children に置く composition の両方をサポートします。',
      },
    },
  },
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Example = (args) => (
  <RadioGroup {...args}>
    <Radio value='1'>選択肢1</Radio>
    <Radio value='2'>選択肢2</Radio>
    <Radio value='3'>選択肢3</Radio>
    <Radio value='4'>選択肢4</Radio>
  </RadioGroup>
);

export const Disabeld = (args) => <Example {...args} />;

Disabeld.args = {
  isDisabled: true,
};

export const AriaDisabled = (args) => (
  <RadioGroup {...args} defaultValue='3'>
    <Radio value='1' aria-disabled>
      選択肢1
    </Radio>
    <Radio value='2' aria-disabled>
      選択肢2
    </Radio>
    <Radio value='3'>選択肢3</Radio>
    <Radio value='4'>選択肢4</Radio>
  </RadioGroup>
);

export const Horizontal = (args) => <Example {...args} />;

Horizontal.args = {
  orientation: 'horizontal',
};

export const Composition = (args) => (
  <RadioGroup {...args} description={undefined} errorMessage={undefined} label={undefined}>
    <Label>
      ラベル<Requirements variant='required'>※必須</Requirements>
    </Label>
    <Description>サポートテキスト</Description>
    <Radio value='1'>選択肢1</Radio>
    <Radio value='2'>選択肢2</Radio>
    <Radio value='3'>選択肢3</Radio>
    <Radio value='4'>選択肢4</Radio>
    <FieldError>1つ選択してください。</FieldError>
  </RadioGroup>
);

Composition.args = {
  isRequired: true,
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
  errorMessage: '1つ選択してください。',
};
