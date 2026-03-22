import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv } from '../../utils';

const notificationBannerCloseStyles = tv({
  extend: focusVisibleRing,
  base: [
    '-mr-3 inline-flex items-center self-start gap-1 rounded-6 px-3 pb-1.5 pt-1 text-solid-gray-900',
    'data-hovered:bg-solid-gray-50 data-hovered:underline data-hovered:underline-offset-[calc(3*var(--px-to-rem))]',
    'data-pressed:bg-solid-gray-100 data-pressed:underline',
  ],
});

export interface NotificationBannerCloseProps
  extends AriaButtonProps,
    VariantProps<typeof notificationBannerCloseStyles> {
  label?: string;
}

export function NotificationBannerClose(props: NotificationBannerCloseProps) {
  const { label = '閉じる', ...rest } = props;

  return (
    <AriaButton
      {...rest}
      type='button'
      className={composeRenderProps(props.className, (className, renderProps) =>
        notificationBannerCloseStyles({ ...renderProps, className }),
      )}
    >
      <svg aria-hidden={true} className='mt-0.5 size-6' fill='none' viewBox='0 0 24 24'>
        <path
          d='m6.4 18.6-1-1 5.5-5.6-5.6-5.6 1.1-1 5.6 5.5 5.6-5.6 1 1.1L13 12l5.6 5.6-1 1L12 13l-5.6 5.6Z'
          fill='currentColor'
        />
      </svg>
      <span className='text-oln-16N-100'>{label}</span>
    </AriaButton>
  );
}

export { notificationBannerCloseStyles };
