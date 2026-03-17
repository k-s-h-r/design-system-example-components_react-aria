import {
  FieldError as _FieldError,
  composeRenderProps,
  type FieldErrorProps,
} from 'react-aria-components';
import { cx } from '@/lib/cva';

const FieldError = (props: FieldErrorProps) => {
  return (
    <_FieldError
      {...props}
      className={composeRenderProps(props.className, (className, _renderProps) =>
        cx('text-dns-16n-3 text-error-1', className),
      )}
    />
  );
};

export { FieldError };
