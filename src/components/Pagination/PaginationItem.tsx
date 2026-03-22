import { composeRenderProps } from 'react-aria-components';
import type { ButtonProps } from '../Button';
import { Button } from '../Button';
import { tv } from '../utils';

export const paginationItemStyles = tv({
  base: 'grid h-12 w-12 min-w-0 shrink-0 place-items-center rounded-full border-border-divider p-1 font-normal',
});

type PaginationItemProps = ButtonProps;

const PaginationItem = ({ children, className, ...props }: PaginationItemProps) => {
  return (
    <Button
      variant='secondary'
      className={composeRenderProps(className, (className) =>
        paginationItemStyles({ className }),
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export { PaginationItem };
