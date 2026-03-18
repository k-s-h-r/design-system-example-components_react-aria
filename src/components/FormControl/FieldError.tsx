import { FieldError as AriaFieldError, type FieldErrorProps } from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';

const FieldError = (props: FieldErrorProps) => {
  return (
    <AriaFieldError
      {...props}
      className={composeTailwindRenderProps(props.className, 'text-dns-16N-130 text-error-1')}
    />
  );
};

export { FieldError };
