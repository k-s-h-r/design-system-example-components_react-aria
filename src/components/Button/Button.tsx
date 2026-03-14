import type { VariantProps } from 'cva';
import {
  Button as _Button,
  type ButtonProps as _ButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

const _buttonVariants = cva({
  base: [
    'border border-transparent underline-offset-2',
    'disabled:no-underline disabled:pointer-events-none',
  ],
  variants: {
    variant: {
      primary: [
        'bg-blue-900 text-white',
        'hover:bg-blue-1000 hover:underline',
        'pressed:bg-blue-1100 pressed:underline',
        'disabled:bg-black/30',
      ],
      secondary: [
        '!border-blue-900 bg-white text-blue-900',
        'hover:!border-blue-1000 hover:bg-blue-200 hover:text-blue-1000 hover:underline',
        'pressed:!border-blue-1100 pressed:bg-blue-300 pressed:text-blue-1200 pressed:underline',
        'disabled:!border-solid-grey-400 disabled:bg-white disabled:text-solid-grey-400',
      ],
      tertiary: [
        'bg-transparent text-blue-900 underline',
        'hover:bg-blue-200 hover:text-blue-1000',
        'pressed:bg-blue-300 pressed:text-blue-1200',
        'disabled:bg-transparent disabled:text-solid-grey-400',
      ],
    },
    size: {
      lg: 'min-w-[8.5rem] rounded-8 p-4 text-oln-16B-1 leading-snug',
      md: 'min-w-24 rounded-8 px-4 py-3 text-oln-16B-1 leading-snug',
      sm: 'min-w-20 rounded-md px-3 py-1.5 text-oln-16B-1 leading-snug relative after:absolute after:-inset-x-[1px] after:-inset-y-[5px]',
      xs: 'min-w-18 rounded px-2 py-1.5 text-oln-14B-1 relative after:absolute after:-inset-x-[1px] after:-inset-y-[9px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const buttonVariants = compose(focusRing, _buttonVariants);

/*
// required for type checking
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export const button = (props: ButtonProps) => buttonVariants(props);

export interface ButtonProps
  extends ReactAriaButtonProps,
    Omit<ButtonVariantProps, 'size'>,
    Required<Pick<ButtonVariantProps, 'size'>> {
  asChild?: boolean;
}
*/
export interface ButtonProps extends _ButtonProps, VariantProps<typeof buttonVariants> {}

const Button = (props: ButtonProps) => {
  const { className, variant, size, ...rest } = props;

  return (
    <_Button
      className={composeRenderProps(className, (className, renderProps) =>
        cx(buttonVariants({ ...renderProps, variant, size, className })),
      )}
      {...rest}
    />
  );
};

export { Button, buttonVariants };
