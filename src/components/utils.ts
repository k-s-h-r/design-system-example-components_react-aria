import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export const focusRing = tv({
  base: ['outline outline-black outline-offset-2', 'ring ring-yellow-300'],
  variants: {
    isFocusVisible: {
      false: 'outline-0 ring-0',
      true: 'outline-4 ring-2',
    },
  },
});

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}
