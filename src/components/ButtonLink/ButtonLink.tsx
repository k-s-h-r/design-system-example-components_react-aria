import { Link, type LinkProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { buttonVariants } from '@/components';
import { composeTailwindRenderProps } from '../utils';

export interface ButtonLinkProps extends LinkProps, VariantProps<typeof buttonVariants> {}

const ButtonLink = (props: ButtonLinkProps) => {
  const { className, variant, size, ...rest } = props;
  return (
    <Link
      className={composeTailwindRenderProps(className, buttonVariants({ variant, size }))}
      {...rest}
    />
  );
};

export { ButtonLink };
