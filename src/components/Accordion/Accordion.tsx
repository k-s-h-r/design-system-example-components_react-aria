import type { ComponentProps } from 'react';
import { useFocusRing } from 'react-aria';
import { compose, cva, cx, focusRing } from '@/lib/cva';

const accordionVariants = cva({
  base: ['group border-b border-solid-grey-400'],
  variants: {},
  defaultVariants: {},
});
const accordionIconVariants = cva({
  base: ['pointer-events-none transition-all duration-200 group-open:rotate-180'],
  variants: {},
  defaultVariants: {},
});
const _accordionTriggerVariants = cva({
  base: [
    'flex cursor-pointer list-none items-center justify-between gap-4',
    'hover:bg-solid-grey-50',
    '[&::-webkit-details-marker]:hidden',
  ],
  variants: {},
  defaultVariants: {},
});

const accordionTriggerVariants = compose(focusRing, _accordionTriggerVariants);

export type AccordionProps = ComponentProps<'details'>;

export const Accordion = (props: AccordionProps) => {
  const { children, className, ...rest } = props;
  return (
    <details className={cx(accordionVariants({ className }))} {...rest}>
      {children}
    </details>
  );
};

export type AccordionDefaultIconProps = ComponentProps<'svg'>;

export const AccordionDefaultIcon = (props: AccordionDefaultIconProps) => {
  const { className, ...rest } = props;

  return (
    <svg
      aria-hidden={true}
      className={cx(accordionIconVariants({ className }))}
      height='48'
      viewBox='0 0 48 48'
      width='48'
      {...rest}
    >
      <path
        d='M24 31.7219L12 19.5886L13.3333 18.2552L24 28.9219L34.6667 18.2552L36 19.5886L24 31.7219Z'
        fill='currentColor'
      />
    </svg>
  );
};

export type AccordionSummaryProps = ComponentProps<'summary'>;

export const AccordionSummary = (props: AccordionSummaryProps) => {
  const { children, className, ...rest } = props;
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <summary
      className={cx(accordionTriggerVariants({ isFocusVisible, className }))}
      {...rest}
      {...focusProps}
    >
      {children}
    </summary>
  );
};
