import type { ComponentProps } from 'react';
import type { NotificationBannerType } from '../types';

type IconProps = ComponentProps<'svg'>;

function InfoIcon(props: IconProps) {
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

function WarningIcon(props: IconProps) {
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

function ErrorIcon(props: IconProps) {
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

function SuccessIcon(props: IconProps) {
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
