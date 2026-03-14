'use client';

import type React from 'react';
import { useContext } from 'react';
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  Button,
  type ButtonProps,
  composeRenderProps,
  Disclosure,
  DisclosureGroup,
  type DisclosureGroupProps,
  DisclosurePanel,
  type DisclosurePanelProps,
  type DisclosureProps,
  DisclosureStateContext,
  Heading,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';

const accordion = tv({
  base: [
    'group/accordion border-b border-solid-gray-420',
    '[--icon-size:calc(20/16*1rem)] desktop:[--icon-size:calc(32/16*1rem)]',
  ],
});

const accordionSummary = tv({
  extend: focusRing,
  base: [
    'group/summary relative block w-full cursor-default',
    'py-2 pl-[calc(var(--icon-size)+(--spacing(3)))] pr-2 text-left',
    'desktop:py-3.5 desktop:pl-[calc(var(--icon-size)+(--spacing(5)))] desktop:pr-4',
    'data-hovered:bg-solid-gray-50',
    'data-focus-visible:rounded-4 data-focus-visible:bg-yellow-300',
    'data-disabled:hover:bg-transparent data-disabled:text-solid-gray-400',
    'data-aria-disabled:hover:bg-transparent data-aria-disabled:text-solid-gray-400 data-aria-disabled:pointer-events-none',
  ],
  variants: {},
});

const accordionIconContainer = tv({
  base: [
    'absolute top-2 left-0.5 mt-[calc((1lh-var(--icon-size))/2)] inline-flex size-[var(--icon-size)] items-center justify-center rounded-full border border-current bg-white text-blue-1000',
    'desktop:top-3.5 desktop:left-1.5',
    'group-data-hovered/summary:outline group-data-hovered/summary:outline-2 group-data-hovered/summary:outline-current',
  ],
  variants: {
    isExpanded: {
      true: 'rotate-180',
    },
    isDisabled: {
      true: 'text-solid-grey-400',
    },
  },
});

const accordionDefaultIcon = tv({
  base: 'pointer-events-none mt-0.5 size-4 desktop:size-auto',
});

const accordionContent = tv({
  base: [
    'pl-[calc(var(--icon-size)+(12/16*1rem))] pr-2 py-4',
    'desktop:pl-[calc(var(--icon-size)+(20/16*1rem))] desktop:pr-4 desktop:py-6',
  ],
});

const accordionBackLink = tv({
  base: [
    'flex w-fit items-start gap-1.5',
    'text-blue-1000 underline underline-offset-[calc(3/16*1rem)]',
    'hover:text-blue-1000 hover:decoration-[calc(3/16*1rem)]',
    'active:text-orange-800 active:decoration-1',
    'data-focus-visible:rounded-4 data-focus-visible:outline-4 data-focus-visible:outline-black data-focus-visible:outline-offset-[calc(2/16*1rem)] data-focus-visible:bg-yellow-300 data-focus-visible:text-blue-1000 data-focus-visible:ring-[calc(2/16*1rem)] data-focus-visible:ring-yellow-300',
  ],
});

const accordionBackLinkIcon = tv({
  base: 'mt-[calc((1lh-24px)/2)] shrink-0',
});

export interface AccordionGroupProps extends DisclosureGroupProps {}

export function AccordionGroup(props: AccordionGroupProps) {
  return <DisclosureGroup {...props} />;
}

export interface AccordionProps extends DisclosureProps {}

export function Accordion({ children, ...props }: AccordionProps) {
  return (
    <Disclosure
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        accordion({ ...renderProps, className }),
      )}
    >
      {children}
    </Disclosure>
  );
}

export interface AccordionDefaultIconProps extends React.ComponentProps<'svg'> {
  isExpanded?: boolean;
  isDisabled?: boolean;
}

export function AccordionDefaultIcon(props: AccordionDefaultIconProps) {
  const { className, ...rest } = props;

  return (
    <svg
      aria-hidden={true}
      className={accordionDefaultIcon({ className })}
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      {...rest}
    >
      <g>
        <path
          d='M16.668 5.5L10.0013 12.1667L3.33464 5.5L2.16797 6.66667L10.0013 14.5L17.8346 6.66667L16.668 5.5Z'
          fill='currentColor'
        />
      </g>
    </svg>
  );
}

export interface AccordionIconRenderProps {
  defaultIcon: React.ReactNode;
  defaultIconProps: AccordionDefaultIconProps;
  isExpanded: boolean;
  isDisabled: boolean;
}

export interface AccordionSummaryProps extends Omit<ButtonProps, 'slot'> {
  icon?: React.ReactNode | ((props: AccordionIconRenderProps) => React.ReactNode);
}

export function AccordionSummary(props: AccordionSummaryProps) {
  const { children, className, icon, ...rest } = props;
  const { isExpanded } = useContext(DisclosureStateContext);

  return (
    <Heading>
      <Button
        {...rest}
        slot='trigger'
        className={composeTailwindRenderProps(className, accordionSummary())}
      >
        {({ isDisabled }) => {
          const defaultIconProps: AccordionDefaultIconProps = {
            isExpanded,
            isDisabled,
          };

          const defaultIcon = (
            <span
              className={accordionIconContainer({
                isExpanded,
                isDisabled,
              })}
            >
              <AccordionDefaultIcon {...defaultIconProps} />
            </span>
          );

          return (
            <>
              {typeof icon === 'function'
                ? icon({
                    defaultIcon,
                    defaultIconProps,
                    isExpanded,
                    isDisabled,
                  })
                : (icon ?? defaultIcon)}
              {children}
            </>
          );
        }}
      </Button>
    </Heading>
  );
}

export interface AccordionContentProps extends Omit<DisclosurePanelProps, 'className'> {
  panelClassName?: DisclosurePanelProps['className'];
  className?: string;
}

export function AccordionContent(props: AccordionContentProps) {
  const { children, className, panelClassName, ...rest } = props;

  return (
    <DisclosurePanel
      {...rest}
      className={composeTailwindRenderProps(
        panelClassName,
        'h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]',
      )}
    >
      <div className={accordionContent({ className })}>{children}</div>
    </DisclosurePanel>
  );
}

export interface AccordionBackLinkProps extends AriaLinkProps {}

export function AccordionBackLink(props: AccordionBackLinkProps) {
  const { className, children, href, ...rest } = props;

  return (
    <AriaLink
      className={composeTailwindRenderProps(className, accordionBackLink())}
      href={href}
      {...rest}
    >
      {composeRenderProps(children, (children) => (
        <>
          <svg
            aria-hidden={true}
            className={accordionBackLinkIcon()}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <g>
              <path
                d='M5 7L7 7L7 14.1C7 15.15 7.33333 16.0625 8 16.8375C8.66667 17.6125 9.5 18 10.5 18C11.5 18 12.3333 17.6125 13 16.8375C13.6667 16.0625 14 15.15 14 14.1L14 7.8L11.4 10.4L10 9L15 4L20 9L18.6 10.4L16 7.8V14.1C16 15.7167 15.475 17.1042 14.425 18.2625C13.375 19.4208 12.0667 20 10.5 20C8.93333 20 7.625 19.4208 6.575 18.2625C5.525 17.1042 5 15.7167 5 14.1L5 7Z'
                fill='currentColor'
              />
            </g>
          </svg>
          {children}
        </>
      ))}
    </AriaLink>
  );
}
