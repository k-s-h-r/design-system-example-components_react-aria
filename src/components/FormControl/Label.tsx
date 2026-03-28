import { Label as AriaLabel, type LabelProps as AriaLabelProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils';

const labelStyles = tv({
  base: 'text-solid-gray-800',
  variants: {
    size: {
      sm: 'text-std-16N-170',
      md: 'text-std-17N-170',
      lg: 'text-std-18N-160',
    },
    bold: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      bold: true,
      className: 'text-std-16B-170',
    },
    {
      size: 'md',
      bold: true,
      className: 'text-std-17B-170',
    },
    {
      size: 'lg',
      bold: true,
      className: 'text-std-18B-160',
    },
  ],
  defaultVariants: {
    size: 'sm',
    bold: false,
  },
});

export interface LabelProps extends AriaLabelProps, VariantProps<typeof labelStyles> {}

export function Label(props: LabelProps) {
  const { size, bold, ...rest } = props;
  return (
    <AriaLabel {...rest} className={labelStyles({ size, bold, className: props.className })} />
  );
}
