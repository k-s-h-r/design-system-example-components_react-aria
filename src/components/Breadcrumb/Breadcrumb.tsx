import type { VariantProps } from 'cva';
import React, { type ComponentProps } from 'react';
import { cva, cx } from '@/lib/cva';
import { BreadcrumbItem } from './BreadcrumbItem';

export const variantsClass = cva({
  base: [],
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type BreadcrumbVariants = VariantProps<typeof variantsClass> & ComponentProps<'div'>;

type Items = {
  label: string;
  href?: string;
  className?: string;
}[];

export interface BreadcrumbProps extends BreadcrumbVariants {
  separator: React.ReactNode;
  ariaLabel?: string;
  classNames?: {
    items?: string;
    item?: string;
    separator?: string;
  };
  items?: Items;
}

function getItems(
  items: Items,
  separator: React.ReactNode,
  itemClass: string,
  separatorClass: string,
) {
  return items.map((item, index) => {
    const { label, href, className, ...rest } = item;
    return (
      <li className={itemClass} key={String(index)}>
        {index === items.length - 1 && (
          <BreadcrumbItem className={className} aria-current='page' {...rest}>
            {label}
          </BreadcrumbItem>
        )}
        {index !== items.length - 1 && (
          <>
            <BreadcrumbItem className={className} href={href} {...rest}>
              {label}
            </BreadcrumbItem>
            <div className={separatorClass} aria-hidden={true} key={`separator-${String(index)}`}>
              {separator}
            </div>
          </>
        )}
      </li>
    );
  });
}

function getNodeItems(
  children: React.ReactNode,
  separator: React.ReactNode,
  itemClass: string | undefined,
  separatorClass: string | undefined,
) {
  const _children =
    React.isValidElement(children) && children.type === React.Fragment
      ? children.props.children
      : children;
  const items = React.Children.toArray(_children).reduce<React.ReactNode[]>(
    (acc, child, index, array) => {
      const item = (
        <li className={itemClass} key={String(index)}>
          {child}

          {index !== array.length - 1 && (
            <div className={separatorClass} aria-hidden={true} key={`separator-${String(index)}`}>
              {separator}
            </div>
          )}
        </li>
      );

      acc.push(item);
      return acc;
    },
    [],
  );
  return items;
}

export const Breadcrumb = ({ ...props }: BreadcrumbProps) => {
  const { className, classNames, separator, children, items, ...rest } = props;
  const _separator = (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden={true}>
      <path
        d='M6.71 11.96L6 11.25L9.27 7.98L6 4.71L6.71 4L10.69 7.98L6.71 11.96Z'
        fill='currentColor'
      />
    </svg>
  );

  return (
    <nav aria-label={props.ariaLabel || 'パンくずリスト'} className={className} {...rest}>
      <ol className={classNames?.items}>
        {items
          ? getItems(
              items,
              separator || _separator,
              cx('inline', classNames?.item),
              cx('inline-block align-middle mx-2', classNames?.separator),
            )
          : getNodeItems(
              children,
              separator || _separator,
              cx('inline', classNames?.item),
              cx('inline-block align-middle mx-2', classNames?.separator),
            )}
      </ol>
    </nav>
  );
};
