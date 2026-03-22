'use client';

import type { ComponentProps } from 'react';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger as AriaMenuTrigger,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  type MenuTriggerProps as AriaMenuTriggerProps,
  Popover as AriaPopover,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv } from '../utils';

const languageSelectorButtonStyles = tv({
  extend: focusVisibleRing,
  base: [
    'inline-flex min-h-11 w-fit items-center gap-1 rounded-8 px-2 text-oln-16N-100 text-solid-gray-800',
    'data-hovered:bg-solid-gray-50 data-hovered:underline data-hovered:underline-offset-[calc(3/16*1rem)]',
    'data-pressed:bg-solid-gray-100',
    'data-focus-visible:bg-yellow-300',
  ],
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

export interface LanguageSelectorProps extends AriaMenuTriggerProps {}

export function LanguageSelector(props: LanguageSelectorProps) {
  return <AriaMenuTrigger {...props} />;
}

export interface LanguageSelectorButtonProps extends AriaButtonProps, VariantProps<typeof languageSelectorButtonStyles> {}

export function LanguageSelectorButton(props: LanguageSelectorButtonProps) {
  const { className, ...rest } = props;

  return (
    <AriaButton
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        languageSelectorButtonStyles({ ...renderProps, className }),
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
      textValue={props.textValue || (typeof props.children === 'string' ? props.children : undefined)}
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

  return (
    <svg
      {...rest}
      aria-hidden={true}
      className={className}
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
        d='M10.0006 17.9166C8.91516 17.9166 7.89086 17.7086 6.92773 17.2924C5.9646 16.8763 5.12458 16.3098 4.40769 15.5929C3.69082 14.876 3.12432 14.036 2.70819 13.0729C2.29205 12.1098 2.08398 11.0855 2.08398 9.99999C2.08398 8.90598 2.29205 7.87954 2.70819 6.92068C3.12432 5.96182 3.69082 5.12394 4.40769 4.40705C5.12458 3.69018 5.9646 3.12368 6.92773 2.70755C7.89086 2.29141 8.91516 2.08334 10.0006 2.08334C11.0946 2.08334 12.1211 2.29141 13.0799 2.70755C14.0388 3.12368 14.8767 3.69018 15.5936 4.40705C16.3104 5.12394 16.8769 5.96182 17.2931 6.92068C17.7092 7.87954 17.9173 8.90598 17.9173 9.99999C17.9173 11.0855 17.7092 12.1098 17.2931 13.0729C16.8769 14.036 16.3104 14.876 15.5936 15.5929C14.8767 16.3098 14.0388 16.8763 13.0799 17.2924C12.1211 17.7086 11.0946 17.9166 10.0006 17.9166Z'
        fill='currentColor'
        fillOpacity='0.9'
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
  languageSelectorButtonStyles,
  languageSelectorMenuItemStyles,
  languageSelectorMenuStyles,
  languageSelectorPopoverStyles,
};
