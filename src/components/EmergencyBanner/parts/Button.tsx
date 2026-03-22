import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components';
import { buttonStyles } from '../../Button';
import { composeTailwindRenderProps } from '../../utils';

export interface EmergencyBannerButtonProps extends AriaLinkProps {}

export function EmergencyBannerButton(props: EmergencyBannerButtonProps) {
  const { className, ...rest } = props;

  return (
    <AriaLink
      {...rest}
      className={composeTailwindRenderProps(
        className,
        buttonStyles({ size: 'md', variant: 'secondary' }),
      )}
    />
  );
}
