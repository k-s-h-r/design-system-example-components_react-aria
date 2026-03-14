import type { VariantProps } from 'cva';
import type { ComponentProps } from 'react';
import { cva, cx } from '@/lib/cva';

const ulVariants = cva({
  base: '',
  variants: {
    listStyle: {
      unset: null,
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

interface UlProps extends ComponentProps<'ul'>, VariantProps<typeof ulVariants> {}

const Ul = (props: UlProps) => {
  const { children, className, listStyle, hierarchicalStyles, ...rest } = props;
  return (
    <ul className={cx(ulVariants({ listStyle, hierarchicalStyles, className }))} {...rest}>
      {children}
    </ul>
  );
};

export { Ul, ulVariants };
