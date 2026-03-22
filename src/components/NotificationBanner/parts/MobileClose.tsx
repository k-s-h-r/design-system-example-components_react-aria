import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv } from '../../utils';

const notificationBannerMobileCloseStyles = tv({
  extend: focusVisibleRing,
  base: [
    'mt-1 inline-flex self-start rounded-4 text-solid-gray-900 touch-manipulation',
    'data-hovered:bg-solid-gray-50 data-hovered:outline data-hovered:outline-1',
    'data-pressed:bg-solid-gray-100',
  ],
});

export interface NotificationBannerMobileCloseProps
  extends AriaButtonProps,
    VariantProps<typeof notificationBannerMobileCloseStyles> {}

export function NotificationBannerMobileClose(props: NotificationBannerMobileCloseProps) {
  return (
    <AriaButton
      {...props}
      type='button'
      className={composeRenderProps(props.className, (className, renderProps) =>
        notificationBannerMobileCloseStyles({ ...renderProps, className }),
      )}
    >
      <svg aria-label='閉じる' role='img' width='44' height='44' viewBox='0 0 44 44'>
        <path
          d='m13 26-2-2 9-9-9-9 2-2 9 9 9-9 2 2-9 9 9 9-2 2-9-9-9 9Z'
          fill='currentColor'
        />
      </svg>
    </AriaButton>
  );
}

export { notificationBannerMobileCloseStyles };
