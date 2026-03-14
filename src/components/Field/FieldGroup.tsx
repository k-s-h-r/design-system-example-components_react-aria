import { composeRenderProps, Group, type GroupProps } from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

export const fieldBorderStylesVariants = {
  isFocusWithin: {
    false: 'border-solid-grey-900',
    true: 'border-focus-yellow',
  },
  isInvalid: {
    true: 'border-error-1',
  },
  isDisabled: {
    true: 'border-solid-grey-200',
  },
};
export const fieldBorderStyles = cva({
  variants: fieldBorderStylesVariants,
});

const _fieldGroupVariants = cva({
  base: 'group flex items-center h-9 bg-white',
});

export const fieldGroupVariants = compose(focusRing, _fieldGroupVariants, fieldBorderStyles);

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        cx(fieldGroupVariants({ ...renderProps, className })),
      )}
    />
  );
}
