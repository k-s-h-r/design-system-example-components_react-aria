'use client';

import { getLocalTimeZone, toCalendarDate, today } from '@internationalized/date';
import { createContext, type ReactNode, useContext } from 'react';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  DateInput as AriaDateInput,
  type DateInputProps as AriaDateInputProps,
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  DateSegment as AriaDateSegment,
  type DateSegmentProps as AriaDateSegmentProps,
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
  Group as AriaGroup,
  type GroupProps as AriaGroupProps,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
  ButtonContext,
  CalendarStateContext,
  composeRenderProps,
  type DateValue,
  Provider,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { Button } from '../Button';
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  type CalendarProps as CalendarPropsBase,
} from '../Calendar';
import { Description } from '../FormControl';
import {
  type FieldErrorContent,
  filterFieldChildren,
  type RequirementOption,
  renderFieldErrorMessage,
  renderFieldLabel,
} from '../FormControl/fieldHelpers';
import { Select, SelectItem } from '../Select';
import { composeTailwindRenderProps, focusVisibleRing, tv, twMerge } from '../utils';

export type DatePickerSize = 'lg' | 'md' | 'sm';

const datePickerStyles = tv({
  base: 'group/date-picker flex w-fit flex-col gap-2',
});

const datePickerContentStyles = tv({
  base: 'inline-flex flex-wrap items-start gap-2',
});

const datePickerInputStyles = tv({
  base: [
    'outline-black outline-offset-2 ring-yellow-300',
    'inline-flex rounded-8 border bg-[--date-picker-bg] p-0.5 pe-0 text-solid-gray-900 [--date-picker-bg:theme(colors.white)]',
    'group-data-[readonly]/date-picker:border-dashed',
    'group-data-[disabled]/date-picker:border-solid-gray-300 group-data-[disabled]/date-picker:[--date-picker-bg:theme(colors.solid-gray.50)] group-data-[disabled]/date-picker:text-solid-gray-420',
    'forced-colors:group-data-[disabled]/date-picker:border-[GrayText] forced-colors:group-data-[disabled]/date-picker:text-[GrayText]',
  ],
  variants: {
    size: {
      lg: 'min-h-14',
      md: 'min-h-12',
      sm: 'min-h-10',
    },
    isHovered: {
      true: '',
      false: '',
    },
    isFocusWithin: {
      true: 'outline-4 ring-2',
      false: 'outline-0 ring-0',
    },
    isFocusVisible: {
      true: '',
      false: '',
    },
    isInvalid: {
      true: 'border-error-1',
      false: 'border-solid-gray-600',
    },
    isDisabled: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isHovered: true,
      isInvalid: false,
      className: 'border-solid-gray-900',
    },
    {
      isDisabled: false,
      isHovered: true,
      isInvalid: true,
      className: 'border-red-1000',
    },
    {
      isDisabled: false,
      isFocusWithin: true,
      isInvalid: false,
      className: 'border-black',
    },
    {
      isDisabled: false,
      isFocusWithin: true,
      isInvalid: true,
      className: 'border-red-1000',
    },
  ],
  defaultVariants: {
    size: 'lg',
  },
});

const datePickerSegmentStyles = tv({
  base: [
    'relative z-0 inline-flex items-center justify-end rounded-8 border border-transparent bg-transparent pe-3 text-right text-oln-16N-100',
    'after:relative after:z-10 after:self-center after:bg-[--date-picker-bg] after:p-1',
    'data-[placeholder]:text-solid-gray-600',
    'data-[readonly]:cursor-default',
    'data-[disabled]:pointer-events-none',
    "data-[type=year]:w-16 data-[type=year]:after:content-['年']",
    "data-[type=month]:w-11 data-[type=month]:after:content-['月']",
    "data-[type=day]:w-11 data-[type=day]:after:content-['日']",
  ],
  variants: {
    isFocused: {
      true: 'border-solid-gray-600',
      false: '',
    },
    isPlaceholder: {
      true: '',
      false: '',
    },
    isDisabled: {
      true: '',
      false: '',
    },
    isInvalid: {
      true: '',
      false: '',
    },
  },
});

const datePickerCalendarButtonStyles = tv({
  extend: focusVisibleRing,
  base: [
    'group inline-flex items-center justify-center gap-x-1 rounded-6 border border-blue-900 bg-white px-3 text-blue-900',
    'data-hovered:border-[calc(3/16*1rem)] data-hovered:px-2.5',
    'data-pressed:bg-blue-50',
    'data-pressed:border-blue-1000 data-pressed:text-blue-1000',
    'data-[disabled]:border-solid-gray-400 data-[disabled]:bg-white data-[disabled]:text-solid-gray-400',
    'group-data-[readonly]/date-picker:pointer-events-none group-data-[readonly]/date-picker:border-solid-gray-400 group-data-[readonly]/date-picker:text-solid-gray-400',
    'forced-colors:data-[disabled]:border-[GrayText] forced-colors:data-[disabled]:text-[GrayText]',
  ],
  variants: {
    size: {
      lg: 'h-14',
      md: 'h-12',
      sm: 'h-10',
    },
    isPressed: {
      true: '',
      false: '',
    },
    isFocusVisible: {
      true: '',
      false: '',
    },
    isDisabled: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

const datePickerPopoverStyles = tv({
  base: [
    'rounded-8 border border-solid-gray-420 bg-white p-2 shadow-lg',
    'min-w-[max(var(--trigger-width),20rem)]',
    'data-[entering]:animate-in data-[exiting]:animate-out',
    'data-[entering]:fade-in-0 data-[exiting]:fade-out-0',
    'placement-bottom:data-[entering]:slide-in-from-top-1 placement-bottom:data-[exiting]:slide-out-to-top-1',
    'placement-top:data-[entering]:slide-in-from-bottom-1 placement-top:data-[exiting]:slide-out-to-bottom-1',
  ],
});

const datePickerDialogStyles = tv({
  base: 'outline-none',
});

const datePickerCalendarStyles = tv({
  base: 'inline-flex flex-col items-start gap-4',
});

const datePickerCalendarHeaderStyles = tv({
  base: 'flex w-full items-center justify-between gap-4',
});

const datePickerCalendarYearSelectStyles = tv({
  base: 'h-11 py-1',
});

const datePickerCalendarMonthHeadingStyles = tv({
  base: 'w-14 text-center text-std-16B-170',
});

const datePickerCalendarNavButtonStyles = tv({
  base: 'size-11 min-w-0 p-0',
});

const datePickerCalendarActionsStyles = tv({
  base: 'flex w-full justify-between gap-4',
});

const DatePickerStyleContext = createContext<{ size: DatePickerSize }>({
  size: 'lg',
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

function useDatePickerSize(size?: DatePickerSize) {
  const context = useContext(DatePickerStyleContext);
  return size ?? context.size;
}

export interface DatePickerProps<T extends DateValue> extends AriaDatePickerProps<T> {
  calendarLabel?: string;
  clearButtonLabel?: ReactNode;
  description?: ReactNode;
  errorMessage?: FieldErrorContent;
  label?: ReactNode;
  nextMonthLabel?: string;
  previousMonthLabel?: string;
  requirement?: RequirementOption;
  size?: DatePickerSize;
  todayButtonLabel?: ReactNode;
  withCalendar?: boolean;
  yearLabel?: string;
}

export function DatePicker<T extends DateValue>({
  calendarLabel = '日付を選択',
  children,
  className,
  clearButtonLabel = '削除',
  description,
  errorMessage,
  label,
  nextMonthLabel = '次の月',
  previousMonthLabel = '前の月',
  requirement,
  size = 'lg',
  todayButtonLabel = '今日',
  withCalendar = false,
  yearLabel = '年',
  ...props
}: DatePickerProps<T>) {
  const leadingContent = (
    <>
      {renderFieldLabel(label, requirement, props.isRequired)}
      {description != null ? <Description>{description}</Description> : null}
    </>
  );

  const trailingContent = renderFieldErrorMessage(errorMessage);

  const renderedChildren =
    children == null ? (
      <>
        {leadingContent}
        <DatePickerContent>
          <DatePickerInput />
          {withCalendar ? <DatePickerCalendarButton /> : null}
        </DatePickerContent>
        {withCalendar ? (
          <DatePickerPopover>
            <DatePickerDialog>
              <DatePickerCalendar
                aria-label={calendarLabel}
                clearButtonLabel={clearButtonLabel}
                nextMonthLabel={nextMonthLabel}
                previousMonthLabel={previousMonthLabel}
                todayButtonLabel={todayButtonLabel}
                yearLabel={yearLabel}
              />
            </DatePickerDialog>
          </DatePickerPopover>
        ) : null}
        {trailingContent}
      </>
    ) : typeof children === 'function' ? (
      (values: Parameters<Exclude<DatePickerProps<T>['children'], ReactNode>>[0]) => (
        <>
          {leadingContent}
          {children(values)}
          {trailingContent}
        </>
      )
    ) : (
      <>
        {leadingContent}
        {filterFieldChildren(children, {
          label: label != null,
          description: description != null,
          errorMessage: errorMessage != null,
        })}
        {trailingContent}
      </>
    );

  return (
    <DatePickerStyleContext.Provider value={{ size }}>
      <AriaDatePicker
        {...props}
        className={composeTailwindRenderProps(className, datePickerStyles())}
      >
        {renderedChildren}
      </AriaDatePicker>
    </DatePickerStyleContext.Provider>
  );
}

export interface DatePickerContentProps extends AriaGroupProps {}

export function DatePickerContent(props: DatePickerContentProps) {
  const { className, ...rest } = props;

  return (
    <AriaGroup
      {...rest}
      className={composeRenderProps(className, (className) =>
        datePickerContentStyles({ className }),
      )}
    />
  );
}

export interface DatePickerInputProps
  extends Omit<AriaDateInputProps, 'children'>,
    VariantProps<typeof datePickerInputStyles> {
  children?: AriaDateInputProps['children'];
}

export function DatePickerInput(props: DatePickerInputProps) {
  const { className, children, size, ...rest } = props;
  const currentSize = useDatePickerSize(size);

  return (
    <AriaDateInput
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        datePickerInputStyles({
          ...renderProps,
          size: currentSize,
          className,
        }),
      )}
    >
      {children ?? ((segment) => <DatePickerSegment segment={segment} />)}
    </AriaDateInput>
  );
}

export interface DatePickerSegmentProps
  extends AriaDateSegmentProps,
    VariantProps<typeof datePickerSegmentStyles> {}

export function DatePickerSegment(props: DatePickerSegmentProps) {
  const { className, ...rest } = props;

  return (
    <AriaDateSegment
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        datePickerSegmentStyles({
          ...renderProps,
          className: twMerge(
            renderProps.type === 'literal' ? 'hidden w-0 overflow-hidden p-0 text-transparent' : '',
            className,
          ),
        }),
      )}
    />
  );
}

export interface DatePickerCalendarButtonProps
  extends Omit<AriaButtonProps, 'children'>,
    VariantProps<typeof datePickerCalendarButtonStyles> {
  children?: ReactNode;
}

export function DatePickerCalendarButton(props: DatePickerCalendarButtonProps) {
  const { children, className, size, ...rest } = props;
  const currentSize = useDatePickerSize(size);

  return (
    <AriaButton
      {...rest}
      aria-label={props['aria-label'] ?? 'カレンダーを開く'}
      className={composeRenderProps(className, (className, renderProps) =>
        datePickerCalendarButtonStyles({
          ...renderProps,
          size: currentSize,
          className,
        }),
      )}
    >
      {children ?? (
        <>
          <svg aria-hidden={true} fill='none' height='24' viewBox='0 -960 960 960' width='24'>
            <path
              d='M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z'
              fill='currentColor'
            />
          </svg>
          <svg
            aria-hidden={true}
            className='size-4 group-aria-expanded:rotate-180'
            viewBox='0 0 24 24'
          >
            <path d='M12 17.1L3 8L4 7L12 15L20 7L21 8L12 17.1Z' fill='currentColor' />
          </svg>
        </>
      )}
    </AriaButton>
  );
}

export interface DatePickerPopoverProps
  extends AriaPopoverProps,
    VariantProps<typeof datePickerPopoverStyles> {}

export function DatePickerPopover(props: DatePickerPopoverProps) {
  const { className, ...rest } = props;

  return (
    <AriaPopover
      {...rest}
      className={composeRenderProps(className, (className) =>
        datePickerPopoverStyles({ className }),
      )}
    />
  );
}

export interface DatePickerDialogProps extends AriaDialogProps {}

export function DatePickerDialog(props: DatePickerDialogProps) {
  const { className, ...rest } = props;

  return <AriaDialog {...rest} className={twMerge(datePickerDialogStyles(), className)} />;
}

interface DatePickerCalendarInnerProps {
  clearButtonLabel: ReactNode;
  nextMonthLabel: string;
  previousMonthLabel: string;
  todayButtonLabel: ReactNode;
  yearLabel: string;
}

function DatePickerCalendarInner({
  clearButtonLabel,
  nextMonthLabel,
  previousMonthLabel,
  todayButtonLabel,
  yearLabel,
}: DatePickerCalendarInnerProps) {
  const state = useContext(CalendarStateContext);

  if (state == null) {
    return null;
  }

  const currentDate = today(state.timeZone || getLocalTimeZone());
  const startYear = state.minValue
    ? toCalendarDate(state.minValue).year
    : state.focusedDate.year - 6;
  const endYear = state.maxValue ? toCalendarDate(state.maxValue).year : state.focusedDate.year + 6;
  const yearOptions = toYearRange(startYear, endYear);
  const isTodayDisabled =
    state.isDisabled ||
    state.isReadOnly ||
    state.isInvalid(currentDate) ||
    state.isCellUnavailable(currentDate);

  return (
    <>
      <CalendarHeader className={datePickerCalendarHeaderStyles()}>
        <Select
          aria-label={yearLabel}
          blockSize='md'
          className={datePickerCalendarYearSelectStyles()}
          outerClassName='w-full'
          onChange={(event) =>
            state.setFocusedDate(state.focusedDate.set({ year: Number(event.target.value) }))
          }
          value={String(state.focusedDate.year)}
        >
          {yearOptions.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}年
            </SelectItem>
          ))}
        </Select>
        <div className='flex items-center'>
          <Button
            aria-label={previousMonthLabel}
            className={datePickerCalendarNavButtonStyles()}
            isDisabled={state.isDisabled || state.isPreviousVisibleRangeInvalid()}
            onPress={() => state.focusPreviousPage()}
            size='sm'
            slot='previous'
            variant='secondary'
          >
            <ArrowLeftIcon />
          </Button>
          <span className={datePickerCalendarMonthHeadingStyles()}>
            {state.focusedDate.month}月
          </span>
          <Button
            aria-label={nextMonthLabel}
            className={datePickerCalendarNavButtonStyles()}
            isDisabled={state.isDisabled || state.isNextVisibleRangeInvalid()}
            onPress={() => state.focusNextPage()}
            size='sm'
            slot='next'
            variant='secondary'
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </CalendarHeader>
      <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
      <Provider values={[[ButtonContext, null]]}>
        <div className={datePickerCalendarActionsStyles()}>
          <Button
            isDisabled={state.isDisabled || state.isReadOnly || state.value == null}
            onPress={() => state.setValue(null)}
            size='sm'
            variant='tertiary'
          >
            {clearButtonLabel}
          </Button>
          <Button
            isDisabled={isTodayDisabled}
            onPress={() => {
              state.setFocusedDate(currentDate);
              state.selectDate(currentDate);
            }}
            size='sm'
            variant='secondary'
          >
            {todayButtonLabel}
          </Button>
        </div>
      </Provider>
    </>
  );
}

export interface DatePickerCalendarProps extends Omit<CalendarPropsBase, 'children'> {
  clearButtonLabel?: ReactNode;
  nextMonthLabel?: string;
  previousMonthLabel?: string;
  todayButtonLabel?: ReactNode;
  yearLabel?: string;
}

export function DatePickerCalendar({
  'aria-label': ariaLabel = '日付を選択',
  className,
  clearButtonLabel = '削除',
  nextMonthLabel = '次の月',
  previousMonthLabel = '前の月',
  todayButtonLabel = '今日',
  yearLabel = '年',
  ...rest
}: DatePickerCalendarProps) {
  return (
    <Calendar
      {...rest}
      aria-label={ariaLabel}
      className={composeRenderProps(className, (className) =>
        twMerge(datePickerCalendarStyles(), className),
      )}
    >
      <DatePickerCalendarInner
        clearButtonLabel={clearButtonLabel}
        nextMonthLabel={nextMonthLabel}
        previousMonthLabel={previousMonthLabel}
        todayButtonLabel={todayButtonLabel}
        yearLabel={yearLabel}
      />
    </Calendar>
  );
}

export {
  datePickerCalendarActionsStyles,
  datePickerCalendarButtonStyles,
  datePickerCalendarHeaderStyles,
  datePickerCalendarMonthHeadingStyles,
  datePickerCalendarNavButtonStyles,
  datePickerCalendarStyles,
  datePickerCalendarYearSelectStyles,
  datePickerContentStyles,
  datePickerDialogStyles,
  datePickerInputStyles,
  datePickerPopoverStyles,
  datePickerSegmentStyles,
  datePickerStyles,
};
