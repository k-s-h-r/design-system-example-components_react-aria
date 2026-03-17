import type { VariantProps } from 'cva';
import {
  Input as _Input,
  type InputProps as _InputProps,
  composeRenderProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

const _inputVariants = cva({
  base: [
    'rounded-8 min-w-80 max-w-full text-std-16N-7 text-solid-gray-900',
    'bg-white border border-solid-gray-900',
    'h-auto',
    'flex-1 min-w-0',
    'disabled:text-solid-gray-200 disabled:bg-solid-gray-50 disabled:border-solid-gray-400',
  ],
  variants: {
    size: {
      sm: 'px-4 py-2',
      md: 'px-4 py-4',
      lg: 'px-4 py-5',
    },
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
  defaultVariants: {
    size: 'md',
  },
});

const inputVariants = compose(focusRing, _inputVariants);
export interface InputProps extends Omit<_InputProps, 'size'>, VariantProps<typeof inputVariants> {}

const InputText = (props: InputProps) => {
  const { size, ...rest } = props;
  return (
    <_Input
      {...rest}
      className={composeRenderProps(props.className, (className, renderProps) =>
        cx(inputVariants({ ...renderProps, size, className })),
      )}
    />
  );
};

export { InputText, inputVariants };
