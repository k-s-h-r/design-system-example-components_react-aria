import {
  Select as _Select,
  type SelectProps as _SelectProps,
  Button,
  type ButtonProps,
  composeRenderProps,
  ListBox,
  type ListBoxItemProps,
  type ListBoxProps,
  type PopoverProps,
  SelectValue,
  type SelectValueProps,
  Separator,
  type SeparatorProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';
import { DropdownItem, DropdownSection, type DropdownSectionProps } from '../ListBox';
import { Popover } from '../Popover';

const _selectButtonVariants = cva({
  base: [
    'flex items-center text-start gap-4 w-full cursor-default transition',
    'rounded-8 min-w-80 max-w-full text-std-16N-7 text-solid-grey-900',
    'bg-white border',
    'h-auto',
    'flex-1 min-w-0',
    'disabled:text-solid-grey-200 disabled:bg-solid-grey-50 disabled:border-solid-grey-400',
    'pressed:border-focus-yellow pressed:',
  ],
  variants: {
    size: {
      sm: 'px-4 py-2',
      md: 'px-4 py-4',
      lg: 'px-4 py-5',
    },
    isFocused: {
      false: 'border-solid-grey-900',
      true: 'border-focus-yellow',
    },
    isInvalid: {
      true: 'border-error-1 border-2',
    },
    isDisabled: {
      false: '',
      true: 'border-solid-grey-200',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const selectButtonVariants = compose(focusRing, _selectButtonVariants);

interface SelectProps<T extends object> extends _SelectProps<T> {}
function Select<T extends object>({ ...props }: SelectProps<T>) {
  return (
    <_Select
      {...props}
      className={composeRenderProps(props.className, (className, _renderProps) =>
        cx('group flex flex-col gap-2', className),
      )}
      {...props}
    />
  );
}

const _SelectValue = <T extends object>({ className, ...props }: SelectValueProps<T>) => (
  <SelectValue
    className={composeRenderProps('', (className, _renderProps) =>
      cx('flex-1 text-oln-16N-1', className),
    )}
    {...props}
  />
);

function SelectTrigger({
  className,
  children,
  size,
  ...props
}: ButtonProps & {
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <Button
      className={composeRenderProps('', (className, renderProps) =>
        cx(selectButtonVariants({ ...renderProps, size }), className),
      )}
      {...props}
    >
      {composeRenderProps(children, (children, _values) => (
        <>
          {children}
          <svg
            className='w-4 h-4 text-solid-grey-900 fill-current group-disabled:text-solid-grey-400 '
            aria-hidden={true}
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path d='M8 11.4L2 5.33334L2.66667 4.66667L8 10L13.3333 4.66667L14 5.33334L8 11.4Z' />
          </svg>
        </>
      ))}
    </Button>
  );
}

const SelectContent = <T extends object>({ className, ...props }: ListBoxProps<T>) => (
  <ListBox
    className={composeRenderProps(className, (className, _renderProps) =>
      cx(
        'outline-none p-1 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]',
        className,
      ),
    )}
    {...props}
  />
);

const SelectPopover = ({ className, ...props }: PopoverProps) => (
  <Popover
    className={composeRenderProps(className, (className, _renderProps) =>
      cx('min-w-[--trigger-width]', className),
    )}
    {...props}
  />
);

const SelectItem = (props: ListBoxItemProps) => {
  return <DropdownItem {...props} />;
};
const SelectSection = <T extends object>(props: DropdownSectionProps<T>) => {
  return <DropdownSection {...props} />;
};
const SelectSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator className={cx('-mx-1 my-1 h-px bg-solid-grey-100', className)} {...props} />
);

export type { PopoverProps as SelectPopoverProps, SelectProps };
export {
  _SelectValue as SelectValue,
  Select,
  SelectContent,
  SelectItem,
  SelectPopover,
  SelectSection,
  SelectSeparator,
  SelectTrigger,
  // SelectCollection -> inside SelectSection
  // SelectHeader -> inside SelectSection
};
