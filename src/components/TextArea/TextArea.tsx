import {
  TextArea as AriaTextArea,
  composeRenderProps,
  type TextAreaProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

const _inputStyles = cva({
  base: [
    'rounded-8 min-w-80 max-w-full p-4 text-std-16N-7 text-solid-gray-900',
    'bg-white border border-solid-gray-900',
    'min-h-[calc(3lh+2rem+2px)] max-h-[calc(10lh+2rem+2px)] [field-sizing:content]',
    'flex-1 min-w-0',
    'disabled:text-solid-gray-200 disabled:bg-solid-gray-50 disabled:border-solid-gray-400',
  ],
  variants: {
    isFocused: {
      false: 'border-solid-gray-900',
      true: 'border-focus-yellow',
    },
    isInvalid: {
      true: 'border-error-1 border-2',
    },
    isDisabled: {
      true: 'border-solid-gray-200',
    },
  },
});
const inputStyles = compose(focusRing, _inputStyles);

const TextArea = (props: TextAreaProps) => {
  return (
    <AriaTextArea
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        cx(inputStyles({ ...renderProps, className })),
      )}
    />
  );
};

export { inputStyles, TextArea };
