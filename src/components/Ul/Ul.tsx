import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils';

const ulVariants = tv({
  base: '',
  variants: {
    listStyle: {
      unset: '',
      none: 'list-none',
      disc: 'pl-8 list-disc',
      circle: 'pl-8 list-circle',
      square: 'pl-8 list-square',
    },
    hierarchicalStyles: {
      true: '[&_&]:list-circle [&_&_&]:list-square',
    },
  },
  defaultVariants: {
    listStyle: 'disc',
    hierarchicalStyles: true,
  },
});

export interface UlProps extends ComponentProps<'ul'>, VariantProps<typeof ulVariants> {}

const Ul = (props: UlProps) => {
  const { children, className, listStyle, hierarchicalStyles, ...rest } = props;
  return (
    <ul className={ulVariants({ listStyle, hierarchicalStyles, className })} {...rest}>
      {children}
    </ul>
  );
};

export { Ul, ulVariants };
