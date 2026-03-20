import type { ReactNode } from 'react';
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { Description, FieldError, Label } from '../FormControl';
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
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { label, children, description, errorMessage, orientation, ...rest } = props;

  return (
    <AriaCheckboxGroup
      {...rest}
      className={composeTailwindRenderProps(props.className, 'flex flex-col gap-2')}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
      <div className={checkboxGroupItemsStyles({ orientation })}>{children}</div>
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </AriaCheckboxGroup>
  );
}
