import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv } from '../utils';

const triggerButtonStyles = tv({
  extend: focusVisibleRing,
  base: [
    'text-solid-gray-900 text-oln-16N-100',
    'inline-flex w-fit touch-manipulation',
    'data-hovered:bg-solid-gray-50',
    'data-focus-visible:bg-yellow-300',
  ],
  variants: {
    orientation: {
      horizontal: [
        'min-h-11 flex-row items-center gap-1 rounded-6 px-3 py-1.5',
        'data-hovered:underline data-hovered:underline-offset-[calc(3*var(--px-to-rem))]',
      ],
      vertical: [
        'min-h-11 min-w-11 flex-col items-center justify-center gap-1 rounded-4 p-0.5 pt-1',
        'text-[0.625rem] leading-none tracking-tighter',
        'data-hovered:outline-1 data-hovered:outline-offset-0',
      ],
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface TriggerButtonProps
  extends AriaButtonProps,
    VariantProps<typeof triggerButtonStyles> {}

export function TriggerButton(props: TriggerButtonProps) {
  const { className, orientation, ...rest } = props;

  return (
    <AriaButton
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        triggerButtonStyles({ ...renderProps, orientation, className }),
      )}
    />
  );
}

export { triggerButtonStyles };
