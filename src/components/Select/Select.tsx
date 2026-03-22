import { mergeProps } from '@react-aria/utils';
import {
  Children,
  type ComponentProps,
  createContext,
  forwardRef,
  isValidElement,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useContext,
} from 'react';
import { useField } from 'react-aria';
import { FieldErrorContext, LabelContext, Provider, TextContext } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { Description, FieldError, Label } from '../FormControl';
import { tv, twMerge } from '../utils';

const selectStyles = tv({
  base: [
    'w-full appearance-none rounded-8 border border-solid-gray-600 bg-white pl-4 pr-10 text-std-16N-170 text-solid-gray-800',
    'hover:border-black',
    'focus-visible:outline-4 focus-visible:outline-black focus-visible:outline-offset-2',
    'focus-visible:ring-2 focus-visible:ring-yellow-300',
    'aria-invalid:border-error-1 aria-invalid:hover:border-red-1000',
    'aria-disabled:border-solid-gray-300 aria-disabled:bg-solid-gray-50 aria-disabled:text-solid-gray-420',
    'aria-disabled:forced-colors:border-[GrayText] aria-disabled:forced-colors:text-[GrayText]',
    'disabled:border-solid-gray-300 disabled:bg-solid-gray-50 disabled:text-solid-gray-420',
    'disabled:forced-colors:border-[GrayText] disabled:forced-colors:text-[GrayText]',
  ],
  variants: {
    blockSize: {
      sm: 'h-10 py-2',
      md: 'h-12 py-3',
      lg: 'h-14 py-[calc(11/16*1rem)]',
    },
  },
  defaultVariants: {
    blockSize: 'lg',
  },
});

export type SelectBlockSize = 'lg' | 'md' | 'sm';

const SelectFieldContext = createContext<ComponentProps<'select'> | null>(null);

export interface SelectProps
  extends Omit<ComponentProps<'select'>, 'size'>,
    VariantProps<typeof selectStyles> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(props, ref) {
  const fieldContextProps = useContext(SelectFieldContext);
  const mergedProps = fieldContextProps ? mergeProps(fieldContextProps, props) : props;
  const { blockSize, children, className, onKeyDown, onMouseDown, ...rest } = mergedProps;
  const isAriaDisabled =
    mergedProps['aria-disabled'] === true || mergedProps['aria-disabled'] === 'true';

  const handleDisabledKeyDown = (event: KeyboardEvent<HTMLSelectElement>) => {
    onKeyDown?.(event);

    if (!event.defaultPrevented && isAriaDisabled && event.code !== 'Tab') {
      event.preventDefault();
    }
  };

  const handleDisabledMouseDown = (event: MouseEvent<HTMLSelectElement>) => {
    onMouseDown?.(event);

    if (!event.defaultPrevented && isAriaDisabled) {
      event.preventDefault();
    }
  };

  return (
    <div className='relative w-fit'>
      <select
        {...rest}
        aria-invalid={mergedProps['aria-invalid'] || undefined}
        className={selectStyles({ blockSize, className })}
        onKeyDown={handleDisabledKeyDown}
        onMouseDown={handleDisabledMouseDown}
        ref={ref}
      >
        {children}
      </select>
      <svg
        aria-hidden={true}
        className={twMerge(
          'pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 fill-none',
          isAriaDisabled || mergedProps.disabled
            ? 'text-solid-gray-420 forced-colors:text-[GrayText]'
            : 'text-solid-gray-900 forced-colors:text-[CanvasText]',
        )}
        height='16'
        viewBox='0 0 16 16'
        width='16'
      >
        <path
          d='M13.3344 4.40002L8.00104 9.73336L2.66771 4.40002L1.73438 5.33336L8.00104 11.6L14.2677 5.33336L13.3344 4.40002Z'
          fill='currentColor'
        />
      </svg>
    </div>
  );
});

export function SelectItem(props: ComponentProps<'option'>) {
  return <option {...props} />;
}

export function SelectSection(props: ComponentProps<'optgroup'>) {
  return <optgroup {...props} />;
}

export interface SelectFieldProps extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactNode;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
}

export function SelectField(props: SelectFieldProps) {
  const { children, className, isDisabled, isInvalid, isRequired, ...rest } = props;
  const childArray = Children.toArray(children);
  const hasLabel = childArray.some((child) => isValidElement(child) && child.type === Label);
  const hasDescription = childArray.some(
    (child) => isValidElement(child) && child.type === Description,
  );
  const hasFieldError = childArray.some(
    (child) => isValidElement(child) && child.type === FieldError,
  );
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    label: hasLabel,
    description: hasDescription,
    errorMessage: hasFieldError,
    isInvalid,
  });

  return (
    <div {...rest} className={twMerge('flex flex-col gap-2', className)}>
      <Provider
        values={[
          [LabelContext, labelProps],
          [
            TextContext,
            {
              slots: {
                description: descriptionProps,
                errorMessage: errorMessageProps,
              },
            },
          ],
          [
            FieldErrorContext,
            {
              isInvalid: !!isInvalid,
              validationErrors: [],
              validationDetails: {} as ValidityState,
            },
          ],
        ]}
      >
        <SelectFieldContext.Provider
          value={{
            ...fieldProps,
            disabled: isDisabled,
            'aria-invalid': isInvalid || undefined,
            'aria-required': isRequired || undefined,
          }}
        >
          {children}
        </SelectFieldContext.Provider>
      </Provider>
    </div>
  );
}
