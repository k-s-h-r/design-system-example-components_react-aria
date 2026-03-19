import type { VariantProps } from 'cva';
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { composeTailwindRenderProps, focusRing, tv } from '../utils';

const linkStyles = tv({
  extend: focusRing,
  base: [
    'rounded',
    // 'aria-disabled:no-underline aria-disabled:pointer-events-none aria-disabled:text-solid-gray-400',
  ],
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
  icon?: false | ((isDisabled: boolean) => React.ReactNode);
}

const Link = (props: LinkProps) => {
  const { className, children, icon, ...rest } = props;
  const isDisabled = props['aria-disabled'] || props.isDisabled;
  const hasHref = Boolean(props.href);
  const customIcon = typeof icon === 'function' ? icon(Boolean(isDisabled)) : undefined;

  return (
    <AriaLink
      className={composeTailwindRenderProps(className, linkStyles({ hasHref, isDisabled }))}
      {...rest}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          {props.target === '_blank' &&
            icon !== false &&
            (customIcon ? (
              <span aria-label='新規タブで開きます' role='img' className='mb-0.75 ml-1 inline'>
                {customIcon}
              </span>
            ) : (
              <svg
                aria-label='新規タブで開きます'
                role='img'
                className='mb-0.75 ml-1 inline'
                fill='none'
                height='20'
                viewBox='0 0 21 20'
                width='21'
              >
                <path
                  clipRule='evenodd'
                  d='M4.40625 16.25H16.9062V10.8333H18.1562V17.5H3.15625V2.5H9.82292V3.75H4.40625V16.25ZM12.3229 3.75V2.5H18.1562V8.33333H16.9062V4.66667L9.40625 12.0833L8.57292 11.25L15.9896 3.75H12.3229Z'
                  fill='currentColor'
                  fillRule='evenodd'
                />
              </svg>
            ))}
        </>
      ))}
    </AriaLink>
  );
};

export { Link, linkStyles };
