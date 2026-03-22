import { Children, createElement, type ComponentProps, forwardRef, isValidElement } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv, twMerge } from '../utils';

export type HeadingSize = '64' | '57' | '45' | '36' | '32' | '28' | '24' | '20' | '18' | '16';
export type RuleSize = '8' | '6' | '4' | '2';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const headingStyles = tv({
  base: 'text-solid-gray-800',
  variants: {
    size: {
      '64': 'text-dsp-64B-140 [--shoulder-size:calc(28/16*1rem)] [--shoulder-line-height:1.5] [--shoulder-letter-spacing:0.01em]',
      '57': 'text-dsp-57B-140 [--shoulder-size:calc(24/16*1rem)] [--shoulder-line-height:1.5] [--shoulder-letter-spacing:0.02em]',
      '45': 'text-std-45B-140 [--shoulder-size:calc(22/16*1rem)] [--shoulder-line-height:1.5] [--shoulder-letter-spacing:0.02em]',
      '36': 'text-std-36B-140 [--shoulder-size:calc(20/16*1rem)] [--shoulder-line-height:1.5] [--shoulder-letter-spacing:0.02em]',
      '32': 'text-std-32B-150 [--shoulder-size:calc(18/16*1rem)] [--shoulder-line-height:1.6] [--shoulder-letter-spacing:0.02em]',
      '28': 'text-std-28B-150 [--shoulder-size:calc(16/16*1rem)] [--shoulder-line-height:1.7] [--shoulder-letter-spacing:0.01em]',
      '24': 'text-std-24B-150 [--shoulder-size:calc(16/16*1rem)] [--shoulder-line-height:1.7] [--shoulder-letter-spacing:0.02em]',
      '20': 'text-std-20B-150 [--shoulder-size:calc(16/16*1rem)] [--shoulder-line-height:1.7] [--shoulder-letter-spacing:0.02em]',
      '18': 'text-std-18B-160 [--shoulder-size:calc(16/16*1rem)] [--shoulder-line-height:1.7] [--shoulder-letter-spacing:0.02em]',
      '16': 'text-std-16B-170 [--shoulder-size:calc(16/16*1rem)] [--shoulder-line-height:1.7] [--shoulder-letter-spacing:0.02em]',
    },
    hasChip: {
      true: [
        'relative pl-[calc(1em/3+0.5em)]',
        "before:absolute before:bottom-[0.1em] before:left-0 before:top-[0.2em] before:w-[calc(1em/3)] before:bg-blue-900 before:content-['']",
        'supports-[top:1lh]:before:bottom-[calc(0.5lh-0.55em)] supports-[top:1lh]:before:top-[calc(0.5lh-0.45em)]',
        'forced-colors:before:bg-[CanvasText]',
      ],
      false: '',
    },
    hasShoulder: {
      true: '',
      false: '',
    },
    rule: {
      '8': 'border-b-[calc(8/16*1rem)] border-solid border-blue-900 pb-8',
      '6': 'border-b-[calc(6/16*1rem)] border-solid border-blue-900 pb-6',
      '4': 'border-b-[calc(4/16*1rem)] border-solid border-blue-900 pb-4',
      '2': 'border-b-[calc(2/16*1rem)] border-solid border-blue-900 pb-2',
    },
  },
  compoundVariants: [
    {
      hasChip: true,
      hasShoulder: true,
      className: 'before:!top-[calc((var(--shoulder-size)*(var(--shoulder-line-height)-1))/2)]',
    },
  ],
});

const headingShoulderStyles = tv({
  base: 'font-bold text-[length:var(--shoulder-size)] leading-[var(--shoulder-line-height)] tracking-[var(--shoulder-letter-spacing)]',
});

const headingTitleStyles = tv({
  base: '',
});

export interface HeadingShoulderProps extends ComponentProps<'p'> {}

export function HeadingShoulder(props: HeadingShoulderProps) {
  const { className, ...rest } = props;

  return <p {...rest} className={headingShoulderStyles({ className })} />;
}

export interface HeadingTitleProps extends Omit<ComponentProps<'h2'>, 'ref'> {
  level: HeadingLevel;
}

export const HeadingTitle = forwardRef<HTMLHeadingElement, HeadingTitleProps>(function HeadingTitle(
  props,
  ref,
) {
  const { children, className, level, ...rest } = props;

  return createElement(
    level,
    {
      ...rest,
      className: headingTitleStyles({ className }),
      ref,
    },
    children,
  );
});

export interface HeadingProps
  extends ComponentProps<'div'>,
    Omit<VariantProps<typeof headingStyles>, 'hasShoulder'> {
  size: HeadingSize;
}

export const Heading = forwardRef<HTMLElement, HeadingProps>(function Heading(props, ref) {
  const { children, className, hasChip, rule, size, ...rest } = props;
  const hasShoulder = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === HeadingShoulder,
  );
  const component = hasShoulder ? 'hgroup' : 'div';

  return createElement(
    component,
    {
      ...rest,
      className: twMerge(
        headingStyles({
          className,
          hasChip,
          hasShoulder,
          rule,
          size,
        }),
      ),
      ref,
    },
    children,
  );
});

export { headingShoulderStyles, headingStyles, headingTitleStyles };
