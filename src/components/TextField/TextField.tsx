import {
  TextField as _TextField,
  type TextFieldProps as _TextFieldProps,
  composeRenderProps,
} from 'react-aria-components';
import { cx } from '@/lib/cva';

export interface TextFieldProps extends _TextFieldProps {}

export function TextField({ ...props }: TextFieldProps) {
  return (
    <_TextField
      {...props}
      className={composeRenderProps(props.className, (className, _renderProps) =>
        cx('', className),
      )}
    >
      {props.children}
    </_TextField>
  );
}
