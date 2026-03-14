import type { Meta } from '@storybook/react';
import { Form } from 'react-aria-components';
import {
  Button,
  Description,
  FieldError,
  Input,
  Label,
  RequirementBadge,
  TextArea,
} from '@/components';
import { TextField } from './';

const meta = {
  title: 'Component/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    className: 'flex gap-2 flex-col',
  },
} satisfies Meta<typeof TextField>;

export default meta;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Example = (args: any) => (
  <div className='flex flex-col gap-8'>
    <TextField {...args}>
      <Label>ラベル</Label>
      <Description>サポートテキスト</Description>
      <Input />
    </TextField>

    <TextField {...args}>
      <Label>
        ラベル<RequirementBadge isOptional={true}>任意</RequirementBadge>
      </Label>
      <Description>サポートテキスト</Description>
      <Input />
    </TextField>

    <TextField {...args}>
      <Label>
        ラベル<RequirementBadge isOptional={true}>任意</RequirementBadge>
      </Label>
      <Description>サポートテキスト</Description>
      <TextArea rows={5} />
    </TextField>

    <TextField
      isRequired
      defaultValue='入力済の内容が入ります。入力済の内容が入ります。入力済の内容が入ります。'
      {...args}
    >
      <Label>
        ラベル<RequirementBadge>※必須</RequirementBadge>
      </Label>
      <Description>サポートテキスト</Description>
      <Input />
    </TextField>

    <TextField isInvalid={true} aria-invalid={true} isRequired {...args}>
      <Label>
        ラベル<RequirementBadge>※必須</RequirementBadge>
      </Label>
      <Description>サポートテキスト</Description>
      <Input />
      <FieldError>＊エラーテキスト</FieldError>
    </TextField>

    <TextField isDisabled={true} {...args}>
      <Label>ラベル</Label>
      <Description>サポートテキスト</Description>
      <Input />
      <TextField />
    </TextField>
  </div>
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Textarea = (args: any) => (
  <TextField {...args}>
    <Label>
      ラベル<RequirementBadge isOptional={true}>任意</RequirementBadge>
    </Label>
    <Description>サポートテキスト</Description>
    <TextArea rows={5} />
  </TextField>
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Validation = (args: any) => (
  <Form className='flex flex-col gap-2 items-start'>
    <TextField isRequired {...args}>
      <Label>
        ラベル<RequirementBadge>※必須</RequirementBadge>
      </Label>
      <Description>サポートテキスト</Description>
      <Input />
      <FieldError />
    </TextField>
    <Button type='submit' variant='secondary'>
      Submit
    </Button>
  </Form>
);
