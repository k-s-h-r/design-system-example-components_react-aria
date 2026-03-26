import type { ComponentProps } from 'react';
import {
  Heading as AriaHeading,
  type HeadingProps as AriaHeadingProps,
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv, twMerge } from '../utils';

const emergencyBannerStyles = tv({
  base: 'block border-[6px] border-warning-orange-1 bg-white px-2.5 py-3.5 desktop:p-[calc(26/16*1rem)]',
});

const emergencyBannerBodyStyles = tv({
  base: 'mt-4 text-solid-gray-800',
});

const emergencyBannerHeadingStyles = tv({
  base: 'text-std-20B-150 text-solid-gray-900 desktop:text-std-24B-150',
});

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

export interface EmergencyBannerProps
  extends ComponentProps<'div'>,
    VariantProps<typeof emergencyBannerStyles> {}

export interface EmergencyBannerBodyProps
  extends ComponentProps<'div'>,
    VariantProps<typeof emergencyBannerBodyStyles> {}

export interface EmergencyBannerHeadingProps
  extends AriaHeadingProps,
    VariantProps<typeof emergencyBannerHeadingStyles> {}

export interface EmergencyBannerButtonProps extends AriaLinkProps {}

export function EmergencyBanner(props: EmergencyBannerProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={emergencyBannerStyles({ className })} />;
}

export function EmergencyBannerBody(props: EmergencyBannerBodyProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={emergencyBannerBodyStyles({ className })} />;
}

export function EmergencyBannerHeading(props: EmergencyBannerHeadingProps) {
  const { className, ...rest } = props;

  return <AriaHeading {...rest} className={twMerge(emergencyBannerHeadingStyles(), className)} />;
}

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

export {
  emergencyBannerBodyStyles,
  emergencyBannerButtonStyles,
  emergencyBannerHeadingStyles,
  emergencyBannerStyles,
};
