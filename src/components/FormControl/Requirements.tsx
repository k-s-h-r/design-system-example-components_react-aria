import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils';

const requirementsStyles = tv({
  base: 'inline-block text-oln-16N-100 ml-2',
  variants: {
    variant: {
      required: 'text-red-800',
      optional: 'text-solid-gray-800',
      readonly: 'rounded-lg bg-solid-gray-536 p-2 text-white outline-1 outline-transparent',
      disabled: 'rounded-lg bg-solid-gray-536 p-2 text-white outline-1 outline-transparent',
    },
  },
});

export interface RequirementsProps
  extends ComponentProps<'span'>,
    VariantProps<typeof requirementsStyles> {}

export const Requirements = (props: RequirementsProps) => {
  const { children, className, variant, ...rest } = props;

  return (
    <span className={requirementsStyles({ variant, className })} {...rest}>
      {children}
    </span>
  );
};
