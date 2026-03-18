import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import {
  Button,
  Description,
  InputText,
  Label,
  Requirements,
  TextArea,
  TextField,
} from '@/components';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Radio, RadioGroup } from '../Radio';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '../Select';

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
      <TextField className='flex flex-col gap-2'>
        <Label>
          氏名
          <Requirements variant='required'>※必須</Requirements>
        </Label>
        <Description>氏名を入力してください。</Description>
        <InputText placeholder='デジタル 太郎' />
      </TextField>

      <TextField className='flex flex-col gap-2'>
        <Label>
          お問い合わせ内容
          <Requirements variant='optional'>任意</Requirements>
        </Label>
        <Description>補足があれば自由に記入してください。</Description>
        <TextArea rows={5} placeholder='ご用件を入力してください。' />
      </TextField>

      <TextField className='flex flex-col gap-2' isReadOnly defaultValue='現在の登録内容です。'>
        <Label>
          登録メールアドレス
          <Requirements variant='readonly'>変更不可</Requirements>
        </Label>
        <Description>登録済み情報のため編集できません。</Description>
        <InputText />
      </TextField>

      <TextField className='flex flex-col gap-2' isDisabled>
        <Label>
          組織コード
          <Requirements variant='disabled'>無効</Requirements>
        </Label>
        <Description>この項目は現在利用できません。</Description>
        <InputText placeholder='自動で設定されます。' />
      </TextField>

      <CheckboxGroup className='flex flex-col gap-2'>
        <Label>
          関心のある分野
          <Requirements variant='optional'>任意</Requirements>
        </Label>
        <Description>当てはまるものをすべて選択してください。</Description>
        <div className='flex flex-col gap-3'>
          <Checkbox value='design-system'>デザインシステム</Checkbox>
          <Checkbox value='accessibility'>アクセシビリティ</Checkbox>
          <Checkbox value='frontend'>フロントエンド実装</Checkbox>
        </div>
      </CheckboxGroup>

      <RadioGroup className='flex flex-col gap-2'>
        <Label>
          返信方法
          <Requirements variant='required'>※必須</Requirements>
        </Label>
        <Description>希望する連絡手段を1つ選択してください。</Description>
        <div className='flex flex-col gap-3'>
          <Radio value='email'>メール</Radio>
          <Radio value='phone'>電話</Radio>
          <Radio value='none'>返信不要</Radio>
        </div>
      </RadioGroup>

      <Select className='flex flex-col gap-2' defaultSelectedKey='tokyo'>
        <Label>
          都道府県
          <Requirements variant='required'>※必須</Requirements>
        </Label>
        <Description>お住まいの都道府県を選択してください。</Description>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopover>
          <SelectContent>
            <SelectItem id='hokkaido'>北海道</SelectItem>
            <SelectItem id='tokyo'>東京都</SelectItem>
            <SelectItem id='aichi'>愛知県</SelectItem>
            <SelectItem id='osaka'>大阪府</SelectItem>
            <SelectItem id='fukuoka'>福岡県</SelectItem>
          </SelectContent>
        </SelectPopover>
      </Select>

      <div className='pt-2'>
        <Button type='submit' variant='secondary'>
          送信
        </Button>
      </div>
    </Form>
  ),
};
