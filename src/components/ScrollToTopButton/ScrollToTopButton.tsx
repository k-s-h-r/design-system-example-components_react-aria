import type { VariantProps } from 'cva';
import {
  Link as _Link,
  type LinkProps as _LinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

const _scrollToTopButtonStyles = cva({
  base: [
    'flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-blue-900 text-blue-900 bg-white',
    'hover:border-blue-1000 hover:bg-blue-200 hover:text-blue-1000',
    'active:border-blue-1200 active:bg-blue-300 active:text-blue-1200',
  ],
  variants: {},
  defaultVariants: {},
});

const scrollToTopButtonStyles = compose(focusRing, _scrollToTopButtonStyles);

interface ScrollToTopButtonProps extends _LinkProps, VariantProps<typeof scrollToTopButtonStyles> {}

const ScrollToTopButton = (props: ScrollToTopButtonProps) => {
  const { className, ...rest } = props;

  return (
    <_Link
      className={composeRenderProps(className, (className, renderProps) =>
        cx(scrollToTopButtonStyles({ ...renderProps, className })),
      )}
      {...rest}
    >
      <svg
        aria-label={rest['aria-label'] ?? 'ページ上部に戻る'}
        fill='none'
        height='16'
        role='img'
        viewBox='0 0 15 16'
        width='15'
      >
        <path
          d='M6.75 15.5L6.75 3.37303L1.05383 9.06918L0 7.99998L7.49997 0.5L15 7.99998L13.9461 9.06918L8.24995 3.37303L8.24995 15.5H6.75Z'
          fill='currentColor'
        />
      </svg>
    </_Link>
  );
};

export { ScrollToTopButton, scrollToTopButtonStyles };
