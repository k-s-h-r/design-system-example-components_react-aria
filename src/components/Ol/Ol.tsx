import type { VariantProps } from 'cva';
import type { ComponentProps } from 'react';
import { cva, cx } from '@/lib/cva';

const olVariants = cva({
  base: '',
  variants: {
    listStyle: {
      unset: null,
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

interface OlProps extends ComponentProps<'ol'>, VariantProps<typeof olVariants> {}

const Ol = (props: OlProps) => {
  const { children, className, listStyle, hierarchicalStyles, ...rest } = props;
  return (
    <ol className={cx(olVariants({ listStyle, hierarchicalStyles, className }))} {...rest}>
      {children}
    </ol>
  );
};

export { Ol, olVariants };
