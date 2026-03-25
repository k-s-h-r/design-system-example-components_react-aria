import { mergeProps } from '@react-aria/utils';
import {
  type ComponentProps,
  createContext,
  forwardRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useContext,
} from 'react';
import { useField, useFocusRing, useHover } from 'react-aria';
import { FieldErrorContext, LabelContext, Provider, TextContext } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { Description, FieldError, Label } from '../FormControl';
import {
  type FieldErrorContent,
  filterFieldChildren,
  hasFieldChild,
  type RequirementOption,
  renderFieldErrorMessage,
  renderFieldLabel,
} from '../FormControl/fieldHelpers';
import { focusRing, tv, twMerge } from '../utils';

const selectStyles = tv({
  extend: focusRing,
  base: [
    'w-full appearance-none rounded-8 border border-solid-gray-600 bg-white pl-4 pr-10 text-std-16N-170 text-solid-gray-800',
  ],
  variants: {
    blockSize: {
      sm: 'h-10 py-2',
      md: 'h-12 py-3',
      lg: 'h-14 py-[calc(11/16*1rem)]',
    },
    isDisabled: {
      true: [
        'border-solid-gray-300 bg-solid-gray-50 text-solid-gray-420',
        'forced-colors:border-[GrayText] forced-colors:text-[GrayText]',
      ],
      false: '',
    },
    isHovered: {
      true: '',
      false: '',
    },
    isInvalid: {
      true: 'border-error-1',
      false: '',
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isHovered: true,
      isInvalid: false,
      className: 'border-black',
    },
    {
      isDisabled: false,
      isHovered: true,
      isInvalid: true,
      className: 'border-red-1000',
    },
    {
      isDisabled: true,
      isInvalid: true,
      className: 'border-solid-gray-300',
    },
  ],
  defaultVariants: {
    blockSize: 'lg',
  },
});

const selectOuterStyles = tv({
  base: 'relative w-fit',
});

export type SelectBlockSize = 'lg' | 'md' | 'sm';

const SelectFieldContext = createContext<ComponentProps<'select'> | null>(null);

export interface SelectProps
  extends Omit<ComponentProps<'select'>, 'size'>,
    VariantProps<typeof selectStyles> {
  outerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(props, ref) {
  const fieldContextProps = useContext(SelectFieldContext);
  const mergedProps = fieldContextProps ? mergeProps(fieldContextProps, props) : props;
  const { blockSize, children, className, onKeyDown, onMouseDown, outerClassName, ...rest } =
    mergedProps;
  const isAriaDisabled =
    mergedProps['aria-disabled'] === true || mergedProps['aria-disabled'] === 'true';
  const isDisabled = !!mergedProps.disabled || isAriaDisabled;
  const isInvalid = !!mergedProps['aria-invalid'];
  const { hoverProps, isHovered } = useHover({
    isDisabled,
  });
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

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

  const interactionProps = mergeProps(hoverProps, focusProps);

  return (
    <div className={selectOuterStyles({ className: outerClassName })}>
      <select
        {...rest}
        {...interactionProps}
        aria-invalid={mergedProps['aria-invalid'] || undefined}
        className={selectStyles({
          blockSize,
          className,
          isDisabled,
          isFocused,
          isHovered,
          isInvalid,
        })}
        data-disabled={isDisabled || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-focused={isFocused || undefined}
        data-hovered={isHovered || undefined}
        data-invalid={isInvalid || undefined}
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
  description?: ReactNode;
  errorMessage?: FieldErrorContent;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  label?: ReactNode;
  requirement?: RequirementOption;
}

export function SelectField(props: SelectFieldProps) {
  const {
    children,
    className,
    description,
    errorMessage,
    isDisabled,
    isInvalid,
    isRequired,
    label,
    requirement,
    ...rest
  } = props;
  const filteredChildren = filterFieldChildren(children, {
    label: label != null,
    description: description != null,
    errorMessage: errorMessage != null,
  });
  const hasLabel = label != null || hasFieldChild(filteredChildren, Label);
  const hasDescription = description != null || hasFieldChild(filteredChildren, Description);
  const hasFieldError = errorMessage != null || hasFieldChild(filteredChildren, FieldError);
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
          {renderFieldLabel(label, requirement, isRequired)}
          {description != null ? <Description>{description}</Description> : null}
          {filteredChildren}
          {renderFieldErrorMessage(errorMessage)}
        </SelectFieldContext.Provider>
      </Provider>
    </div>
  );
}

export { selectOuterStyles, selectStyles };
