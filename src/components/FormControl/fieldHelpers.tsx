import { Children, isValidElement, type ReactNode } from 'react';
import type { ValidationResult } from 'react-aria-components';
import { Description } from './Description';
import { FieldError } from './FieldError';
import { Label } from './Label';
import { Requirements } from './Requirements';

export type RequirementVariant = 'required' | 'optional' | 'readonly' | 'disabled';

export type RequirementOption =
  | false
  | RequirementVariant
  | {
      children?: ReactNode;
      variant: RequirementVariant;
    };

export type FieldErrorContent = ReactNode | ((validation: ValidationResult) => ReactNode);

const defaultRequirementLabel: Record<RequirementVariant, ReactNode> = {
  required: '※必須',
  optional: '任意',
  readonly: '変更不可',
  disabled: '無効',
};

function getRequirementConfig(
  requirement: RequirementOption | undefined,
  isRequired?: boolean,
): Exclude<RequirementOption, false | undefined> | null {
  if (requirement === false) {
    return null;
  }

  if (requirement) {
    return requirement;
  }

  if (isRequired) {
    return 'required';
  }

  return null;
}

export function renderRequirement(
  requirement: RequirementOption | undefined,
  isRequired?: boolean,
): ReactNode {
  const config = getRequirementConfig(requirement, isRequired);

  if (!config) {
    return null;
  }

  if (typeof config === 'string') {
    return <Requirements variant={config}>{defaultRequirementLabel[config]}</Requirements>;
  }

  return (
    <Requirements variant={config.variant}>
      {config.children ?? defaultRequirementLabel[config.variant]}
    </Requirements>
  );
}

export function renderFieldLabel(
  label: ReactNode,
  requirement: RequirementOption | undefined,
  isRequired?: boolean,
): ReactNode {
  if (label == null) {
    return null;
  }

  return (
    <Label>
      {label}
      {renderRequirement(requirement, isRequired)}
    </Label>
  );
}

export function renderFieldErrorMessage(errorMessage: FieldErrorContent | undefined): ReactNode {
  if (errorMessage == null) {
    return null;
  }

  return <FieldError>{errorMessage}</FieldError>;
}

function isElementOfType(child: ReactNode, component: unknown) {
  return isValidElement(child) && child.type === component;
}

interface FilterFieldChildrenOptions {
  description?: boolean;
  errorMessage?: boolean;
  label?: boolean;
}

export interface SplitFieldChildrenOptions extends FilterFieldChildrenOptions {}

export function filterFieldChildren(
  children: ReactNode,
  options: FilterFieldChildrenOptions,
): ReactNode[] {
  return Children.toArray(children).filter((child) => {
    if (options.label && isElementOfType(child, Label)) {
      return false;
    }

    if (options.description && isElementOfType(child, Description)) {
      return false;
    }

    if (options.errorMessage && isElementOfType(child, FieldError)) {
      return false;
    }

    return true;
  });
}

export function hasFieldChild(children: ReactNode, component: unknown) {
  return Children.toArray(children).some((child) => isElementOfType(child, component));
}

export function splitFieldChildren(
  children: ReactNode,
  options: SplitFieldChildrenOptions,
): {
  contentChildren: ReactNode[];
  descriptionChild: ReactNode | null;
  errorMessageChild: ReactNode | null;
  labelChild: ReactNode | null;
} {
  let labelChild: ReactNode | null = null;
  let descriptionChild: ReactNode | null = null;
  let errorMessageChild: ReactNode | null = null;
  const contentChildren: ReactNode[] = [];

  for (const child of Children.toArray(children)) {
    if (options.label && labelChild == null && isElementOfType(child, Label)) {
      labelChild = child;
      continue;
    }

    if (options.description && descriptionChild == null && isElementOfType(child, Description)) {
      descriptionChild = child;
      continue;
    }

    if (options.errorMessage && errorMessageChild == null && isElementOfType(child, FieldError)) {
      errorMessageChild = child;
      continue;
    }

    contentChildren.push(child);
  }

  return {
    contentChildren,
    descriptionChild,
    errorMessageChild,
    labelChild,
  };
}
