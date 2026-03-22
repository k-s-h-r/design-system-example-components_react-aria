import { type CalendarDate, getLocalTimeZone, parseDate, today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Heading as AriaHeading, type DateValue } from 'react-aria-components';
import { Button } from '../Button';
import { Calendar, CalendarCell, CalendarGrid, CalendarHeader } from './Calendar';

const meta = {
  title: 'Component/カレンダー',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

function ArrowLeftIcon() {
  return (
    <svg aria-hidden={true} className='mx-auto' fill='none' height='16' viewBox='0 0 16 16' width='16'>
      <path
        d='m5.27 8 5.33-5.33-.93-.94L3.4 8l6.27 6.27.93-.94L5.27 8Z'
        fill='currentColor'
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden={true} className='mx-auto' fill='none' height='16' viewBox='0 0 16 16' width='16'>
      <path
        d='m6 1.73-.93.94L10.4 8l-5.33 5.33.93.94L12.27 8 6 1.73Z'
        fill='currentColor'
      />
    </svg>
  );
}

const yearOptions = Array.from({ length: 13 }, (_, index) => {
  const year = 2018 + index;
  return (
    <option key={year} value={year}>
      {year}年
    </option>
  );
});

export const Basic: Story = {
  args: {
    'aria-label': '日付を選択',
    defaultValue: parseDate('2025-02-18'),
  },
  render: (args) => (
    <Calendar {...args}>
      <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
    </Calendar>
  ),
};

export const WithMonthYearNavigation: Story = {
  render: function Render() {
    const [value, setValue] = useState<DateValue | null>(parseDate('2025-02-18'));
    const [focusedDate, setFocusedDate] = useState(parseDate('2025-02-18'));

    return (
      <>
        <p className='mb-6'>
          選択中の日付：<output>{value?.toString() ?? '未選択'}</output>
        </p>
        <Calendar
          aria-label='日付を選択'
          focusedValue={focusedDate}
          onChange={(nextValue) => setValue(nextValue)}
          onFocusChange={(nextFocusedDate) => setFocusedDate(nextFocusedDate as CalendarDate)}
          value={value}
        >
          <CalendarHeader>
            <select
              aria-label='年'
              className='h-11 rounded-8 border border-solid-gray-600 bg-white px-4 text-std-16N-170'
              onChange={(event) =>
                setFocusedDate(focusedDate.set({ year: Number(event.target.value) }))
              }
              value={focusedDate.year}
            >
              {yearOptions}
            </select>
            <div className='flex items-center'>
              <Button
                aria-label='前の月'
                className='!size-11 !min-w-0 !p-0'
                onPress={() => setFocusedDate(focusedDate.subtract({ months: 1 }))}
                size='sm'
                slot='previous'
                variant='secondary'
              >
                <ArrowLeftIcon />
              </Button>
              <AriaHeading className='w-20 text-center text-std-16B-170' />
              <Button
                aria-label='次の月'
                className='!size-11 !min-w-0 !p-0'
                onPress={() => setFocusedDate(focusedDate.add({ months: 1 }))}
                size='sm'
                slot='next'
                variant='secondary'
              >
                <ArrowRightIcon />
              </Button>
            </div>
          </CalendarHeader>
          <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
          <div className='flex self-stretch justify-between gap-4 p-4'>
            <Button onPress={() => setValue(null)} size='sm' variant='tertiary'>
              削除
            </Button>
            <Button
              onPress={() => {
                const currentDate = today(getLocalTimeZone());
                setValue(currentDate);
                setFocusedDate(currentDate);
              }}
              size='sm'
              variant='secondary'
            >
              今日
            </Button>
          </div>
        </Calendar>
      </>
    );
  },
};
