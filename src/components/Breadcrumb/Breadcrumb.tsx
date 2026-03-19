import type { Key } from '@react-types/shared';
import React from 'react';
import {
  Breadcrumb as AriaBreadcrumb,
  type BreadcrumbProps as AriaBreadcrumbProps,
  Breadcrumbs as AriaBreadcrumbs,
  type BreadcrumbsProps as AriaBreadcrumbsProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { Link, type LinkProps } from '@/components';
import { composeTailwindRenderProps, tv } from '../utils';

export type BreadcrumbItemData = {
  id?: Key;
  label: React.ReactNode;
} & Omit<LinkProps, 'children' | 'className'>;

const defaultSeparator = (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden={true}>
    <path
      d='M6.71 11.96L6 11.25L9.27 7.98L6 4.71L6.71 4L10.69 7.98L6.71 11.96Z'
      fill='currentColor'
    />
  </svg>
);

export type BreadcrumbsLabelProps = React.ComponentProps<'span'>;

export function BreadcrumbsLabel(props: BreadcrumbsLabelProps) {
  const { children, className, ...rest } = props;

  return (
    <span className={className} {...rest}>
      {children}
    </span>
  );
}

export interface BreadcrumbsProps<T extends object>
  extends Omit<AriaBreadcrumbsProps<T>, 'className'> {
  className?: string;
  listClassName?: string;
}

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  const { children, className, listClassName, items, ...rest } = props;

  if (typeof children === 'function' || items) {
    return (
      <nav className={className}>
        <AriaBreadcrumbs {...rest} items={items} className={twMerge('inline', listClassName)}>
          {children}
        </AriaBreadcrumbs>
      </nav>
    );
  }

  const allChildren = React.Children.toArray(children);
  const breadcrumbChildren = allChildren.filter(
    (child) => React.isValidElement(child) && child.type === Breadcrumb,
  );
  const otherChildren = allChildren.filter(
    (child) => !(React.isValidElement(child) && child.type === Breadcrumb),
  );

  return (
    <nav className={className}>
      {otherChildren}
      <AriaBreadcrumbs {...rest} className={twMerge('inline', listClassName)}>
        {breadcrumbChildren}
      </AriaBreadcrumbs>
    </nav>
  );
}

const breadcrumbStyles = tv({
  base: ['wrap-break-word'],
  variants: {
    isCurrent: {
      true: '',
      false: 'text-blue-1000',
    },
  },
  defaultVariants: {},
});

export interface BreadcrumbProps extends Omit<LinkProps, 'className' | 'id'> {
  id?: AriaBreadcrumbProps['id'];
  className?: AriaBreadcrumbProps['className'];
  separator?: React.ReactNode;
  linkClassName?: LinkProps['className'];
}

export function Breadcrumb(props: BreadcrumbProps) {
  const {
    id,
    children,
    className,
    linkClassName,
    separator = defaultSeparator,
    ...linkProps
  } = props;

  return (
    <AriaBreadcrumb id={id} className={composeTailwindRenderProps(className, 'inline')}>
      {({ isCurrent }) => (
        <>
          <Link
            {...linkProps}
            aria-current={isCurrent ? 'page' : undefined}
            className={composeTailwindRenderProps(linkClassName, breadcrumbStyles({ isCurrent }))}
          >
            {children}
          </Link>
          {!isCurrent && (
            <span className='inline-block align-middle mx-2' aria-hidden={true}>
              {separator}
            </span>
          )}
        </>
      )}
    </AriaBreadcrumb>
  );
}
