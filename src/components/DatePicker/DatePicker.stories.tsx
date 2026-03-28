import { type CalendarDate, getLocalTimeZone, parseDate, today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerCalendarButton,
  DatePickerContent,
  DatePickerDialog,
  DatePickerInput,
  DatePickerPopover,
} from './DatePicker';

const meta = {
  title: 'Component/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <DatePicker
      defaultValue={parseDate('2025-03-23')}
      description='例：2025年03月23日'
      label='日付'
      requirement='required'
    />
  ),
};

export const Validation: Story = {
  render: function Render() {
    const [isInvalid, setIsInvalid] = useState(false);
    const [value, setValue] = useState<CalendarDate | null>(null);

    return (
      <form
        className='flex flex-col items-start gap-4'
        onSubmit={(event) => {
          event.preventDefault();
          setIsInvalid(value == null);
        }}
      >
        <DatePicker
          errorMessage={isInvalid ? '＊日付を入力してください。' : undefined}
          isInvalid={isInvalid}
          label='日付'
          onChange={(nextValue) => {
            setValue((nextValue as CalendarDate) ?? null);
            setIsInvalid(false);
          }}
          requirement='required'
          value={value}
        />
        <div className='flex gap-4'>
          <Button type='submit' variant='secondary'>
            Submit
          </Button>
          <Button
            onPress={() => {
              const currentDate = today(getLocalTimeZone());
              setValue(currentDate);
              setIsInvalid(false);
            }}
            variant='tertiary'
          >
            今日
          </Button>
        </div>
      </form>
    );
  },
};

export const ReadOnly: Story = {
  render: () => (
    <DatePicker
      defaultValue={parseDate('2025-03-23')}
      description='編集不可の例'
      isReadOnly
      label='日付'
      requirement='readonly'
    />
  ),
};

export const WithCalendar: Story = {
  render: () => (
    <DatePicker
      defaultValue={parseDate('2025-03-23')}
      description='カレンダー付きの例'
      label='日付'
      requirement='required'
      withCalendar
    />
  ),
};

export const Composed: Story = {
  render: () => (
    <DatePicker
      defaultValue={parseDate('2025-03-23')}
      description='part を組み合わせた例'
      label='日付'
      requirement='required'
    >
      <DatePickerContent>
        <DatePickerInput />
        <DatePickerCalendarButton />
      </DatePickerContent>
      <DatePickerPopover>
        <DatePickerDialog>
          <DatePickerCalendar />
        </DatePickerDialog>
      </DatePickerPopover>
    </DatePicker>
  ),
};
