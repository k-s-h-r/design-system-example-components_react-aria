import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export const focusRing = tv({
  base: [
    'outline-0 outline-black outline-offset-2',
    'ring-0 ring-yellow-300',
    'data-focus-visible:outline-4 data-focus-visible:ring-2',
  ],
  variants: {},
});

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}
