import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils';

const emergencyBannerStyles = tv({
  base: 'block border-[6px] border-warning-orange-1 bg-white px-2.5 py-3.5 desktop:p-[calc(26/16*1rem)]',
});

export interface EmergencyBannerProps
  extends ComponentProps<'div'>,
    VariantProps<typeof emergencyBannerStyles> {}

export function EmergencyBanner(props: EmergencyBannerProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={emergencyBannerStyles({ className })} />;
}

export { emergencyBannerStyles };
