import {
  TextArea as AriaTextArea,
  type TextAreaProps as AriaTextAreaProps,
  composeRenderProps,
  TextAreaContext,
  useSlottedContext,
} from 'react-aria-components';
import { focusRing, tv } from '../utils';

const inputStyles = tv({
  extend: focusRing,
  base: [
    'max-w-full rounded-8 border bg-white p-4 border-solid-gray-600 text-std-16N-170 text-solid-gray-800',
    'min-h-[calc(3lh+2rem+2px)] max-h-[calc(10lh+2rem+2px)] [field-sizing:content]',
    'aria-disabled:border-solid-gray-300 aria-disabled:bg-solid-gray-50 aria-disabled:text-solid-gray-420',
    'aria-disabled:forced-colors:text-[GrayText] aria-disabled:forced-colors:border-[GrayText]',
  ],
  variants: {
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
});

export interface TextAreaProps extends AriaTextAreaProps {}

export function TextArea(props: TextAreaProps) {
  const contextProps = useSlottedContext(TextAreaContext, props.slot) || {};
  const ariaDisabledProp = props['aria-disabled'] ?? contextProps['aria-disabled'];
  const readOnlyProp = props.readOnly ?? contextProps.readOnly;
  const isAriaDisabled = ariaDisabledProp === true || ariaDisabledProp === 'true';
  const isReadOnly = !!readOnlyProp || isAriaDisabled;

  return (
    <AriaTextArea
      {...props}
      aria-disabled={ariaDisabledProp}
      readOnly={isReadOnly}
      className={composeRenderProps(props.className, (className, renderProps) =>
        inputStyles({
          ...renderProps,
          isReadOnly: !!readOnlyProp,
          className,
        }),
      )}
    />
  );
}

export { inputStyles };
