import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../../utils';

const notificationBannerBodyStyles = tv({
  base: [
    'col-start-1 -col-end-1 grid gap-y-2 text-solid-gray-800 text-std-16N-170',
    'desktop:col-start-2',
  ],
});

export interface NotificationBannerBodyProps
  extends ComponentProps<'div'>,
    VariantProps<typeof notificationBannerBodyStyles> {}

export function NotificationBannerBody(props: NotificationBannerBodyProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={notificationBannerBodyStyles({ className })} />;
}

export { notificationBannerBodyStyles };
