import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../../utils';

const emergencyBannerBodyStyles = tv({
  base: 'mt-4 text-solid-gray-800',
});

export interface EmergencyBannerBodyProps
  extends ComponentProps<'div'>,
    VariantProps<typeof emergencyBannerBodyStyles> {}

export function EmergencyBannerBody(props: EmergencyBannerBodyProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={emergencyBannerBodyStyles({ className })} />;
}

export { emergencyBannerBodyStyles };
