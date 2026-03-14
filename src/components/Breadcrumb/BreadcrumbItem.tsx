import { Link, type LinkProps } from '@/components';
import { cx } from '@/lib/cva';

export const BreadcrumbItem = ({ children, className, ...props }: LinkProps) => {
  return (
    <Link {...props} className={cx('text-oln-14N-1', className)}>
      {children}
    </Link>
  );
};
