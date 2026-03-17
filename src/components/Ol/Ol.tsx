import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils';

const olVariants = tv({
  base: '',
  variants: {
    listStyle: {
      unset: '',
      none: 'list-none',
      decimal: 'pl-8 list-decimal',
      'lower-latin': 'pl-8 list-lower-latin',
    },
    hierarchicalStyles: {
      true: '[&_&]:list-lower-latin',
    },
  },
  defaultVariants: {
    listStyle: 'decimal',
    hierarchicalStyles: true,
  },
});

export interface OlProps extends ComponentProps<'ol'>, VariantProps<typeof olVariants> {}

const Ol = (props: OlProps) => {
  const { children, className, listStyle, hierarchicalStyles, ...rest } = props;
  return (
    <ol className={olVariants({ listStyle, hierarchicalStyles, className })} {...rest}>
      {children}
    </ol>
  );
};

export { Ol, olVariants };
