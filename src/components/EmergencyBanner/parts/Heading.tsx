import {
  Heading as AriaHeading,
  type HeadingProps as AriaHeadingProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { tv, twMerge } from '../../utils';

const emergencyBannerHeadingStyles = tv({
  base: 'text-std-20B-150 text-solid-gray-900 desktop:text-std-24B-150',
});

export interface EmergencyBannerHeadingProps
  extends AriaHeadingProps,
    VariantProps<typeof emergencyBannerHeadingStyles> {}

export function EmergencyBannerHeading(props: EmergencyBannerHeadingProps) {
  const { className, ...rest } = props;

  return <AriaHeading {...rest} className={twMerge(emergencyBannerHeadingStyles(), className)} />;
}

export { emergencyBannerHeadingStyles };
