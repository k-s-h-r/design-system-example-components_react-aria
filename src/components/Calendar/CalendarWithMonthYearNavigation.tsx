'use client';

import {
  type CalendarDate,
  getLocalTimeZone,
  toCalendarDate,
  today,
} from '@internationalized/date';
import { useControlledState } from '@react-stately/utils';
import { type ReactNode, useEffect, useMemo } from 'react';
import { Heading as AriaHeading, type DateValue } from 'react-aria-components';
import { Button } from '../Button';
import { Select, SelectItem } from '../Select';
import { tv } from '../utils';
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  type CalendarProps,
} from './Calendar';

const calendarWithMonthYearNavigationStyles = tv({
  base: 'inline-flex flex-col items-start gap-4',
});

const calendarWithMonthYearNavigationActionsStyles = tv({
  base: 'flex self-stretch justify-between gap-4',
});

const calendarWithMonthYearNavigationMonthHeadingStyles = tv({
  base: 'w-14 text-center text-std-16B-170',
});

const calendarWithMonthYearNavigationYearSelectStyles = tv({
  base: 'h-11 py-1',
});

const calendarWithMonthYearNavigationNavButtonStyles = tv({
  base: 'size-11 min-w-0 p-0',
});

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden={true}
      className='mx-auto'
      fill='none'
      height='16'
      viewBox='0 0 16 16'
      width='16'
    >
      <path d='m5.27 8 5.33-5.33-.93-.94L3.4 8l6.27 6.27.93-.94L5.27 8Z' fill='currentColor' />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden={true}
      className='mx-auto'
      fill='none'
      height='16'
      viewBox='0 0 16 16'
      width='16'
    >
      <path d='m6 1.73-.93.94L10.4 8l-5.33 5.33.93.94L12.27 8 6 1.73Z' fill='currentColor' />
    </svg>
  );
}

function toYearRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export interface CalendarWithMonthYearNavigationProps
  extends Omit<
    CalendarProps,
    'children' | 'defaultFocusedValue' | 'focusedValue' | 'onFocusChange'
  > {
  clearButtonLabel?: ReactNode;
  defaultFocusedValue?: DateValue;
  focusedValue?: DateValue;
  nextMonthLabel?: string;
  onFocusChange?: (value: CalendarDate) => void;
  previousMonthLabel?: string;
  todayButtonLabel?: ReactNode;
  yearLabel?: string;
}

export function CalendarWithMonthYearNavigation(props: CalendarWithMonthYearNavigationProps) {
  const {
    clearButtonLabel = '削除',
    defaultFocusedValue,
    focusedValue: controlledFocusedValue,
    nextMonthLabel = '次の月',
    onChange,
    onFocusChange,
    previousMonthLabel = '前の月',
    todayButtonLabel = '今日',
    yearLabel = '年',
    value: controlledValue,
    defaultValue,
    minValue,
    maxValue,
    ...calendarProps
  } = props;

  const [value, setValue] = useControlledState<DateValue | null, DateValue | null>(
    controlledValue,
    defaultValue ?? null,
    onChange,
  );
  const [focusedDate, setFocusedDate] = useControlledState<CalendarDate, CalendarDate>(
    controlledFocusedValue ? toCalendarDate(controlledFocusedValue) : undefined,
    toCalendarDate(
      defaultFocusedValue ??
        controlledFocusedValue ??
        controlledValue ??
        defaultValue ??
        today(getLocalTimeZone()),
    ),
    onFocusChange,
  );

  useEffect(() => {
    if (controlledFocusedValue || value == null) {
      return;
    }

    setFocusedDate(toCalendarDate(value));
  }, [controlledFocusedValue, setFocusedDate, value]);

  const yearOptions = useMemo(() => {
    const startYear = minValue ? toCalendarDate(minValue).year : focusedDate.year - 6;
    const endYear = maxValue ? toCalendarDate(maxValue).year : focusedDate.year + 6;

    return toYearRange(startYear, endYear);
  }, [focusedDate.year, maxValue, minValue]);

  return (
    <div className={calendarWithMonthYearNavigationStyles()}>
      <Calendar
        {...calendarProps}
        focusedValue={focusedDate}
        maxValue={maxValue}
        minValue={minValue}
        onChange={setValue}
        onFocusChange={setFocusedDate}
        value={value}
      >
        <CalendarHeader className='w-full'>
          <Select
            aria-label={yearLabel}
            blockSize='md'
            className={calendarWithMonthYearNavigationYearSelectStyles()}
            outerClassName='w-full'
            onChange={(event) =>
              setFocusedDate(focusedDate.set({ year: Number(event.target.value) }))
            }
            value={focusedDate.year}
          >
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year}>
                {year}年
              </SelectItem>
            ))}
          </Select>
          <div className='flex items-center'>
            <Button
              aria-label={previousMonthLabel}
              className={calendarWithMonthYearNavigationNavButtonStyles()}
              onPress={() => setFocusedDate(focusedDate.subtract({ months: 1 }))}
              size='sm'
              slot='previous'
              variant='secondary'
            >
              <ArrowLeftIcon />
            </Button>
            <AriaHeading className={calendarWithMonthYearNavigationMonthHeadingStyles()}>
              {focusedDate.month}月
            </AriaHeading>
            <Button
              aria-label={nextMonthLabel}
              className={calendarWithMonthYearNavigationNavButtonStyles()}
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
      </Calendar>
      <div className={calendarWithMonthYearNavigationActionsStyles()}>
        <Button onPress={() => setValue(null)} size='sm' variant='tertiary'>
          {clearButtonLabel}
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
          {todayButtonLabel}
        </Button>
      </div>
    </div>
  );
}

export {
  calendarWithMonthYearNavigationActionsStyles,
  calendarWithMonthYearNavigationMonthHeadingStyles,
  calendarWithMonthYearNavigationNavButtonStyles,
  calendarWithMonthYearNavigationStyles,
  calendarWithMonthYearNavigationYearSelectStyles,
};
