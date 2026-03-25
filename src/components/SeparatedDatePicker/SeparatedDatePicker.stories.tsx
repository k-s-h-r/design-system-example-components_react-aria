import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  SeparatedDatePicker,
  SeparatedDatePickerCalendarButton,
  SeparatedDatePickerDate,
  SeparatedDatePickerMonth,
  SeparatedDatePickerYear,
} from './SeparatedDatePicker';

const meta = {
  title: 'Component/DatePicker（作業中）/Separated',
  component: SeparatedDatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof SeparatedDatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <SeparatedDatePicker description='例：2025年03月23日' label='日付' requirement='required'>
      <SeparatedDatePickerYear defaultValue='2025' />
      <SeparatedDatePickerMonth defaultValue='03' />
      <SeparatedDatePickerDate defaultValue='23' />
      <SeparatedDatePickerCalendarButton />
    </SeparatedDatePicker>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <SeparatedDatePicker
      description='編集不可の例'
      isReadOnly
      label='日付'
      requirement='readonly'
    >
      <SeparatedDatePickerYear defaultValue='2025' isReadOnly />
      <SeparatedDatePickerMonth defaultValue='03' isReadOnly />
      <SeparatedDatePickerDate defaultValue='23' isReadOnly />
      <SeparatedDatePickerCalendarButton />
    </SeparatedDatePicker>
  ),
};

export const Invalid: Story = {
  render: () => (
    <SeparatedDatePicker errorMessage='＊正しい日付を入力してください。' isInvalid label='日付'>
      <SeparatedDatePickerYear defaultValue='2025' isInvalid />
      <SeparatedDatePickerMonth defaultValue='13' isInvalid />
      <SeparatedDatePickerDate defaultValue='40' isInvalid />
      <SeparatedDatePickerCalendarButton />
    </SeparatedDatePicker>
  ),
};
