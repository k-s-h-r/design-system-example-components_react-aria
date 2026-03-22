import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Form } from 'react-aria-components';
import { Button } from '@/components';
import { Select, SelectField, SelectItem, SelectSection } from './';

const meta = {
  title: 'Component/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    defaultValue: 'vanilla',
  },
} satisfies Meta<typeof Select>;

export default meta;

export const Example = (args) => (
  <SelectField description='好みのフレーバーを選択してください。' label='Ice cream flavor'>
    <Select {...args}>
      <SelectItem value='chocolate'>Chocolate</SelectItem>
      <SelectItem value='mint'>Mint</SelectItem>
      <SelectItem value='strawberry'>Strawberry</SelectItem>
      <SelectItem value='vanilla'>Vanilla</SelectItem>
    </Select>
  </SelectField>
);

export const DisabledItems = (args) => (
  <Select {...args}>
    <SelectItem value='chocolate'>Chocolate</SelectItem>
    <SelectItem disabled value='mint'>
      Mint
    </SelectItem>
    <SelectItem value='strawberry'>Strawberry</SelectItem>
    <SelectItem value='vanilla'>Vanilla</SelectItem>
  </Select>
);

export const Disabled = (args) => <Example {...args} />;
Disabled.args = {
  disabled: true,
};

export const AriaDisabled = (args) => <Example {...args} />;
AriaDisabled.args = {
  'aria-disabled': true,
};

export const Invalid = (args) => <Example {...args} />;
Invalid.args = {
  'aria-invalid': true,
};

export const Sections = (args) => (
  <Select {...args}>
    <SelectSection label='Fruit'>
      <SelectItem value='apple'>Apple</SelectItem>
      <SelectItem value='banana'>Banana</SelectItem>
      <SelectItem value='orange'>Orange</SelectItem>
    </SelectSection>
    <SelectSection label='Vegetable'>
      <SelectItem value='cabbage'>Cabbage</SelectItem>
      <SelectItem value='broccoli'>Broccoli</SelectItem>
      <SelectItem value='carrots'>Carrots</SelectItem>
    </SelectSection>
  </Select>
);

function ValidationExample(args) {
  const [value, setValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <Form
      className='flex flex-col gap-2 items-start'
      onSubmit={(event) => {
        if (value !== '') {
          return;
        }

        event.preventDefault();
        setIsInvalid(true);
      }}
    >
      <SelectField
        description='お住まいの都道府県を選択してください。'
        errorMessage='＊エラーテキスト'
        isInvalid={isInvalid}
        isRequired
        label='都道府県'
      >
        <Select
          {...args}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (event.target.value !== '') {
              setIsInvalid(false);
            }
          }}
        >
          <SelectItem disabled value=''>
            選択してください
          </SelectItem>
          <SelectItem value='hokkaido'>北海道</SelectItem>
          <SelectItem value='tokyo'>東京都</SelectItem>
          <SelectItem value='osaka'>大阪府</SelectItem>
        </Select>
      </SelectField>
      <Button type='submit' variant='secondary'>
        Submit
      </Button>
    </Form>
  );
}

export const Validation = (args) => <ValidationExample {...args} />;

export const Size = (_args) => (
  <div className='flex flex-col items-start gap-8'>
    <Select blockSize='sm' defaultValue='chocolate'>
      <SelectItem value='chocolate'>Chocolate</SelectItem>
    </Select>
    <Select blockSize='md' defaultValue='chocolate'>
      <SelectItem value='chocolate'>Chocolate</SelectItem>
    </Select>
    <Select blockSize='lg' defaultValue='chocolate'>
      <SelectItem value='chocolate'>Chocolate</SelectItem>
    </Select>
  </div>
);
