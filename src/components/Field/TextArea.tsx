import {
  TextArea as _TextArea,
  composeRenderProps,
  type TextAreaProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

const _inputVariants = cva({
  base: [
    'rounded-8 min-w-80 max-w-full p-4 text-std-16N-7 text-solid-grey-900',
    'bg-white border border-solid-grey-900',
    'min-h-[calc(3lh+2rem+2px)] max-h-[calc(10lh+2rem+2px)] [field-sizing:content]',
    'flex-1 min-w-0',
    'disabled:text-solid-grey-200 disabled:bg-solid-grey-50 disabled:border-solid-grey-400',
  ],
  variants: {
    isFocused: {
      false: 'border-solid-grey-900',
      true: 'border-focus-yellow',
    },
    isInvalid: {
      true: 'border-error-1 border-2',
    },
    isDisabled: {
      true: 'border-solid-grey-200',
    },
  },
});
const inputVariants = compose(focusRing, _inputVariants);

const TextArea = (props: TextAreaProps) => {
  return (
    <_TextArea
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        cx(inputVariants({ ...renderProps, className })),
      )}
    />
  );
};

export { inputVariants, TextArea };
