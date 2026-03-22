import type { ReactNode } from 'react';
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { Description } from '../FormControl';
import {
  type RequirementOption,
  renderFieldErrorMessage,
  renderFieldLabel,
  splitFieldChildren,
} from '../FormControl/fieldHelpers';
import { composeTailwindRenderProps, tv } from '../utils';

const checkboxGroupItemsStyles = tv({
  base: 'flex gap-3',
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row flex-wrap gap-x-6 gap-y-3',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, 'children'>,
    VariantProps<typeof checkboxGroupItemsStyles> {
  label?: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  requirement?: RequirementOption;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { label, children, description, errorMessage, orientation, requirement, ...rest } = props;
  const { contentChildren, descriptionChild, errorMessageChild, labelChild } = splitFieldChildren(
    children,
    {
      label: label == null,
      description: description == null,
      errorMessage: errorMessage == null,
    },
  );

  return (
    <AriaCheckboxGroup
      {...rest}
      className={composeTailwindRenderProps(props.className, 'flex flex-col gap-2')}
    >
      {renderFieldLabel(label, requirement, rest.isRequired) ?? labelChild}
      {description != null ? <Description>{description}</Description> : descriptionChild}
      <div className={checkboxGroupItemsStyles({ orientation })}>{contentChildren}</div>
      {renderFieldErrorMessage(errorMessage) ?? errorMessageChild}
    </AriaCheckboxGroup>
  );
}
