import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils';

export type ChipLabelVariant = 'text' | 'outline' | 'filled-outline' | 'fill';
export type ChipLabelColor =
  | 'gray'
  | 'blue'
  | 'light-blue'
  | 'cyan'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'magenta'
  | 'purple';

const chipLabelColorClasses: Record<ChipLabelVariant, Record<ChipLabelColor, string>> = {
  text: {
    gray: 'text-solid-gray-800',
    blue: 'text-blue-700',
    'light-blue': 'text-light-blue-800',
    cyan: 'text-cyan-900',
    green: 'text-green-800',
    lime: 'text-lime-900',
    yellow: 'text-yellow-1000',
    orange: 'text-orange-900',
    red: 'text-red-900',
    magenta: 'text-magenta-800',
    purple: 'text-purple-800',
  },
  outline: {
    gray: 'border-solid-gray-700 text-solid-gray-800',
    blue: 'border-blue-700 text-blue-700',
    'light-blue': 'border-light-blue-800 text-light-blue-800',
    cyan: 'border-cyan-900 text-cyan-900',
    green: 'border-green-800 text-green-800',
    lime: 'border-lime-900 text-lime-900',
    yellow: 'border-yellow-1000 text-yellow-1000',
    orange: 'border-orange-900 text-orange-900',
    red: 'border-red-900 text-red-900',
    magenta: 'border-magenta-800 text-magenta-800',
    purple: 'border-purple-800 text-purple-800',
  },
  'filled-outline': {
    gray: 'border-solid-gray-700 bg-solid-gray-50 text-solid-gray-800 [&_svg]:text-solid-gray-700',
    blue: 'border-blue-700 bg-blue-50 text-blue-800 [&_svg]:text-blue-700',
    'light-blue':
      'border-light-blue-800 bg-light-blue-50 text-light-blue-900 [&_svg]:text-light-blue-800',
    cyan: 'border-cyan-900 bg-cyan-50 text-cyan-1000 [&_svg]:text-cyan-900',
    green: 'border-green-800 bg-green-50 text-green-900 [&_svg]:text-green-800',
    lime: 'border-lime-900 bg-lime-50 text-lime-1000 [&_svg]:text-lime-900',
    yellow: 'border-yellow-1000 bg-yellow-50 text-yellow-1100 [&_svg]:text-yellow-1000',
    orange: 'border-orange-900 bg-orange-50 text-orange-1000 [&_svg]:text-orange-900',
    red: 'border-red-900 bg-red-50 text-red-1000 [&_svg]:text-red-900',
    magenta: 'border-magenta-800 bg-magenta-50 text-magenta-900 [&_svg]:text-magenta-800',
    purple: 'border-purple-800 bg-purple-50 text-purple-800 [&_svg]:text-purple-800',
  },
  fill: {
    gray: 'bg-solid-gray-700 text-white',
    blue: 'bg-blue-700 text-white',
    'light-blue': 'bg-light-blue-800 text-white',
    cyan: 'bg-cyan-900 text-white',
    green: 'bg-green-800 text-white',
    lime: 'bg-lime-900 text-white',
    yellow: 'bg-yellow-1000 text-white',
    orange: 'bg-orange-900 text-white',
    red: 'bg-red-900 text-white',
    magenta: 'bg-magenta-800 text-white',
    purple: 'bg-purple-800 text-white',
  },
};

const chipLabelCompoundVariants: Array<{
  className: string;
  color: ChipLabelColor;
  variant: ChipLabelVariant;
}> = (Object.entries(chipLabelColorClasses) as [
  ChipLabelVariant,
  Record<ChipLabelColor, string>,
][]).flatMap(([variant, colors]) =>
  (Object.entries(colors) as [ChipLabelColor, string][]).map(([color, className]) => ({
    variant,
    color,
    className,
  })),
);

const chipLabelStyles = tv({
  base: [
    'inline-grid min-h-8 grid-cols-[auto_auto] items-baseline content-center rounded-8 text-oln-16N-100 [overflow-wrap:anywhere]',
    '[&_svg]:relative [&_svg]:mr-1 [&_svg]:shrink-0 [&_svg]:[--chip-icon-size:calc(24/16*1rem)]',
    '[&_svg]:[--chip-icon-offset:calc((var(--chip-icon-size)-1cap)/2)] [&_svg]:top-[var(--chip-icon-offset)]',
    '[&_svg]:-mt-[var(--chip-icon-offset)] [&_svg]:mb-[var(--chip-icon-offset)]',
    '[&_svg]:forced-colors:fill-[CanvasText]',
  ],
  variants: {
    variant: {
      text: 'px-2 py-1',
      outline: 'border px-[calc(7/16*1rem)] py-[calc(3/16*1rem)]',
      'filled-outline': 'border px-[calc(7/16*1rem)] py-[calc(3/16*1rem)]',
      fill: 'border border-transparent px-[calc(7/16*1rem)] py-[calc(3/16*1rem)]',
    },
    color: {
      gray: '',
      blue: '',
      'light-blue': '',
      cyan: '',
      green: '',
      lime: '',
      yellow: '',
      orange: '',
      red: '',
      magenta: '',
      purple: '',
    },
  },
  compoundVariants: chipLabelCompoundVariants,
  defaultVariants: {
    variant: 'text',
    color: 'gray',
  },
});

export interface ChipLabelProps
  extends Omit<ComponentProps<'span'>, 'color'>,
    VariantProps<typeof chipLabelStyles> {}

export function ChipLabel(props: ChipLabelProps) {
  const { children, className, color, variant, ...rest } = props;

  return (
    <span className={chipLabelStyles({ variant, color, className })} {...rest}>
      {children}
    </span>
  );
}

export { chipLabelStyles };
