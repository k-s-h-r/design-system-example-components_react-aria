import type { Meta } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button, InputText, TextArea } from '@/components';
import { TextField } from './';

const meta = {
  title: 'Component/FormControl/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    className: 'flex gap-2 flex-col',
  },
  parameters: {
    docs: {
      description: {
        component: `
\`TextField\` は \`react-aria-components\` の \`TextField\` を薄く包んだ wrapper です。

親の \`TextField\` に \`isRequired\` / \`isInvalid\` / \`isDisabled\` / \`isReadOnly\` を渡すと、子の \`InputText\` と \`TextArea\` が React Aria の context を通じて連動します。

\`label\` / \`description\` / \`errorMessage\` / \`requirement\` は convenience props として指定でき、必要なら従来どおり \`<Label />\` / \`<Description />\` / \`<FieldError />\` を children に置く書き方も使えます。

このため、入力部だけに状態を個別で渡さなくても、フォーム項目単位で意味付けと見た目をまとめて扱えます。`,
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField description='サポートテキスト' label='ラベル' {...args}>
      <InputText />
    </TextField>

    <TextField description='サポートテキスト' label='ラベル' requirement='optional' {...args}>
      <InputText />
    </TextField>

    <TextField description='サポートテキスト' label='ラベル' requirement='optional' {...args}>
      <TextArea rows={5} />
    </TextField>

    <TextField
      description='サポートテキスト'
      isRequired
      label='ラベル'
      defaultValue='入力済の内容が入ります。入力済の内容が入ります。入力済の内容が入ります。'
      {...args}
    >
      <InputText />
    </TextField>

    <TextField
      description='サポートテキスト'
      errorMessage='＊エラーテキスト'
      isInvalid={true}
      isRequired
      label='ラベル'
      {...args}
    >
      <InputText />
    </TextField>

    <TextField description='サポートテキスト' isDisabled={true} label='ラベル' {...args}>
      <InputText />
    </TextField>
  </div>
);

export const StateFromParent = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField
      defaultValue='入力済の内容'
      description='親 TextField の isReadOnly が子 InputText に伝播します。'
      isReadOnly
      label='readOnly な Input'
      {...args}
    >
      <InputText />
    </TextField>

    <TextField
      defaultValue='入力済の内容'
      description='親 TextField の isDisabled が子 InputText に伝播します。'
      isDisabled
      label='disabled な Input'
      {...args}
    >
      <InputText />
    </TextField>

    <TextField
      defaultValue='複数行の内容'
      description='親 TextField の isReadOnly が子 TextArea に伝播します。'
      isReadOnly
      label='readOnly な TextArea'
      {...args}
    >
      <TextArea rows={5} />
    </TextField>

    <TextField
      defaultValue='複数行の内容'
      description='親 TextField の isDisabled が子 TextArea に伝播します。'
      isDisabled
      label='disabled な TextArea'
      {...args}
    >
      <TextArea rows={5} />
    </TextField>
  </div>
);

export const Textarea = (args) => (
  <TextField description='サポートテキスト' label='ラベル' requirement='optional' {...args}>
    <TextArea rows={5} />
  </TextField>
);

export const Validation = (args) => (
  <Form className='flex flex-col gap-2 items-start'>
    <TextField
      description='サポートテキスト'
      errorMessage='＊エラーテキスト'
      isRequired
      label='ラベル'
      {...args}
    >
      <InputText />
    </TextField>
    <Button type='submit' variant='secondary'>
      Submit
    </Button>
  </Form>
);
