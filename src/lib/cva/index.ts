import { cva as _cva, defineConfig } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';
import { tailwindMergeConfig } from '../tailwind-merge-config';

export const twMerge = extendTailwindMerge(tailwindMergeConfig);

// forced-colors:outline-[Highlight]
export const focusRing = _cva({
  base: ['outline outline-black outline-offset-2', 'ring ring-yellow-300'],
  variants: {
    isFocusVisible: {
      false: 'outline-0 ring-0',
      true: 'outline-4 ring-2',
    },
  },
});

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className),
  },
});
