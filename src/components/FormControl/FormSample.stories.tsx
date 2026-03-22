import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button, InputText, SelectField, TextArea, TextField } from '@/components';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Radio, RadioGroup } from '../Radio';
import { Select, SelectItem } from '../Select';

const meta = {
  title: 'Component/FormControl/FormSample',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <Form className='flex max-w-2xl flex-col gap-8 p-8'>
      <TextField
        className='flex flex-col gap-2'
        description='氏名を入力してください。'
        isRequired
        label='氏名'
      >
        <InputText placeholder='デジタル 太郎' />
      </TextField>

      <TextField
        className='flex flex-col gap-2'
        description='補足があれば自由に記入してください。'
        label='お問い合わせ内容'
        requirement='optional'
      >
        <TextArea rows={5} placeholder='ご用件を入力してください。' />
      </TextField>

      <TextField
        className='flex flex-col gap-2'
        defaultValue='現在の登録内容です。'
        description='登録済み情報のため編集できません。'
        isReadOnly
        label='登録メールアドレス'
        requirement='readonly'
      >
        <InputText />
      </TextField>

      <TextField
        className='flex flex-col gap-2'
        description='この項目は現在利用できません。'
        isDisabled
        label='組織コード'
        requirement='disabled'
      >
        <InputText placeholder='自動で設定されます。' />
      </TextField>

      <CheckboxGroup
        className='flex flex-col gap-2'
        description='当てはまるものをすべて選択してください。'
        label='関心のある分野'
        requirement='optional'
      >
        <Checkbox value='design-system'>デザインシステム</Checkbox>
        <Checkbox value='accessibility'>アクセシビリティ</Checkbox>
        <Checkbox value='frontend'>フロントエンド実装</Checkbox>
      </CheckboxGroup>

      <RadioGroup
        className='flex flex-col gap-2'
        description='希望する連絡手段を1つ選択してください。'
        isRequired
        label='返信方法'
      >
        <Radio value='email'>メール</Radio>
        <Radio value='phone'>電話</Radio>
        <Radio value='none'>返信不要</Radio>
      </RadioGroup>

      <SelectField description='お住まいの都道府県を選択してください。' isRequired label='都道府県'>
        <Select defaultValue='tokyo'>
          <SelectItem value='hokkaido'>北海道</SelectItem>
          <SelectItem value='tokyo'>東京都</SelectItem>
          <SelectItem value='aichi'>愛知県</SelectItem>
          <SelectItem value='osaka'>大阪府</SelectItem>
          <SelectItem value='fukuoka'>福岡県</SelectItem>
        </Select>
      </SelectField>

      <div className='pt-2'>
        <Button type='submit' variant='secondary'>
          送信
        </Button>
      </div>
    </Form>
  ),
};
