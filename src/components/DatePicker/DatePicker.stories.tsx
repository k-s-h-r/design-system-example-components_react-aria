import { parseDate, today, getLocalTimeZone, type CalendarDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Calendar, CalendarCell, CalendarGrid } from '../Calendar';
import { Button } from '../Button';
import {
  DatePicker,
  DatePickerCalendarButton,
  DatePickerDialog,
  DatePickerInput,
  DatePickerPopover,
} from './DatePicker';

const meta = {
  title: 'Component/DatePicker（作業中）',
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
    >
      <div className='flex items-start gap-2'>
        <DatePickerInput />
        <DatePickerCalendarButton />
      </div>
      <DatePickerPopover>
        <DatePickerDialog>
          <Calendar aria-label='日付を選択'>
            <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
          </Calendar>
        </DatePickerDialog>
      </DatePickerPopover>
    </DatePicker>
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
          aria-label='日付'
          errorMessage={isInvalid ? '＊日付を入力してください。' : undefined}
          isInvalid={isInvalid}
          label='日付'
          onChange={(nextValue) => {
            setValue((nextValue as CalendarDate) ?? null);
            setIsInvalid(false);
          }}
          requirement='required'
          value={value}
        >
          <div className='flex items-start gap-2'>
            <DatePickerInput />
            <DatePickerCalendarButton />
          </div>
          <DatePickerPopover>
            <DatePickerDialog>
              <Calendar aria-label='日付を選択'>
                <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
              </Calendar>
            </DatePickerDialog>
          </DatePickerPopover>
        </DatePicker>
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
    >
      <div className='flex items-start gap-2'>
        <DatePickerInput />
        <DatePickerCalendarButton />
      </div>
    </DatePicker>
  ),
};
