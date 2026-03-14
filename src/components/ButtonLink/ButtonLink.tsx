import type { VariantProps } from 'cva';
import { composeRenderProps, Link, type LinkProps } from 'react-aria-components';
import { buttonVariants } from '@/components';
import { cx } from '@/lib/cva';

interface ButtonLinkProps extends LinkProps, VariantProps<typeof buttonVariants> {}

const ButtonLink = (props: ButtonLinkProps) => {
  const { className, variant, size, ...rest } = props;
  return (
    <Link
      className={composeRenderProps(className, (className, renderProps) =>
        cx(buttonVariants({ ...renderProps, variant, size, className })),
      )}
      {...rest}
    />
  );
};

export type { ButtonLinkProps };
export { ButtonLink };
