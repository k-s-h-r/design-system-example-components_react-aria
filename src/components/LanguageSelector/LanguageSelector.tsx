'use client';

import { type ComponentProps, useContext } from 'react';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  MenuTrigger as AriaMenuTrigger,
  type MenuTriggerProps as AriaMenuTriggerProps,
  Popover as AriaPopover,
  composeRenderProps,
  OverlayTriggerStateContext,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { TriggerButton, type TriggerButtonProps } from '../Button';
import { focusVisibleRing, tv } from '../utils';

const languageSelectorButtonStyles = tv({
  base: '',
  variants: {
    orientation: {
      horizontal: [''],
      vertical: [
        'grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-x-1 gap-y-0',
        '[&>:nth-child(1)]:col-start-1 [&>:nth-child(1)]:row-start-1 [&>:nth-child(1)]:justify-self-center',
        '[&>:nth-child(2)]:col-start-1 [&>:nth-child(2)]:row-start-2 [&>:nth-child(2)]:justify-self-center',
        '[&>:nth-child(3)]:col-start-2 [&>:nth-child(3)]:row-[1/3] [&>:nth-child(3)]:self-center',
      ],
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const languageSelectorPopoverStyles = tv({
  base: [
    'min-w-fit rounded-8 border border-solid-gray-420 bg-white py-2 shadow-1',
    'data-[entering]:animate-in data-[exiting]:animate-out',
    'data-[entering]:fade-in-0 data-[exiting]:fade-out-0',
    'placement-bottom:data-[entering]:slide-in-from-top-1 placement-bottom:data-[exiting]:slide-out-to-top-1',
  ],
  variants: {
    isCondensed: {
      true: 'max-h-[calc((36*6.5+16)/16*1rem)]',
      false: 'max-h-[calc((44*6.5+16)/16*1rem)]',
    },
  },
  defaultVariants: {
    isCondensed: false,
  },
});

const languageSelectorMenuStyles = tv({
  base: 'overflow-auto outline-none',
});

const languageSelectorMenuItemStyles = tv({
  extend: focusVisibleRing,
  base: [
    'group/menu-item relative flex min-h-11 items-center gap-x-2 text-nowrap px-4 py-2.5 text-dns-16N-130 text-solid-gray-800',
    'data-hovered:bg-solid-gray-50 data-hovered:underline data-hovered:underline-offset-[calc(3/16*1rem)]',
    'data-pressed:bg-solid-gray-100',
    'data-focus-visible:bg-yellow-300',
    'data-[current]:bg-blue-100 data-[current]:font-bold data-[current]:text-blue-1000',
    'data-[current]:data-hovered:bg-blue-50 data-[current]:data-hovered:text-blue-900',
  ],
  variants: {
    isCondensed: {
      true: 'min-h-9 py-1.5 text-dns-16N-120',
      false: '',
    },
  },
  defaultVariants: {
    isCondensed: false,
  },
});

const languageSelectorArrowIconStyles = tv({
  base: 'transition-transform duration-200 ease-out',
  variants: {
    isOpen: {
      true: 'rotate-180',
      false: 'rotate-0',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export interface LanguageSelectorProps extends AriaMenuTriggerProps {}

export function LanguageSelector(props: LanguageSelectorProps) {
  return <AriaMenuTrigger {...props} />;
}

export interface LanguageSelectorButtonProps
  extends TriggerButtonProps,
    VariantProps<typeof languageSelectorButtonStyles> {}

export function LanguageSelectorButton(props: LanguageSelectorButtonProps) {
  const { className, orientation, ...rest } = props;

  return (
    <TriggerButton
      {...rest}
      orientation={orientation}
      className={composeRenderProps(className, (className, renderProps) =>
        languageSelectorButtonStyles({ ...renderProps, orientation, className }),
      )}
    />
  );
}

export interface LanguageSelectorMenuProps
  extends Omit<AriaMenuProps<object>, 'className'>,
    VariantProps<typeof languageSelectorPopoverStyles> {
  className?: string;
}

export function LanguageSelectorMenu(props: LanguageSelectorMenuProps) {
  const { children, className, isCondensed, ...rest } = props;

  return (
    <AriaPopover className={languageSelectorPopoverStyles({ isCondensed })}>
      <AriaMenu {...rest} className={languageSelectorMenuStyles({ className })}>
        {children}
      </AriaMenu>
    </AriaPopover>
  );
}

export interface LanguageSelectorMenuItemProps
  extends AriaMenuItemProps,
    VariantProps<typeof languageSelectorMenuItemStyles> {
  isCurrent?: boolean;
}

export function LanguageSelectorMenuItem(props: LanguageSelectorMenuItemProps) {
  const { className, isCondensed, isCurrent, ...rest } = props;

  return (
    <AriaMenuItem
      {...rest}
      aria-current={isCurrent ? 'page' : undefined}
      data-current={isCurrent ? '' : undefined}
      className={composeRenderProps(className, (className, renderProps) =>
        languageSelectorMenuItemStyles({
          ...renderProps,
          isCondensed,
          className,
        }),
      )}
      textValue={
        props.textValue || (typeof props.children === 'string' ? props.children : undefined)
      }
    >
      {composeRenderProps(props.children, (children) => (
        <>
          <svg
            aria-hidden={true}
            className='invisible flex-none group-data-[current]/menu-item:visible'
            fill='currentColor'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <path d='m9.5 18-5.7-5.7 1.5-1.4 4.2 4.3L18.7 6l1.4 1.4L9.5 18Z' />
          </svg>
          {children}
        </>
      ))}
    </AriaMenuItem>
  );
}

export interface LanguageSelectorArrowIconProps extends ComponentProps<'svg'> {}

export function LanguageSelectorArrowIcon(props: LanguageSelectorArrowIconProps) {
  const { className, ...rest } = props;
  const state = useContext(OverlayTriggerStateContext);
  const isOpen = state?.isOpen ?? false;

  return (
    <svg
      {...rest}
      aria-hidden={true}
      className={languageSelectorArrowIconStyles({ isOpen, className })}
      fill='none'
      height='16'
      viewBox='0 0 16 16'
      width='16'
    >
      <path
        d='M8 11.4L2 5.33332L2.66667 4.66666L8 9.99999L13.3333 4.66666L14 5.33332L8 11.4Z'
        fill='currentColor'
      />
    </svg>
  );
}

export interface LanguageSelectorGlobeIconProps extends ComponentProps<'svg'> {}

export function LanguageSelectorGlobeIcon(props: LanguageSelectorGlobeIconProps) {
  const { className, ...rest } = props;

  return (
    <svg
      {...rest}
      aria-hidden={true}
      className={className}
      fill='none'
      height='20'
      viewBox='0 0 20 20'
      width='20'
    >
      <path
        d='M10.0006 17.9166C8.91516 17.9166 7.89086 17.7086 6.92773 17.2924C5.9646 16.8763 5.12458 16.3098 4.40769 15.5929C3.69082 14.876 3.12432 14.036 2.70819 13.0729C2.29205 12.1098 2.08398 11.0855 2.08398 9.99999C2.08398 8.90598 2.29205 7.87954 2.70819 6.92068C3.12432 5.96182 3.69082 5.12394 4.40769 4.40705C5.12458 3.69018 5.9646 3.12368 6.92773 2.70755C7.89086 2.29141 8.91516 2.08334 10.0006 2.08334C11.0946 2.08334 12.1211 2.29141 13.0799 2.70755C14.0388 3.12368 14.8767 3.69018 15.5936 4.40705C16.3104 5.12394 16.8769 5.96182 17.2931 6.92068C17.7092 7.87954 17.9173 8.90598 17.9173 9.99999C17.9173 11.0855 17.7092 12.1098 17.2931 13.0729C16.8769 14.036 16.3104 14.876 15.5936 15.5929C14.8767 16.3098 14.0388 16.8763 13.0799 17.2924C12.1211 17.7086 11.0946 17.9166 10.0006 17.9166ZM10.0006 16.649C10.4259 16.0849 10.7838 15.516 11.0744 14.9423C11.365 14.3686 11.6016 13.7414 11.7843 13.0609H8.21696C8.41034 13.7628 8.64966 14.4006 8.93492 14.9743C9.22017 15.5481 9.57541 16.1063 10.0006 16.649ZM8.38688 16.4199C8.06744 15.9615 7.78057 15.4404 7.5263 14.8566C7.27202 14.2727 7.07437 13.6741 6.93334 13.0609H4.10638C4.54656 13.9263 5.13685 14.6533 5.87723 15.242C6.61764 15.8307 7.45419 16.2233 8.38688 16.4199ZM11.6144 16.4199C12.5471 16.2233 13.3836 15.8307 14.124 15.242C14.8644 14.6533 15.4547 13.9263 15.8949 13.0609H13.0679C12.9002 13.6795 12.6892 14.2807 12.4349 14.8646C12.1806 15.4484 11.9071 15.9669 11.6144 16.4199ZM3.58236 11.8109H6.68013C6.62778 11.5011 6.58986 11.1974 6.56636 10.8998C6.54286 10.6023 6.53111 10.3023 6.53111 9.99999C6.53111 9.69764 6.54286 9.39769 6.56636 9.10014C6.58986 8.80259 6.62778 8.49891 6.68013 8.18907H3.58236C3.50223 8.4722 3.4408 8.76654 3.39807 9.07209C3.35533 9.37765 3.33396 9.68695 3.33396 9.99999C3.33396 10.313 3.35533 10.6223 3.39807 10.9279C3.4408 11.2334 3.50223 11.5278 3.58236 11.8109ZM7.93011 11.8109H12.0712C12.1235 11.5011 12.1614 11.2001 12.1849 10.9078C12.2084 10.6157 12.2202 10.313 12.2202 9.99999C12.2202 9.68695 12.2084 9.38433 12.1849 9.09214C12.1614 8.79993 12.1235 8.49891 12.0712 8.18907H7.93011C7.87776 8.49891 7.83983 8.79993 7.81632 9.09214C7.79282 9.38433 7.78107 9.68695 7.78107 9.99999C7.78107 10.313 7.79282 10.6157 7.81632 10.9078C7.83983 11.2001 7.87776 11.5011 7.93011 11.8109ZM13.3211 11.8109H16.4189C16.499 11.5278 16.5605 11.2334 16.6032 10.9279C16.6459 10.6223 16.6673 10.313 16.6673 9.99999C16.6673 9.68695 16.6459 9.37765 16.6032 9.07209C16.5605 8.76654 16.499 8.4722 16.4189 8.18907H13.3211C13.3735 8.49891 13.4114 8.80259 13.4349 9.10014C13.4584 9.39769 13.4702 9.69764 13.4702 9.99999C13.4702 10.3023 13.4584 10.6023 13.4349 10.8998C13.4114 11.1974 13.3735 11.5011 13.3211 11.8109ZM13.0679 6.93912H15.8949C15.4494 6.06303 14.8631 5.33599 14.136 4.75799C13.409 4.18 12.5685 3.78471 11.6144 3.57209C11.9338 4.05714 12.218 4.58759 12.4669 5.16345C12.7159 5.73931 12.9162 6.3312 13.0679 6.93912ZM8.21696 6.93912H11.7843C11.5909 6.24253 11.3476 5.6007 11.0543 5.01361C10.7611 4.42655 10.4098 3.87232 10.0006 3.35095C9.59144 3.87232 9.24021 4.42655 8.94694 5.01361C8.65367 5.6007 8.41034 6.24253 8.21696 6.93912ZM4.10638 6.93912H6.93334C7.08505 6.3312 7.28537 5.73931 7.53432 5.16345C7.78325 4.58759 8.06744 4.05714 8.38688 3.57209C7.42748 3.78471 6.58559 4.18134 5.86121 4.76201C5.13685 5.34268 4.55191 6.06838 4.10638 6.93912Z'
        fill='currentColor'
      />
    </svg>
  );
}

export interface LanguageSelectorGlobeWithLabelIconProps extends ComponentProps<'svg'> {}

export function LanguageSelectorGlobeWithLabelIcon(props: LanguageSelectorGlobeWithLabelIconProps) {
  const { className, ...rest } = props;

  return (
    <svg
      {...rest}
      aria-label={props['aria-label'] ?? 'Language'}
      className={className}
      fill='none'
      height='44'
      role='img'
      viewBox='0 0 44 44'
      width='44'
    >
      <path
        d='M22 27.0669C20.3718 27.0669 18.8353 26.7548 17.3906 26.1306C15.9459 25.5064 14.6859 24.6567 13.6106 23.5814C12.5353 22.506 11.6855 21.246 11.0613 19.8013C10.4371 18.3566 10.125 16.8202 10.125 15.192C10.125 13.5509 10.4371 12.0113 11.0613 10.573C11.6855 9.1347 12.5353 7.87788 13.6106 6.80255C14.6859 5.72724 15.9459 4.87749 17.3906 4.2533C18.8353 3.62909 20.3718 3.31699 22 3.31699C23.641 3.31699 25.1806 3.62909 26.6189 4.2533C28.0572 4.87749 29.314 5.72724 30.3894 6.80255C31.4647 7.87788 32.3144 9.1347 32.9386 10.573C33.5628 12.0113 33.8749 13.5509 33.8749 15.192C33.8749 16.8202 33.5628 18.3566 32.9386 19.8013C32.3144 21.246 31.4647 22.506 30.3894 23.5814C29.314 24.6567 28.0572 25.5064 26.6189 26.1306C25.1806 26.7548 23.641 27.0669 22 27.0669Z'
        fill='currentColor'
      />
      <path
        d='M34.0409 35.272H37.1369V39.544C36.6809 39.696 36.2129 39.808 35.7329 39.88C35.2609 39.96 34.7209 40 34.1129 40C33.2409 40 32.5009 39.824 31.8929 39.472C31.2929 39.12 30.8329 38.616 30.5129 37.96C30.2009 37.304 30.0449 36.516 30.0449 35.596C30.0449 34.7 30.2209 33.924 30.5729 33.268C30.9249 32.612 31.4289 32.104 32.0849 31.744C32.7489 31.376 33.5529 31.192 34.4969 31.192C34.9689 31.192 35.4209 31.24 35.8529 31.336C36.2849 31.424 36.6849 31.548 37.0529 31.708L36.5849 32.788C36.2889 32.652 35.9569 32.54 35.5889 32.452C35.2289 32.356 34.8489 32.308 34.4489 32.308C33.8169 32.308 33.2689 32.444 32.8049 32.716C32.3489 32.98 31.9969 33.36 31.7489 33.856C31.5089 34.344 31.3889 34.928 31.3889 35.608C31.3889 36.248 31.4889 36.816 31.6889 37.312C31.8889 37.808 32.2049 38.196 32.6369 38.476C33.0689 38.756 33.6329 38.896 34.3289 38.896C34.5609 38.896 34.7649 38.888 34.9409 38.872C35.1169 38.848 35.2769 38.824 35.4209 38.8C35.5729 38.768 35.7169 38.74 35.8529 38.716V36.388H34.0409V35.272Z'
        fill='currentColor'
      />
    </svg>
  );
}

export {
  languageSelectorArrowIconStyles,
  languageSelectorButtonStyles,
  languageSelectorMenuItemStyles,
  languageSelectorMenuStyles,
  languageSelectorPopoverStyles,
};
