'use client';

import { createContext, type ComponentProps, type ReactNode, useContext } from 'react';
import { composeRenderProps } from 'react-aria-components';
import { Description } from '../FormControl';
import {
  type FieldErrorContent,
  filterFieldChildren,
  type RequirementOption,
  renderFieldErrorMessage,
  renderFieldLabel,
} from '../FormControl/fieldHelpers';
import { InputText } from '../InputText';
import {
  DatePickerCalendarButton,
  type DatePickerCalendarButtonProps,
  type DatePickerSize,
} from '../DatePicker';
import { tv } from '../utils';

const separatedDatePickerStyles = tv({
  base: 'flex flex-col gap-2',
});

const separatedDatePickerContentStyles = tv({
  base: 'inline-flex flex-wrap items-start gap-4 pt-3',
});

const separatedDatePickerFieldStyles = tv({
  base: 'inline-flex items-center gap-1',
});

const separatedDatePickerInputStyles = tv({
  base: '!min-w-0 !max-w-none text-right',
  variants: {
    field: {
      year: 'w-20',
      month: 'w-16',
      day: 'w-16',
    },
  },
});

const SeparatedDatePickerStyleContext = createContext<{ size: DatePickerSize }>({
  size: 'lg',
});

function useSeparatedDatePickerSize(size?: DatePickerSize) {
  const context = useContext(SeparatedDatePickerStyleContext);
  return size ?? context.size;
}

export interface SeparatedDatePickerProps extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactNode;
  description?: ReactNode;
  errorMessage?: FieldErrorContent;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  label?: ReactNode;
  requirement?: RequirementOption;
  size?: DatePickerSize;
}

export function SeparatedDatePicker({
  children,
  className,
  description,
  errorMessage,
  isDisabled,
  isInvalid,
  isReadOnly,
  label,
  requirement,
  size = 'lg',
  ...props
}: SeparatedDatePickerProps) {
  return (
    <SeparatedDatePickerStyleContext.Provider value={{ size }}>
      <div
        {...props}
        className={separatedDatePickerStyles({ className })}
        data-disabled={isDisabled || undefined}
        data-invalid={isInvalid || undefined}
        data-readonly={isReadOnly || undefined}
      >
        {renderFieldLabel(label, requirement, false)}
        {description != null ? <Description>{description}</Description> : null}
        <div className={separatedDatePickerContentStyles()}>
          {filterFieldChildren(children, {
            label: label != null,
            description: description != null,
            errorMessage: errorMessage != null,
          })}
        </div>
        {renderFieldErrorMessage(errorMessage)}
      </div>
    </SeparatedDatePickerStyleContext.Provider>
  );
}

interface SeparatedDatePickerInputFieldProps
  extends Omit<ComponentProps<typeof InputText>, 'size'>,
    Pick<SeparatedDatePickerProps, 'isDisabled' | 'isInvalid' | 'isReadOnly'> {
  field: 'year' | 'month' | 'day';
  label: ReactNode;
  size?: DatePickerSize;
}

function SeparatedDatePickerField(props: SeparatedDatePickerInputFieldProps) {
  const {
    className,
    field,
    isDisabled,
    isInvalid,
    isReadOnly,
    label,
    size,
    ...rest
  } = props;
  const currentSize = useSeparatedDatePickerSize(size);

  return (
    <div className={separatedDatePickerFieldStyles()}>
      <InputText
        {...rest}
        aria-invalid={isInvalid || undefined}
        className={composeRenderProps(className, (className) =>
          separatedDatePickerInputStyles({
            field,
            className,
          }),
        )}
        disabled={isDisabled}
        readOnly={isReadOnly}
        size={currentSize}
      />
      <span className='text-oln-16N-100 text-solid-gray-900'>{label}</span>
    </div>
  );
}

export interface SeparatedDatePickerYearProps
  extends Omit<SeparatedDatePickerInputFieldProps, 'field' | 'label'> {}

export function SeparatedDatePickerYear(props: SeparatedDatePickerYearProps) {
  return <SeparatedDatePickerField {...props} field='year' label='年' />;
}

export interface SeparatedDatePickerMonthProps
  extends Omit<SeparatedDatePickerInputFieldProps, 'field' | 'label'> {}

export function SeparatedDatePickerMonth(props: SeparatedDatePickerMonthProps) {
  return <SeparatedDatePickerField {...props} field='month' label='月' />;
}

export interface SeparatedDatePickerDateProps
  extends Omit<SeparatedDatePickerInputFieldProps, 'field' | 'label'> {}

export function SeparatedDatePickerDate(props: SeparatedDatePickerDateProps) {
  return <SeparatedDatePickerField {...props} field='day' label='日' />;
}

export interface SeparatedDatePickerCalendarButtonProps extends DatePickerCalendarButtonProps {}

export function SeparatedDatePickerCalendarButton(props: SeparatedDatePickerCalendarButtonProps) {
  const currentSize = useSeparatedDatePickerSize(props.size);

  return <DatePickerCalendarButton {...props} size={currentSize} />;
}

export {
  separatedDatePickerContentStyles,
  separatedDatePickerFieldStyles,
  separatedDatePickerInputStyles,
  separatedDatePickerStyles,
};
