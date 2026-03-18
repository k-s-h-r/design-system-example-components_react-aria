import { Group, type GroupProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing, tv } from '../utils';

export const fieldGroupVariants = tv({
  extend: focusRing,
  base: 'group flex items-center h-9 bg-white',
  variants: {
    isFocusWithin: {
      false: 'border-solid-gray-900',
      true: 'border-focus-yellow',
    },
    isInvalid: {
      true: 'border-error-1',
    },
    isDisabled: {
      true: 'border-solid-gray-200',
    },
  },
});

export interface FieldGroupProps extends GroupProps, VariantProps<typeof fieldGroupVariants> {}

export function FieldGroup(props: FieldGroupProps) {
  const { isFocusWithin, isInvalid, isDisabled, ...rest } = props;
  return (
    <Group
      {...rest}
      className={composeTailwindRenderProps(props.className, fieldGroupVariants())}
    />
  );
}
