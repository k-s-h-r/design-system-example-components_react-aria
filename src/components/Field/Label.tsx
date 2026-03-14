import type { VariantProps } from 'cva';
import { Label as _Label, type LabelProps as _LabelProps } from 'react-aria-components';
import { cva, cx } from '@/lib/cva';

const labelVariants = cva({
  base: 'flex w-fit items-center gap-2 text-dns-16B- text-solid-grey-9002',
  variants: {
    size: {
      sm: 'text-dns-16N-2',
      md: 'text-dns-17N-2',
      lg: 'text-std-18N-6',
    },
    bold: {
      true: '',
      false: '',
    },
    isDisabled: {
      true: 'text-solid-grey-400',
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      bold: true,
      className: 'text-dns-16B-2',
    },
    {
      size: 'md',
      bold: true,
      className: 'text-dns-17B-2',
    },
    {
      size: 'lg',
      bold: true,
      className: 'text-std-18B-6',
    },
  ],
  defaultVariants: {
    size: 'sm',
    bold: false,
  },
});

export interface LabelProps extends _LabelProps, VariantProps<typeof labelVariants> {}

export function Label(props: LabelProps) {
  const { size, bold, ...rest } = props;
  return (
    <_Label {...rest} className={cx(labelVariants({ size, bold, className: props.className }))} />
  );
}
