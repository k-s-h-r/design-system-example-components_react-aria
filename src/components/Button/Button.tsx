import type { VariantProps } from 'cva';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { composeTailwindRenderProps, focusRing, tv } from '../utils';

const buttonVariants = tv({
  extend: focusRing,
  base: [
    'border border-transparent underline-offset-2 cursor-pointer',
    'aria-disabled:no-underline aria-disabled:pointer-events-none',
  ],
  variants: {
    variant: {
      primary: [
        'bg-blue-900 text-white',
        'data-hovered:bg-blue-1000 data-hovered:underline',
        'data-pressed:bg-blue-1200 data-pressed:underline',
        'aria-disabled:bg-solid-gray-300',
        'disabled:bg-solid-gray-300',
      ],
      secondary: [
        'border-blue-900 bg-white text-blue-900',
        'data-hovered:border-blue-1000 data-hovered:bg-blue-200 data-hovered:text-blue-1000 data-hovered:underline',
        'data-pressed:border-blue-1200 data-pressed:bg-blue-300 data-pressed:text-blue-1200 data-pressed:underline',
        'aria-disabled:border-solid-gray-400 aria-disabled:bg-white aria-disabled:text-solid-gray-400',
        'aria-disabled:data-focus-visibled:border-solid-gray-420',
        'disabled:border-solid-gray-400 disabled:bg-white disabled:text-solid-gray-400',
        'disabled:data-focus-visibled:border-solid-gray-420',
      ],
      tertiary: [
        'bg-transparent text-blue-900 underline',
        'data-hovered:bg-blue-50 data-hovered:text-blue-1000',
        'data-pressed:bg-blue-100 data-pressed:text-blue-1200',
        'data-focus-visible:bg-yellow-300',
        'aria-disabled:bg-transparent aria-disabled:text-solid-gray-400',
        'disabled:bg-transparent disabled:text-solid-gray-400',
      ],
    },
    size: {
      lg: 'min-w-[calc(136*var(--px-to-rem))] min-h-14 rounded-8 px-4 py-3 text-oln-16B-100',
      md: 'min-w-24 min-h-12 rounded-8 px-4 py-2 text-oln-16B-100',
      sm: 'relative min-w-20 min-h-9 rounded-6 px-3 py-0.5 text-oln-16B-100 after:absolute after:inset-x-0 after:-inset-y-full after:m-auto after:h-[44px]',
      xs: 'relative min-w-18 min-h-7 rounded-4 px-2 py-0.5 text-oln-14B-100 after:absolute after:inset-x-0 after:-inset-y-full after:m-auto after:h-[44px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

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
export interface ButtonProps extends AriaButtonProps, VariantProps<typeof buttonVariants> {}

const Button = (props: ButtonProps) => {
  const { className, variant, size, 'aria-disabled': ariaDisabled, ...rest } = props;

  return (
    <AriaButton
      className={composeTailwindRenderProps(className, buttonVariants({ variant, size }))}
      aria-disabled={ariaDisabled}
      {...rest}
    />
  );
};

export { Button, buttonVariants };
