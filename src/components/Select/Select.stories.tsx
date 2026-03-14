import type { Meta } from '@storybook/react';
import { Form, Label } from 'react-aria-components';
import { Button } from '@/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPopover,
  SelectSection,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './';

const meta: Meta<typeof Select> = {
  title: 'Component/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;

export const Example = (args) => (
  <Select {...args}>
    <Label>Ice cream flavor</Label>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectPopover>
      <SelectContent>
        <SelectItem>Chocolate</SelectItem>
        <SelectItem id='mint'>Mint</SelectItem>
        <SelectItem>Strawberry</SelectItem>
        <SelectItem>Vanilla</SelectItem>
      </SelectContent>
    </SelectPopover>
  </Select>
);

export const DisabledItems = (args) => <Example {...args} />;
DisabledItems.args = {
  disabledKeys: ['mint'],
};

export const Disabled = (args) => <Example {...args} />;
Disabled.args = {
  isDisabled: true,
};

export const Separator = (args) => (
  <Select {...args}>
    <Label>Ice cream flavor</Label>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectPopover>
      <SelectContent>
        <SelectItem>Chocolate</SelectItem>
        <SelectItem>Mint</SelectItem>
        <SelectSeparator />
        <SelectItem>Strawberry</SelectItem>
        <SelectSeparator />
        <SelectItem>Vanilla</SelectItem>
      </SelectContent>
    </SelectPopover>
  </Select>
);

export const Sections = (args) => (
  <Select>
    _args
    <Label>Ice cream flavor</Label>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectPopover>
      <SelectContent>
        <SelectSection title='Fruit'>
          <SelectItem id='Apple'>Apple</SelectItem>
          <SelectItem id='Banana'>Banana</SelectItem>
          <SelectItem id='Orange'>Orange</SelectItem>
          <SelectItem id='Honeydew'>Honeydew</SelectItem>
          <SelectItem id='Grapes'>Grapes</SelectItem>
          <SelectItem id='Watermelon'>Watermelon</SelectItem>
          <SelectItem id='Cantaloupe'>Cantaloupe</SelectItem>
          <SelectItem id='Pear'>Pear</SelectItem>
        </SelectSection>
        <SelectSection title='Vegetable'>
          <SelectItem id='Cabbage'>Cabbage</SelectItem>
          <SelectItem id='Broccoli'>Broccoli</SelectItem>
          <SelectItem id='Carrots'>Carrots</SelectItem>
          <SelectItem id='Lettuce'>Lettuce</SelectItem>
          <SelectItem id='Spinach'>Spinach</SelectItem>
          <SelectItem id='Bok Choy'>Bok Choy</SelectItem>
          <SelectItem id='Cauliflower'>Cauliflower</SelectItem>
          <SelectItem id='Potatoes'>Potatoes</SelectItem>
        </SelectSection>
      </SelectContent>
    </SelectPopover>
  </Select>
);

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

export const Size = (args) => (
  <div className='fle_argsex-col items-start gap-8'>
    <Select>
      <Label>Small</Label>
      <SelectTrigger size='sm'>
        <SelectValue />
      </SelectTrigger>
      <SelectPopover>
        <SelectContent>
          <SelectItem>Chocolate</SelectItem>
        </SelectContent>
      </SelectPopover>
    </Select>
    <Select>
      <Label>Small</Label>
      <SelectTrigger size='md'>
        <SelectValue />
      </SelectTrigger>
      <SelectPopover>
        <SelectContent>
          <SelectItem>Chocolate</SelectItem>
        </SelectContent>
      </SelectPopover>
    </Select>
    <Select>
      <Label>Small</Label>
      <SelectTrigger size='lg'>
        <SelectValue />
      </SelectTrigger>
      <SelectPopover>
        <SelectContent>
          <SelectItem>Chocolate</SelectItem>
        </SelectContent>
      </SelectPopover>
    </Select>
  </div>
);
