import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxProps as AriaListBoxProps,
  Collection,
  composeRenderProps,
  Header,
  type ListBoxItemProps,
  Section,
  type SectionProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

interface ListBoxProps<T> extends Omit<AriaListBoxProps<T>, 'layout' | 'orientation'> {}

export function ListBox<T extends object>({ children, ...props }: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeRenderProps(props.className, (className, _renderProps) =>
        cx('outline-0 p-1 border border-solid-gray-400 rounded-lg', className),
      )}
    >
      {children}
    </AriaListBox>
  );
}

export const _itemStyles = cva({
  base: 'group relative flex items-center gap-8 cursor-default select-none py-1.5 px-2.5 rounded-md will-change-transform text-oln-16N-1 forced-color-adjust-none',
  variants: {
    isSelected: {
      false: 'text-solid-gray-700 hover:bg-slate-200 -outline-offset-2',
      true: 'bg-blue-900 text-white',
    },
    isDisabled: {
      true: 'text-slate-300',
    },
  },
});

const itemStyles = compose(focusRing, _itemStyles);

export function ListBoxItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <div className='absolute left-4 right-4 bottom-0 h-px bg-white/20 ' />
        </>
      ))}
    </AriaListBoxItem>
  );
}

export const dropdownItemStyles = cva({
  base: 'group flex items-center gap-4 cursor-default select-none py-2 pl-3 pr-1 rounded-lg outline outline-0 text-sm forced-color-adjust-none',
  variants: {
    isOpen: {
      true: '',
      false: '',
    },
    isDisabled: {
      false: 'text-gray-900',
      true: 'text-gray-300',
    },
    isFocused: {
      true: 'bg-blue-900 text-white',
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: 'bg-gray-100',
    },
  ],
});

export function DropdownItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={dropdownItemStyles}>
      {composeRenderProps(props.children, (children, { isSelected, isFocused }) => (
        <>
          <span className='flex items-center flex-1 gap-2 font-normal truncate group-selected:font-semibold'>
            {children}
          </span>
          <span className='flex items-center w-5'>
            {isSelected && (
              <svg
                className={cx('fill-current', isFocused ? 'text-white' : 'text-gray-900')}
                aria-hidden={true}
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M9.55005 17.6538L4.21545 12.3192L5.28468 11.25L9.55005 15.5154L18.7154 6.35004L19.7847 7.41924L9.55005 17.6538Z' />
              </svg>
            )}
          </span>
        </>
      ))}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
}

export function DropdownSection<T extends object>(props: DropdownSectionProps<T>) {
  return (
    <Section className="first:-mt-[5px] after:content-[''] after:block after:h-[5px]">
      <Header className='text-oln-16N-1 font-semibold text-gray-700 px-4 py-2 truncate sticky -top-[5px] -mt-px -mx-1 z-10 bg-gray-100/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 border-y [&+*]:mt-1'>
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </Section>
  );
}
