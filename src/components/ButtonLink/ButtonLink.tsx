import { Link, type LinkProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { buttonStyles } from '@/components';
import { composeTailwindRenderProps } from '../utils';

export interface ButtonLinkProps extends LinkProps, VariantProps<typeof buttonStyles> {}

const ButtonLink = (props: ButtonLinkProps) => {
  const { className, variant, size, ...rest } = props;
  return (
    <Link
      className={composeTailwindRenderProps(className, buttonStyles({ variant, size }))}
      {...rest}
    />
  );
};

export { ButtonLink };
