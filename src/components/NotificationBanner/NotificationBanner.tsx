import { createElement, type ComponentProps, type ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { NotificationBannerIcon } from './parts/Icon';
import type { NotificationBannerHeadingLevel } from './types';
import { tv } from '../utils';

const notificationBannerStyles = tv({
  base: [
    'grid grid-cols-[var(--icon-size)_1fr_minmax(0,auto)] grid-rows-[minmax(calc(36/16*1rem),auto)] gap-4 border-current',
    'px-4 pt-2 pb-6 [--icon-size:calc(24/16*1rem)] desktop:gap-x-6 desktop:px-6 desktop:pt-6 desktop:pb-8 desktop:[--icon-size:calc(36/16*1rem)]',
  ],
  variants: {
    bannerStyle: {
      standard: 'rounded-12 border-[calc(3/16*1rem)]',
      'color-chip': [
        'border-[calc(2/16*1rem)] pl-6 shadow-[inset_calc(8/16*1rem)_0_0_0_var(--notification-banner-chip-color)]',
        'desktop:pl-10 desktop:shadow-[inset_calc(16/16*1rem)_0_0_0_var(--notification-banner-chip-color)]',
      ],
    },
    type: {
      info1: 'text-blue-900 [--notification-banner-chip-color:currentColor]',
      info2: 'text-solid-gray-536 [--notification-banner-chip-color:currentColor]',
      warning: 'text-warning-yellow-2 [--notification-banner-chip-color:theme(colors.yellow.400)]',
      error: 'text-error-1 [--notification-banner-chip-color:currentColor]',
      success: 'text-success-2 [--notification-banner-chip-color:currentColor]',
    },
  },
  defaultVariants: {
    bannerStyle: 'standard',
    type: 'info2',
  },
});

const notificationBannerHeadingStyles = tv({
  base: 'col-span-2 grid grid-cols-[inherit] gap-[inherit]',
});

const notificationBannerIconStyles = tv({
  base: 'mt-[calc(3/16*1rem)] size-7 max-h-none max-w-none justify-self-center desktop:-my-1 desktop:size-11',
});

const notificationBannerTitleStyles = tv({
  base: 'pt-[calc(3/16*1rem)] text-solid-gray-900 text-std-17B-170 desktop:pt-0.5 desktop:text-std-20B-150',
});

export interface NotificationBannerProps
  extends Omit<ComponentProps<'div'>, 'title'>,
    VariantProps<typeof notificationBannerStyles> {
  children: ReactNode;
  headingLevel?: NotificationBannerHeadingLevel;
  title: ReactNode;
}

export function NotificationBanner(props: NotificationBannerProps) {
  const { bannerStyle, children, className, headingLevel = 'h2', title, type, ...rest } = props;

  return (
    <div {...rest} className={notificationBannerStyles({ bannerStyle, type, className })}>
      {createElement(
        headingLevel,
        {
          className: notificationBannerHeadingStyles(),
        },
        <>
          <NotificationBannerIcon className={notificationBannerIconStyles()} type={type ?? 'info2'} />
          <span className={notificationBannerTitleStyles()}>{title}</span>
        </>,
      )}
      {children}
    </div>
  );
}

export {
  notificationBannerHeadingStyles,
  notificationBannerIconStyles,
  notificationBannerStyles,
  notificationBannerTitleStyles,
};
