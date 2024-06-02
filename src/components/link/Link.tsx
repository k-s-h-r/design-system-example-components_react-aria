import { compose, cva, cx, focusRing } from '@/lib/cva';
import type { VariantProps } from 'cva';
import { forwardRef } from 'react';
import {
  Link as _Link,
  type LinkProps as _LinkProps,
  composeRenderProps,
} from 'react-aria-components';

const _linkVariants = cva({
  base: [
    'rounded text-blue-1000 underline',
    'visited:text-magenta-900',
    'hover:text-blue-900',
    'pressed:text-orange-700',
    'disabled:no-underline disabled:pointer-events-none disabled:text-solid-grey-420',
  ],
  variants: {},
  defaultVariants: {},
});

const linkVariants = compose(focusRing, _linkVariants);

export interface LinkProps extends _LinkProps, VariantProps<typeof linkVariants> {
  icon?: {
    className?: string;
    ariaLabel?: string;
  };
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { className, children, icon, ...rest } = props;

  return (
    <_Link
      className={composeRenderProps(className, (className, renderProps) =>
        cx(linkVariants({ ...renderProps, className })),
      )}
      {...rest}
      ref={ref}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          {props.target === '_blank' && (
            <svg
              aria-label={`${icon?.ariaLabel ?? '新規タブで開きます'}`}
              role='img'
              className={`mb-[3px] ml-1 inline ${icon ? icon.className ?? '' : ''}`}
              fill='none'
              height='20'
              viewBox='0 0 21 20'
              width='21'
            >
              <g>
                <path
                  clipRule='evenodd'
                  d='M4.40625 16.25H16.9062V10.8333H18.1562V17.5H3.15625V2.5H9.82292V3.75H4.40625V16.25ZM12.3229 3.75V2.5H18.1562V8.33333H16.9062V4.66667L9.40625 12.0833L8.57292 11.25L15.9896 3.75H12.3229Z'
                  fill='currentColor'
                  fillRule='evenodd'
                />
              </g>
            </svg>
          )}
        </>
      ))}
    </_Link>
  );
});

Link.displayName = 'Link';

export { Link, linkVariants };
