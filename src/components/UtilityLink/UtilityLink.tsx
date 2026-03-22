import { cloneElement, isValidElement, type ReactNode } from 'react';
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv, twMerge } from '../utils';

const utilityLinkStyles = tv({
  extend: focusVisibleRing,
  base: ['rounded text-dns-16N-130'],
  variants: {
    hasHref: {
      true: [
        'text-solid-gray-800 underline underline-offset-[calc(3*var(--px-to-rem))]',
        'data-hovered:decoration-[calc(3*var(--px-to-rem))]',
        'data-pressed:text-orange-700 data-pressed:decoration-1',
        'data-focus-visible:bg-yellow-300',
      ],
    },
    isDisabled: {
      true: 'no-underline pointer-events-none text-solid-gray-400',
    },
  },
});

interface UtilityLinkIconRenderProps {
  'aria-hidden': true;
  className: string;
  isDisabled: boolean;
}

interface UtilityLinkTrailingIconRenderProps {
  'aria-label': string;
  className: string;
  isDisabled: boolean;
  role: 'img';
}

export interface LinkProps extends AriaLinkProps, VariantProps<typeof utilityLinkStyles> {
  leadingIcon?: ReactNode | ((props: UtilityLinkIconRenderProps) => ReactNode);
  trailingIcon?: false | ReactNode | ((props: UtilityLinkTrailingIconRenderProps) => ReactNode);
}

const defaultLeadingIconClassName = 'mr-1 inline-block align-[-0.15em]';
const defaultTrailingIconClassName = 'ml-1 inline-block align-[-0.15em]';

function renderIcon(icon: ReactNode, props: UtilityLinkIconRenderProps) {
  if (!icon) {
    return null;
  }

  if (isValidElement<Record<string, unknown>>(icon)) {
    const iconProps = icon.props as Record<string, unknown> & { className?: string };

    return cloneElement<Record<string, unknown>>(icon, {
      'aria-hidden': props['aria-hidden'],
      ...iconProps,
      className: twMerge(props.className, iconProps.className),
    });
  }

  return (
    <span aria-hidden={props['aria-hidden']} className={props.className}>
      {icon}
    </span>
  );
}

function renderTrailingIcon(icon: ReactNode, props: UtilityLinkTrailingIconRenderProps) {
  if (!icon) {
    return null;
  }

  if (isValidElement<Record<string, unknown>>(icon)) {
    const iconProps = icon.props as Record<string, unknown> & { className?: string };

    return cloneElement<Record<string, unknown>>(icon, {
      'aria-label': props['aria-label'],
      role: props.role,
      ...iconProps,
      className: twMerge(props.className, iconProps.className),
    });
  }

  return (
    <span aria-label={props['aria-label']} role='img' className={props.className}>
      {icon}
    </span>
  );
}

const UtilityLink = (props: LinkProps) => {
  const { children, leadingIcon, trailingIcon, ...rest } = props;
  const hasHref = Boolean(props.href);
  const isDisabled = Boolean(props['aria-disabled'] || props.isDisabled);
  const leadingIconProps: UtilityLinkIconRenderProps = {
    'aria-hidden': true,
    className: defaultLeadingIconClassName,
    isDisabled,
  };
  const trailingIconA11yProps: UtilityLinkTrailingIconRenderProps = {
    'aria-label': props['aria-label'] ?? '新規タブで開きます',
    className: defaultTrailingIconClassName,
    isDisabled,
    role: 'img',
  };
  const renderedLeadingIcon =
    typeof leadingIcon === 'function' ? leadingIcon(leadingIconProps) : leadingIcon;
  const renderedTrailingIcon =
    typeof trailingIcon === 'function' ? trailingIcon(trailingIconA11yProps) : trailingIcon;

  return (
    <AriaLink
      className={composeRenderProps(props.className, (className, renderProps) =>
        utilityLinkStyles({
          ...renderProps,
          className,
          hasHref,
          isDisabled,
        }),
      )}
      {...rest}
    >
      {composeRenderProps(children, (children) => (
        <>
          {renderedLeadingIcon && renderIcon(renderedLeadingIcon, leadingIconProps)}
          {children}
          {trailingIcon !== false &&
            (renderedTrailingIcon
              ? renderTrailingIcon(renderedTrailingIcon, trailingIconA11yProps)
              : props.target === '_blank' && (
                  <svg
                    aria-label={trailingIconA11yProps['aria-label']}
                    role={trailingIconA11yProps.role}
                    className={defaultTrailingIconClassName}
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                  >
                    <path d='M3 13H13V8.66667H14V14H2V2H7.33333V3H3V13Z' fill='currentColor' />
                    <path
                      d='M9.33333 3V2H14V6.66667H13V3.73333L7 9.66667L6.33333 9L12.2667 3H9.33333Z'
                      fill='currentColor'
                    />
                  </svg>
                ))}
        </>
      ))}
    </AriaLink>
  );
};

export { UtilityLink, utilityLinkStyles };
