import type { VariantProps } from 'cva';
import { useMemo } from 'react';
import { Button, type ButtonProps } from '@/components';
import { cva } from '@/lib/cva';

export const variantsClass = cva({
  base: 'grid place-items-center h-12 w-12 border-border-divider p-1 shrink-0 font-normal rounded-full min-w-0',
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type PaginationItemProps = VariantProps<typeof variantsClass> & ButtonProps;

const PaginationItem = ({ children, className, ...props }: PaginationItemProps) => {
  const styles = useMemo(() => variantsClass({ className }), [className]);
  return (
    <Button variant='secondary' className={styles} {...props}>
      {children}
    </Button>
  );
};

export { PaginationItem };
