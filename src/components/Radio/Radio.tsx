import type { VariantProps } from 'cva';
import {
  Radio as _Radio,
  RadioGroup as _RadioGroup,
  type RadioGroupProps as _RadioGroupProps,
  type RadioProps as _RadioProps,
  composeRenderProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

interface RadioGroupProps extends _RadioGroupProps {}

const RadioGroup = (props: RadioGroupProps) => {
  return (
    <_RadioGroup
      {...props}
      className={composeRenderProps(props.className, (className, _renderProps) =>
        cx('', className),
      )}
    >
      {props.children}
    </_RadioGroup>
  );
};

const _radioVariants = cva({
  base: 'flex gap-2 items-center group text-sm transition',
  variants: {
    size: {
      sm: '[--size:19px] [--inner:9px] text-std-16N-7',
      md: '[--size:19px] [--inner:9px] text-std-16N-7',
      lg: '[--size:25px] [--inner:12px] text-std-17N-7',
    },
    isInvalid: {
      true: 'text-error-1',
    },
    isDisabled: {
      false: 'text-solid-grey-800',
      true: 'text-solid-grey-600',
    },
  },
  compoundVariants: [
    {
      isInvalid: true,
      isDisabled: true,
      className: 'text-solid-grey-600',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});

const radioVariants = compose(_radioVariants);
interface RadioProps extends _RadioProps, VariantProps<typeof radioVariants> {}

const _boxVariants = cva({
  base: 'relative w-[--size] h-[--size] flex-shrink-0 rounded-full flex items-center justify-center border-2 transition',
  variants: {
    isSelected: {
      false: [
        '[--color:theme(colors.solid-grey.900)]',
        'group-pressed:[--color:theme(colors.black)]',
        'bg-white border-[--color]',
      ],
      true: [
        '[--color:theme(colors.blue.900)]',
        'group-pressed:[--color:theme(colors.blue.1000)]',
        '',
        'border-[--color]',
        'before:block before:size-[--inner] before:rounded-full before:bg-[--color]',
      ],
    },
    isInvalid: {
      true: [
        '[--color:theme(colors.error-1)]',
        'group-pressed:[--color:theme(colors.error-1)]',
        '',
      ],
    },
    isDisabled: {
      true: ['[--color:theme(colors.solid-grey.200)]', ''],
    },
  },
});

const boxVariants = compose(focusRing, _boxVariants);

const Radio = (props: RadioProps) => {
  const { size, ...rest } = props;
  return (
    <_Radio
      {...rest}
      className={composeRenderProps(props.className, (className, renderProps) =>
        cx(radioVariants({ ...renderProps, size, className })),
      )}
    >
      {(renderProps) => (
        <>
          <span className={boxVariants(renderProps)}></span>
          {props.children}
        </>
      )}
    </_Radio>
  );
};

export type { RadioGroupProps, RadioProps };
export { Radio, RadioGroup };
