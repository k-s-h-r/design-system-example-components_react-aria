import type { ComponentProps } from 'react';
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { focusVisibleRing, tv, twMerge } from '../../utils';

export interface EmergencyBannerButtonProps extends AriaLinkProps {}

const emergencyBannerButtonStyles = tv({
  extend: focusVisibleRing,
  base: [
    'relative block mx-auto w-full rounded-12 border-2 border-transparent bg-error-1 p-[calc(18/16*1rem)] text-center text-oln-16B-100 text-white',
    'aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:no-underline',
    'desktop:w-fit desktop:min-w-[50%] desktop:rounded-16 desktop:border-4 desktop:p-5',
    'after:pointer-events-none after:absolute after:inset-0 after:rounded-[calc(10/16*1rem)] after:border-2 after:border-white after:content-[""]',
    'desktop:after:rounded-12 desktop:after:border-4',
    'data-hovered:bg-error-2 data-hovered:underline data-hovered:underline-offset-[calc(3/16*1rem)]',
  ],
});

function NewWindowIcon(props: ComponentProps<'svg'>) {
  const { className, ...rest } = props;

  return (
    <svg
      {...rest}
      aria-label={rest['aria-label'] ?? '新規タブで開きます'}
      className={twMerge('inline', className)}
      fill='none'
      height='16'
      role='img'
      viewBox='0 0 16 16'
      width='16'
    >
      <path
        clipRule='evenodd'
        d='M3 13.5H13V9.16667H14V14.5H2V2.5H7.33333V3.5H3V13.5ZM9.33333 3.5V2.5H14V7.16667H13V4.23333L7 10.1667L6.33333 9.5L12.2667 3.5H9.33333Z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </svg>
  );
}

export function EmergencyBannerButton(props: EmergencyBannerButtonProps) {
  const { children, ...rest } = props;
  const externalIconAriaLabel = props['aria-label'] ?? '新規タブで開きます';

  return (
    <AriaLink
      {...rest}
      className={composeRenderProps(props.className, (className, renderProps) =>
        emergencyBannerButtonStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          {props.target === '_blank' ? (
            <NewWindowIcon aria-label={externalIconAriaLabel} className='ml-1 align-top' />
          ) : null}
        </>
      ))}
    </AriaLink>
  );
}
