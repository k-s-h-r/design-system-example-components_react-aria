import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusRing, tv, twMerge } from '../utils';

const Check = (props: { className: string }) => (
  <svg
    aria-hidden={true}
    className={twMerge('fill-current', props.className)}
    width='17'
    height='17'
    viewBox='0 0 17 17'
    fill='none'
  >
    <path
      d='M6.9 12.35L13.625 5.62495L12.575 4.57495L6.9 10.25L4.05 7.39995L3 8.44995L6.9 12.35Z'
      fill='white'
    />
  </svg>
);
const Indeterminate = (props: { className: string }) => (
  <svg
    aria-hidden={true}
    className={twMerge('fill-current', props.className)}
    width='23'
    height='23'
    viewBox='0 0 23 23'
  >
    <path d='M5.07324 12.5147H17.9262V10.4854H5.07324V12.5147Z'></path>
  </svg>
);

const checkboxStyles = tv({
  base: [
    'group relative flex w-fit items-start py-2 text-solid-gray-800 transition',
    'touch-manipulation [-webkit-tap-highlight-color:transparent]',
  ],
  variants: {
    size: {
      sm: 'gap-1 text-dns-16N-130',
      md: 'gap-2 text-dns-16N-130',
      lg: 'gap-2 text-dns-17N-130',
    },
    isDisabled: {
      true: 'text-solid-gray-600 forced-colors:text-[GrayText]',
    },
    isInvalid: {
      true: 'text-error-1',
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      isInvalid: true,
      className: 'text-solid-gray-600',
    },
  ],
  defaultVariants: {
    size: 'sm',
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: [
    'box-content shrink-0 rounded-[calc(2/18*100%)] border-solid',
    'flex items-center justify-center transition',
    // hover時のoutline
    'group-data-hovered:ring-solid-gray-420 group-data-hovered:ring-3',
  ],
  variants: {
    size: {
      sm: 'border-2 size-3.5',
      md: 'border-2 size-4.5',
      lg: 'border-3 size-6',
    },
    isSelected: {
      false: ['[--color:theme(colors.solid-gray.600)]', 'bg-white border-(--color)'],
      true: [
        '[--color:theme(colors.blue.900)]',
        'bg-(--color) border-(--color)',
        'group-data-hovered:[--color:theme(colors.blue.1100)]',
      ],
    },
    isInvalid: {
      true: [
        '[--color:theme(colors.error-1)]',
        'group-data-hovered:[--color:theme(colors.red.1000)]',
      ],
    },
    isDisabled: {
      true: ['[--color:theme(colors.solid-gray.300)]', 'border-solid-gray-300 bg-solid-gray-50'],
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

const iconStyles = tv({
  base: 'size-full pointer-events-none text-white group-disabled:text-solid-gray-50',
  variants: {},
  defaultVariants: {
    size: 'sm',
  },
});

export interface CheckboxProps extends AriaCheckboxProps, VariantProps<typeof checkboxStyles> {}

export function Checkbox(props: CheckboxProps) {
  const { size, ...rest } = props;

  return (
    <AriaCheckbox
      {...rest}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, size, className }),
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { isSelected, isIndeterminate, ...renderProps }) => (
          <>
            <div
              className={boxStyles({
                isSelected: isSelected || isIndeterminate,
                size,
                ...renderProps,
              })}
            >
              {isIndeterminate ? (
                <Indeterminate aria-hidden className={iconStyles()} />
              ) : isSelected ? (
                <Check aria-hidden className={iconStyles()} />
              ) : null}
            </div>
            {children}
          </>
        ),
      )}
    </AriaCheckbox>
  );
}
