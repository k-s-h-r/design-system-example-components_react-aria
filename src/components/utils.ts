import { composeRenderProps } from 'react-aria-components';
import { extendTailwindMerge } from 'tailwind-merge';
import { createTV } from 'tailwind-variants';
import { tailwindMergeConfig } from '../lib/tailwind-merge-config';

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

export const twMerge = extendTailwindMerge(tailwindMergeConfig);

export const tv = createTV({
  twMergeConfig: tailwindMergeConfig,
});

export const focusRing = tv({
  base: [
    'outline-0 outline-black outline-offset-2',
    'ring-0 ring-yellow-300',
    'data-focus-visible:outline-4 data-focus-visible:ring-2',
  ],
  variants: {},
});
