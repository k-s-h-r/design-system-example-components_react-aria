import { type ComponentProps, createElement, type ReactNode } from 'react';
import { composeRenderProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { TriggerButton, type TriggerButtonProps } from '../Button';
import { tv } from '../utils';

export type NotificationBannerHeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type NotificationBannerStyle = 'standard' | 'color-chip';
export type NotificationBannerType = 'info1' | 'info2' | 'warning' | 'error' | 'success';

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

const notificationBannerBodyStyles = tv({
  base: [
    'col-start-1 -col-end-1 grid gap-y-2 text-solid-gray-800 text-std-16N-170',
    'desktop:col-start-2',
  ],
});

const notificationBannerCloseStyles = tv({
  base: ['[&>svg]:size-6'],
});

const notificationBannerMobileCloseStyles = tv({
  base: ['[&>svg]:size-5.5'],
});

type NotificationBannerSvgIconProps = ComponentProps<'svg'>;

function InfoIcon(props: NotificationBannerSvgIconProps) {
  return (
    <svg
      {...props}
      aria-label='インフォメーション'
      fill='none'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <circle cx='12' cy='12' r='10' fill='currentColor' />
      <circle cx='12' cy='8' r='1' fill='Canvas' />
      <path d='M11 11h2v6h-2z' fill='Canvas' />
    </svg>
  );
}

function WarningIcon(props: NotificationBannerSvgIconProps) {
  return (
    <svg
      {...props}
      aria-label='警告'
      fill='none'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <path d='M1 21 12 2l11 19H1Z' fill='currentColor' />
      <path d='M13 15h-2v-5h2v5Z' fill='Canvas' />
      <circle cx='12' cy='17' r='1' fill='Canvas' />
    </svg>
  );
}

function ErrorIcon(props: NotificationBannerSvgIconProps) {
  return (
    <svg
      {...props}
      aria-label='エラー'
      fill='none'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <path d='M8.25 21 3 15.75v-7.5L8.25 3h7.5L21 8.25v7.5L15.75 21h-7.5Z' fill='currentColor' />
      <path
        d='m12 13.4-2.85 2.85-1.4-1.4L10.6 12 7.75 9.15l1.4-1.4L12 10.6l2.85-2.85 1.4 1.4L13.4 12l2.85 2.85-1.4 1.4L12 13.4Z'
        fill='Canvas'
      />
    </svg>
  );
}

function SuccessIcon(props: NotificationBannerSvgIconProps) {
  return (
    <svg
      {...props}
      aria-label='成功'
      fill='none'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <circle cx='12' cy='12' r='10' fill='currentColor' />
      <path d='m17.6 9.6-7 7-4.3-4.3L7.7 11l2.9 2.9 5.7-5.6 1.3 1.4Z' fill='Canvas' />
    </svg>
  );
}

export interface NotificationBannerIconProps extends ComponentProps<'svg'> {
  type: NotificationBannerType;
}

export function NotificationBannerIcon(props: NotificationBannerIconProps) {
  const { type, ...rest } = props;

  switch (type) {
    case 'info1':
    case 'info2':
      return <InfoIcon {...rest} />;
    case 'warning':
      return <WarningIcon {...rest} />;
    case 'error':
      return <ErrorIcon {...rest} />;
    case 'success':
      return <SuccessIcon {...rest} />;
    default:
      return null;
  }
}

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
          <NotificationBannerIcon
            className={notificationBannerIconStyles()}
            type={type ?? 'info2'}
          />
          <span className={notificationBannerTitleStyles()}>{title}</span>
        </>,
      )}
      {children}
    </div>
  );
}

export interface NotificationBannerBodyProps
  extends ComponentProps<'div'>,
    VariantProps<typeof notificationBannerBodyStyles> {}

export function NotificationBannerBody(props: NotificationBannerBodyProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={notificationBannerBodyStyles({ className })} />;
}

export interface NotificationBannerCloseProps
  extends TriggerButtonProps,
    VariantProps<typeof notificationBannerCloseStyles> {
  label?: string;
}

export function NotificationBannerClose(props: NotificationBannerCloseProps) {
  const { label = '閉じる', ...rest } = props;

  return (
    <TriggerButton
      {...rest}
      orientation='horizontal'
      type='button'
      className={composeRenderProps(props.className, (className, renderProps) =>
        notificationBannerCloseStyles({ ...renderProps, className }),
      )}
    >
      <svg aria-hidden={true} fill='none' viewBox='0 0 24 24'>
        <path
          d='m6.4 18.6-1-1 5.5-5.6-5.6-5.6 1.1-1 5.6 5.5 5.6-5.6 1 1.1L13 12l5.6 5.6-1 1L12 13l-5.6 5.6Z'
          fill='currentColor'
        />
      </svg>
      <span>{label}</span>
    </TriggerButton>
  );
}

export interface NotificationBannerMobileCloseProps
  extends TriggerButtonProps,
    VariantProps<typeof notificationBannerMobileCloseStyles> {
  label?: string;
}

export function NotificationBannerMobileClose(props: NotificationBannerMobileCloseProps) {
  const { label = '閉じる', ...rest } = props;

  return (
    <TriggerButton
      {...rest}
      aria-label={props['aria-label'] ?? label}
      orientation='vertical'
      type='button'
      className={composeRenderProps(props.className, (className, renderProps) =>
        notificationBannerMobileCloseStyles({ ...renderProps, className }),
      )}
    >
      <svg aria-hidden={true} viewBox='0 0 22 22' fill='none'>
        <path
          d='M1.89474 22L0 20.1053L9.10526 11L0 1.89474L1.89474 0L11 9.10526L20.1053 0L22 1.89474L12.8947 11L22 20.1053L20.1053 22L11 12.8947L1.89474 22Z'
          fill='currentColor'
        />
      </svg>
      <span>{label}</span>
    </TriggerButton>
  );
}

export {
  notificationBannerBodyStyles,
  notificationBannerCloseStyles,
  notificationBannerHeadingStyles,
  notificationBannerIconStyles,
  notificationBannerMobileCloseStyles,
  notificationBannerStyles,
  notificationBannerTitleStyles,
};
