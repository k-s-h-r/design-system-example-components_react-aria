import { composeRenderProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { TriggerButton, type TriggerButtonProps } from '../../Button';
import { tv } from '../../utils';

const notificationBannerCloseStyles = tv({
  base: ['[&>svg]:size-6'],
});

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

export { notificationBannerCloseStyles };
