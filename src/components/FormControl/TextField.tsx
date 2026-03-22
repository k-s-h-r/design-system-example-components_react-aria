import type { ReactNode } from 'react';
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';
import { Description } from './Description';
import {
  type FieldErrorContent,
  filterFieldChildren,
  type RequirementOption,
  renderFieldErrorMessage,
  renderFieldLabel,
} from './fieldHelpers';

export interface TextFieldProps extends AriaTextFieldProps {
  description?: ReactNode;
  errorMessage?: FieldErrorContent;
  label?: ReactNode;
  requirement?: RequirementOption;
}

export function TextField({
  children,
  description,
  errorMessage,
  label,
  requirement,
  ...props
}: TextFieldProps) {
  const leadingContent = (
    <>
      {renderFieldLabel(label, requirement, props.isRequired)}
      {description != null ? <Description>{description}</Description> : null}
    </>
  );

  const trailingContent = renderFieldErrorMessage(errorMessage);

  const renderedChildren =
    typeof children === 'function'
      ? (values) => (
          <>
            {leadingContent}
            {children(values)}
            {trailingContent}
          </>
        )
      : (
          <>
            {leadingContent}
            {filterFieldChildren(children, {
              label: label != null,
              description: description != null,
              errorMessage: errorMessage != null,
            })}
            {trailingContent}
          </>
        );

  return (
    <AriaTextField {...props} className={composeTailwindRenderProps(props.className, '')}>
      {renderedChildren}
    </AriaTextField>
  );
}
