import type { ComponentProps } from 'react';

export type RequirementBadgeProps = ComponentProps<'span'> & {
  isOptional?: boolean;
};

export const RequirementBadge = (props: RequirementBadgeProps) => {
  const { children, className, isOptional, ...rest } = props;

  return (
    <span
      className={`
      text-oln-16N-1
      ${isOptional ? 'text-solid-gray-600' : 'text-error-1'}
      ${className ?? ''}
    `}
      {...rest}
    >
      {children}
    </span>
  );
};
