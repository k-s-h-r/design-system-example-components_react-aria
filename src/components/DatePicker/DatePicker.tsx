'use client';

import { createContext, type ReactNode, useContext } from 'react';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
  DateInput as AriaDateInput,
  type DateInputProps as AriaDateInputProps,
  DatePicker as AriaDatePicker,
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
  DateSegment as AriaDateSegment,
  type DateSegmentProps as AriaDateSegmentProps,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { Description } from '../FormControl';
import {
  type FieldErrorContent,
  filterFieldChildren,
  type RequirementOption,
  renderFieldErrorMessage,
  renderFieldLabel,
} from '../FormControl/fieldHelpers';
import { composeTailwindRenderProps, focusVisibleRing, tv, twMerge } from '../utils';

export type DatePickerSize = 'lg' | 'md' | 'sm';

const datePickerStyles = tv({
  base: 'group/date-picker flex w-fit flex-col gap-2',
});

const datePickerInputStyles = tv({
  extend: focusVisibleRing,
  base: [
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
      true: '',
      false: '',
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
  extend: focusVisibleRing,
  base: [
    'relative z-0 inline-flex flex-row-reverse items-center justify-end rounded-8 border border-transparent bg-transparent pe-3 text-right text-oln-16N-100',
    'after:relative after:z-10 after:self-center after:bg-[--date-picker-bg] after:p-1',
    'data-[placeholder]:text-solid-gray-600',
    'data-[readonly]:cursor-default',
    'data-[disabled]:pointer-events-none',
    'data-[type=year]:w-16 data-[type=year]:after:content-[\'年\']',
    'data-[type=month]:w-11 data-[type=month]:after:content-[\'月\']',
    'data-[type=day]:w-11 data-[type=day]:after:content-[\'日\']',
    'data-[type=literal]:w-0 data-[type=literal]:overflow-hidden data-[type=literal]:p-0 data-[type=literal]:text-transparent data-[type=literal]:after:hidden',
  ],
  variants: {
    isFocusVisible: {
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

const DatePickerStyleContext = createContext<{ size: DatePickerSize }>({
  size: 'lg',
});

function useDatePickerSize(size?: DatePickerSize) {
  const context = useContext(DatePickerStyleContext);
  return size ?? context.size;
}

export interface DatePickerProps<T extends DateValue> extends AriaDatePickerProps<T> {
  description?: ReactNode;
  errorMessage?: FieldErrorContent;
  label?: ReactNode;
  requirement?: RequirementOption;
  size?: DatePickerSize;
}

export function DatePicker<T extends DateValue>({
  children,
  className,
  description,
  errorMessage,
  label,
  requirement,
  size = 'lg',
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
    typeof children === 'function'
      ? (values: Parameters<Exclude<DatePickerProps<T>['children'], ReactNode>>[0]) => (
          <>
            {leadingContent}
            {children(values)}
            {trailingContent}
          </>
        )
      : (
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
          className,
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
          <svg aria-hidden={true} className='size-4 group-aria-expanded:rotate-180' viewBox='0 0 24 24'>
            <path d='M12 17.1L3 8L4 7L12 15L20 7L21 8L12 17.1Z' fill='currentColor' />
          </svg>
        </>
      )}
    </AriaButton>
  );
}

export interface DatePickerPopoverProps extends AriaPopoverProps, VariantProps<typeof datePickerPopoverStyles> {}

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

export {
  datePickerCalendarButtonStyles,
  datePickerDialogStyles,
  datePickerInputStyles,
  datePickerPopoverStyles,
  datePickerSegmentStyles,
  datePickerStyles,
};
