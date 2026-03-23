import { composeRenderProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { TriggerButton, type TriggerButtonProps } from '../../Button';
import { tv } from '../../utils';

const notificationBannerMobileCloseStyles = tv({
  base: ['[&>svg]:size-5.5'],
});

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

export { notificationBannerMobileCloseStyles };
