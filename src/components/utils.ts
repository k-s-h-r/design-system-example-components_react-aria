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

export const focusVisibleRing = tv({
  base: ['outline-black outline-offset-2', 'ring-yellow-300'],
  variants: {
    isFocusVisible: {
      true: 'outline-4 ring-2',
      false: 'outline-0 ring-0',
    },
  },
});

export const focusRing = tv({
  base: ['outline-black outline-offset-2', 'ring-yellow-300'],
  variants: {
    isFocused: {
      true: 'outline-4 ring-2',
      false: 'outline-0 ring-0',
    },
  },
});
