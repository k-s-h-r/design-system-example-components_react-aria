import type { Meta } from '@storybook/react';
import { Form } from 'react-aria-components';
import {
  Button,
  Description,
  FieldError,
  InputText,
  Label,
  Requirements,
  TextArea,
} from '@/components';
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

親の \`TextField\` に \`isRequired\` / \`isInvalid\` / \`isDisabled\` / \`isReadOnly\` を渡すと、子の \`Label\`、\`Description\`、\`FieldError\`、\`InputText\`、\`TextArea\` が React Aria の context と slot を通じて連動します。

このため、入力部だけに状態を個別で渡さなくても、フォーム項目単位で意味付けと見た目をまとめて扱えます。`,
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

export const Example = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField {...args}>
      <Label>ラベル</Label>
      <Description>サポートテキスト</Description>
      <InputText />
    </TextField>

    <TextField {...args}>
      <Label>
        ラベル<Requirements variant='optional'>任意</Requirements>
      </Label>
      <Description>サポートテキスト</Description>
      <InputText />
    </TextField>

    <TextField {...args}>
      <Label>
        ラベル<Requirements variant='optional'>任意</Requirements>
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
        ラベル<Requirements variant='required'>※必須</Requirements>
      </Label>
      <Description>サポートテキスト</Description>
      <InputText />
    </TextField>

    <TextField isInvalid={true} aria-invalid={true} isRequired {...args}>
      <Label>
        ラベル<Requirements variant='required'>※必須</Requirements>
      </Label>
      <Description>サポートテキスト</Description>
      <InputText />
      <FieldError>＊エラーテキスト</FieldError>
    </TextField>

    <TextField isDisabled={true} {...args}>
      <Label>ラベル</Label>
      <Description>サポートテキスト</Description>
      <InputText />
    </TextField>
  </div>
);

export const StateFromParent = (args) => (
  <div className='flex flex-col gap-8'>
    <TextField defaultValue='入力済の内容' isReadOnly {...args}>
      <Label>readOnly な Input</Label>
      <Description>親 TextField の isReadOnly が子 InputText に伝播します。</Description>
      <InputText />
    </TextField>

    <TextField defaultValue='入力済の内容' isDisabled {...args}>
      <Label>disabled な Input</Label>
      <Description>親 TextField の isDisabled が子 InputText に伝播します。</Description>
      <InputText />
    </TextField>

    <TextField defaultValue='複数行の内容' isReadOnly {...args}>
      <Label>readOnly な TextArea</Label>
      <Description>親 TextField の isReadOnly が子 TextArea に伝播します。</Description>
      <TextArea rows={5} />
    </TextField>

    <TextField defaultValue='複数行の内容' isDisabled {...args}>
      <Label>disabled な TextArea</Label>
      <Description>親 TextField の isDisabled が子 TextArea に伝播します。</Description>
      <TextArea rows={5} />
    </TextField>
  </div>
);

export const Textarea = (args) => (
  <TextField {...args}>
    <Label>
      ラベル<Requirements variant='optional'>任意</Requirements>
    </Label>
    <Description>サポートテキスト</Description>
    <TextArea rows={5} />
  </TextField>
);

export const Validation = (args) => (
  <Form className='flex flex-col gap-2 items-start'>
    <TextField isRequired {...args}>
      <Label>
        ラベル<Requirements variant='required'>※必須</Requirements>
      </Label>
      <Description>サポートテキスト</Description>
      <InputText />
      <FieldError />
    </TextField>
    <Button type='submit' variant='secondary'>
      Submit
    </Button>
  </Form>
);
