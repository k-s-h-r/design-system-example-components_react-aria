import {
  type SeparatorProps as AriaSeparatorProps,
  Separator as RACSeparator,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

// data-[color=gray-420]:border-solid-gray-420 data-[color=gray-536]:border-solid-gray-536 data-[color=black]:border-black

const styles = tv({
  base: [
    'border-0',
    // forced-colors:border-[ButtonBorder]
  ],
  variants: {
    orientation: {
      horizontal: 'h-0 w-full border-t-(length:--divider-thickness,1px)',
      vertical: 'w-0 min-h-8 h-full border-l-(length:--divider-thickness,1px)',
    },
    lineStyle: {
      solid: 'border-solid',
      dashed: 'border-dashed',
    },
    thickness: {
      '1px': '[--divider-thickness:1px]',
      '2px': '[--divider-thickness:2px]',
      '3px': '[--divider-thickness:3px]',
      '4px': '[--divider-thickness:4px]',
    },
    color: {
      'gray-420': 'border-solid-gray-420',
      'gray-536': 'border-solid-gray-536',
      black: 'border-black',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    lineStyle: 'solid',
    thickness: '1px',
    color: 'gray-420',
  },
});

export interface SeparatorProps extends AriaSeparatorProps, VariantProps<typeof styles> {}

export function Divider(props: SeparatorProps) {
  return (
    <RACSeparator
      {...props}
      className={styles({
        orientation: props.orientation,
        lineStyle: props.lineStyle,
        thickness: props.thickness,
        color: props.color,
        className: props.className,
      })}
    />
  );
}
