import type { ComponentProps } from 'react';
import {
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  composeRenderProps,
  type CalendarCellProps as AriaCalendarCellProps,
  type CalendarGridProps as AriaCalendarGridProps,
  type CalendarProps as AriaCalendarProps,
} from 'react-aria-components';
import type { DateValue } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv, twMerge } from '../utils';

const calendarStyles = tv({
  base: 'inline-flex w-max flex-col items-center text-solid-gray-900',
  variants: {
    isDisabled: {
      true: 'text-solid-gray-420 forced-colors:text-[GrayText]',
      false: '',
    },
    isInvalid: {
      true: '',
      false: '',
    },
  },
});

const calendarHeaderStyles = tv({
  base: 'flex items-center gap-2 p-4',
});

const calendarGridStyles = tv({
  base: 'mx-3 mb-2',
});

const calendarHeaderCellStyles = tv({
  base: 'size-12 p-0 text-center font-bold',
});

const calendarGridBodyStyles = tv({
  base: '[&_td]:p-0',
});

const calendarCellStyles = tv({
  extend: focusVisibleRing,
  base: [
    'm-1 flex size-10 items-center justify-center rounded-full underline-offset-[calc(3/16*1rem)]',
    'data-hovered:bg-solid-gray-50 data-hovered:underline',
    'data-pressed:bg-solid-gray-100',
    'data-selected:border data-selected:border-transparent data-selected:bg-blue-900 data-selected:text-white',
    'data-unavailable:text-solid-gray-600 data-unavailable:line-through',
    'data-disabled:hidden',
    'data-outside-month:hidden',
    'data-today:font-bold',
  ],
  variants: {
    isFocusVisible: {
      true: '',
      false: '',
    },
    isInvalid: {
      true: '',
      false: '',
    },
    isSelected: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      isFocusVisible: true,
      isSelected: false,
      className: 'bg-yellow-300',
    },
    {
      isFocusVisible: true,
      isSelected: true,
      className: 'outline-white ring-yellow-300',
    },
  ],
});

export interface CalendarProps extends AriaCalendarProps<DateValue>, VariantProps<typeof calendarStyles> {}

export function Calendar(props: CalendarProps) {
  return (
    <AriaCalendar
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        calendarStyles({
          ...renderProps,
          className,
        }),
      )}
    />
  );
}

export interface CalendarHeaderProps extends ComponentProps<'div'> {}

export function CalendarHeader(props: CalendarHeaderProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={calendarHeaderStyles({ className })} />;
}

export interface CalendarGridProps extends AriaCalendarGridProps {}

export function CalendarGrid(props: CalendarGridProps) {
  const { children, className, ...rest } = props;

  return (
    <AriaCalendarGrid {...rest} className={twMerge(calendarGridStyles(), className)}>
      {typeof children === 'function' ? (
        <>
          <AriaCalendarGridHeader>
            {(day) => (
              <AriaCalendarHeaderCell className={calendarHeaderCellStyles()}>
                {day}
              </AriaCalendarHeaderCell>
            )}
          </AriaCalendarGridHeader>
          <AriaCalendarGridBody className={calendarGridBodyStyles()}>
            {(date) => children(date)}
          </AriaCalendarGridBody>
        </>
      ) : (
        children
      )}
    </AriaCalendarGrid>
  );
}

export interface CalendarCellProps
  extends Omit<AriaCalendarCellProps, 'date'>,
    VariantProps<typeof calendarCellStyles> {
  date: AriaCalendarCellProps['date'];
}

export function CalendarCell(props: CalendarCellProps) {
  const { className, ...rest } = props;

  return (
    <AriaCalendarCell
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        calendarCellStyles({
          ...renderProps,
          className,
        }),
      )}
    />
  );
}

export { calendarCellStyles, calendarGridStyles, calendarHeaderStyles, calendarStyles };
