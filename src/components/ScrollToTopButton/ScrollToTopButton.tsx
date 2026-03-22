import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv } from '../utils';

const scrollToTopButtonStyles = tv({
  extend: focusVisibleRing,
  base: [
    'flex size-14 cursor-pointer items-center justify-center rounded-full border border-blue-900 bg-white text-blue-900',
    'data-hovered:border-blue-1000 data-hovered:bg-blue-200 data-hovered:text-blue-1000',
    'data-pressed:border-blue-1200 data-pressed:bg-blue-300 data-pressed:text-blue-1200',
    'aria-disabled:border-solid-gray-400 aria-disabled:bg-white aria-disabled:text-solid-gray-400',
    'aria-disabled:pointer-events-none',
    'disabled:border-solid-gray-400 disabled:bg-white disabled:text-solid-gray-400',
  ],
});

export interface ScrollToTopButtonProps
  extends AriaLinkProps,
    VariantProps<typeof scrollToTopButtonStyles> {}

/**
 * @deprecated
 * ※ このコンポーネントはアクセシビリティまたはユーザビリティの観点等から、現在は使用が推奨されません。やむを得ず使用する場合は、不利益があるユーザーの存在を踏まえたうえで注意深く使用してください。
 */
const ScrollToTopButton = (props: ScrollToTopButtonProps) => {
  const { 'aria-label': ariaLabelProp, className, ...rest } = props;
  const ariaLabel = ariaLabelProp ?? 'ページ上部に戻る';

  return (
    <AriaLink
      {...rest}
      aria-label={ariaLabel}
      className={composeRenderProps(className, (className, renderProps) =>
        scrollToTopButtonStyles({ ...renderProps, className }),
      )}
    >
      <svg aria-hidden={true} fill='none' height='16' viewBox='0 0 15 16' width='15'>
        <path
          d='M6.75 15.5L6.75 3.37303L1.05383 9.06918L0 7.99998L7.49997 0.5L15 7.99998L13.9461 9.06918L8.24995 3.37303L8.24995 15.5H6.75Z'
          fill='currentColor'
        />
      </svg>
    </AriaLink>
  );
};

export { ScrollToTopButton, scrollToTopButtonStyles };
