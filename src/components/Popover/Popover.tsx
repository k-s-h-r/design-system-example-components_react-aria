import {
  Popover as _Popover,
  type PopoverProps as _PopoverProps,
  composeRenderProps,
  OverlayArrow,
  PopoverContext,
  useSlottedContext,
} from 'react-aria-components';
import { cva } from '@/lib/cva';

export interface PopoverProps extends _PopoverProps {
  showArrow?: boolean;
}

const variants = cva({
  base: 'bg-white',
  variants: {
    isEntering: {
      true: 'animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 ease-out duration-200',
    },
    isExiting: {
      true: 'animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 ease-in duration-150',
    },
  },
});

export function Popover({ children, showArrow, className, ...props }: PopoverProps) {
  // biome-ignore lint/style/noNonNullAssertion: The context is guaranteed to be available when the Popover is rendered.
  const popoverContext = useSlottedContext(PopoverContext)!;
  const isSubmenu = popoverContext?.trigger === 'SubmenuTrigger';
  let offset = showArrow ? 12 : 8;
  offset = isSubmenu ? offset - 6 : offset;
  return (
    <_Popover
      offset={offset}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        variants({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          {showArrow && (
            <OverlayArrow className='group'>
              <svg
                aria-hidden={true}
                width={12}
                height={12}
                viewBox='0 0 12 12'
                className='block fill-white '
              >
                <path d='M0 0 L6 6 L12 0' />
              </svg>
            </OverlayArrow>
          )}
        </>
      ))}
    </_Popover>
  );
}
