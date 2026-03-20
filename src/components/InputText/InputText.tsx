import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
  composeRenderProps,
  InputContext,
  useSlottedContext,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusRing, tv } from '../utils';

const inputStyles = tv({
  extend: focusRing,
  base: [
    'min-w-80 max-w-full rounded-8 border bg-white text-std-16N-170 text-solid-gray-800',
    'aria-disabled:border-solid-gray-300 aria-disabled:bg-solid-gray-50 aria-disabled:text-solid-gray-420',
    'aria-disabled:forced-colors:text-[GrayText] aria-disabled:forced-colors:border-[GrayText]',
    'flex-1 min-w-0',
  ],
  variants: {
    size: {
      sm: 'h-10 px-4 py-2',
      md: 'h-12 px-4 py-3',
      lg: 'h-14 px-4 py-4',
    },
    isHovered: {
      true: '',
      false: '',
    },
    isInvalid: {
      true: 'border-error-1 data-hovered:border-red-1000',
      false: '',
    },
    isDisabled: {
      true: [
        'border-solid-gray-300 bg-solid-gray-50 text-solid-gray-420',
        'forced-colors:text-[GrayText] forced-colors:border-[GrayText]',
      ],
      false: '',
    },
    isRequired: {
      true: '',
      false: '',
    },
    isReadOnly: {
      true: 'border-dashed',
      false: '',
    },
  },
  compoundVariants: [
    {
      isHovered: true,
      isReadOnly: false,
      isInvalid: false,
      isDisabled: false,
      className: 'border-black',
    },
    {
      isHovered: true,
      isReadOnly: false,
      isInvalid: true,
      isDisabled: false,
      className: 'border-red-1000',
    },
    {
      isInvalid: true,
      isDisabled: true,
      className: 'border-solid-gray-300',
    },
  ],
  defaultVariants: {
    size: 'lg',
  },
});

export interface InputProps
  extends Omit<AriaInputProps, 'size'>,
    VariantProps<typeof inputStyles> {}

export function InputText(props: InputProps) {
  const { size, ...rest } = props;
  const contextProps = useSlottedContext(InputContext, props.slot) || {};
  const disabledProp = props.disabled ?? contextProps.disabled;
  const ariaDisabledProp = props['aria-disabled'] ?? contextProps['aria-disabled'];
  const requiredProp = props.required ?? contextProps.required;
  const readOnlyProp = props.readOnly ?? contextProps.readOnly;
  const isAriaDisabled = ariaDisabledProp === true || ariaDisabledProp === 'true';
  const isReadOnly = !!readOnlyProp || isAriaDisabled;

  return (
    <AriaInput
      {...rest}
      disabled={disabledProp}
      aria-disabled={ariaDisabledProp}
      required={requiredProp}
      readOnly={isReadOnly}
      className={composeRenderProps(props.className, (className, renderProps) =>
        inputStyles({
          ...renderProps,
          size,
          isDisabled: !!disabledProp,
          isRequired: !!requiredProp,
          isReadOnly: !!readOnlyProp,
          className,
        }),
      )}
    />
  );
}

export { inputStyles };
