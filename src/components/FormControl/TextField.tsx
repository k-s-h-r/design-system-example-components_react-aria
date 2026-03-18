import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';

export interface TextFieldProps extends AriaTextFieldProps {}

export function TextField({ ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props} className={composeTailwindRenderProps(props.className, '')}>
      {props.children}
    </AriaTextField>
  );
}
