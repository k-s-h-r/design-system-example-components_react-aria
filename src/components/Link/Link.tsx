import { cloneElement, isValidElement, type ReactNode } from 'react';
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv, twMerge } from '../utils';

const linkStyles = tv({
  extend: focusVisibleRing,
  base: ['rounded'],
  variants: {
    hasHref: {
      true: [
        'text-blue-1000 underline underline-offset-[calc(3*var(--px-to-rem))]',
        'data-hovered:decoration-[calc(3*var(--px-to-rem))]',
        'data-visited:text-magenta-900',
        'data-pressed:text-orange-700 data-pressed:decoration-1',
        'data-focus-visible:bg-yellow-300',
      ],
    },
    isDisabled: {
      true: ['no-underline pointer-events-none text-solid-gray-400'],
    },
  },
  defaultVariants: {},
});

export interface LinkProps extends AriaLinkProps, VariantProps<typeof linkStyles> {
  icon?: false | ((props: LinkIconRenderProps) => ReactNode);
}

interface LinkIconRenderProps {
  'aria-label': string;
  className: string;
  isDisabled: boolean;
  role: 'img';
}

const defaultIconClassName = 'ml-1 inline-block align-[-0.15em]';

function renderCustomIcon(icon: ReactNode, props: LinkIconRenderProps) {
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

const Link = (props: LinkProps) => {
  const { className, children, icon, ...rest } = props;
  const isDisabled = Boolean(props['aria-disabled'] || props.isDisabled);
  const hasHref = Boolean(props.href);
  const externalIconAriaLabel = props['aria-label'] ?? '新規タブで開きます';

  function getLinkIconRenderProps(): LinkIconRenderProps {
    return {
      'aria-label': externalIconAriaLabel,
      className: defaultIconClassName,
      isDisabled,
      role: 'img',
    };
  }

  const customIcon = typeof icon === 'function' ? icon(getLinkIconRenderProps()) : undefined;

  return (
    <AriaLink
      className={composeRenderProps(props.className, (className, renderProps) =>
        linkStyles({ ...renderProps, hasHref, isDisabled, className }),
      )}
      {...rest}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          {props.target === '_blank' &&
            icon !== false &&
            (customIcon ? (
              renderCustomIcon(customIcon, getLinkIconRenderProps())
            ) : (
              <svg
                aria-label={externalIconAriaLabel}
                role='img'
                className={defaultIconClassName}
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

export { Link, linkStyles };
