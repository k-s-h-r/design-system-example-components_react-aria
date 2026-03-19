import type { VariantProps } from 'cva';
import type * as React from 'react';
import {
  Dialog as _Dialog,
  DialogTrigger as _DialogTrigger,
  Button,
  composeRenderProps,
  type DialogProps,
  type DialogTriggerProps,
  Heading,
  type HeadingProps,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components';
import { compose, cva, cx, focusRing } from '@/lib/cva';

const sheetStyles = cva({
  base: 'fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-[entering]:duration-500 data-[exiting]:duration-300 data-[entering]:animate-in data-[exiting]:animate-out',
  variants: {
    side: {
      top: 'inset-x-0 top-0 border-b data-[entering]:slide-in-from-top data-[exiting]:slide-out-to-top',
      bottom:
        'inset-x-0 bottom-0 border-t data-[entering]:slide-in-from-bottom data-[exiting]:slide-out-to-bottom',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[entering]:slide-in-from-left data-[exiting]:slide-out-to-left sm:max-w-sm',
      right:
        'inset-y-0 right-0 h-full w-3/4  border-l data-[entering]:slide-in-from-right data-[exiting]:slide-out-to-right sm:max-w-sm',
    },
  },
});

const DialogTrigger = (props: DialogTriggerProps) => <_DialogTrigger {...props} />;
const Dialog = (props: DialogProps) => <_Dialog {...props} />;

const DialogOverlay = ({ className, isDismissable = true, ...props }: ModalOverlayProps) => (
  <ModalOverlay
    isDismissable={isDismissable}
    className={composeRenderProps(className, (className, _renderProps) =>
      cx(
        [
          'fixed inset-0 z-50 bg-black/45',
          'data-[exiting]:duration-300 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0',
        ],
        className,
      ),
    )}
    {...props}
  />
);

export interface DialogContentProps
  extends Omit<React.ComponentProps<typeof Modal>, 'children'>,
    VariantProps<typeof sheetStyles> {
  children?: DialogProps['children'];
  role?: DialogProps['role'];
  closeButton?: boolean;
}

const _closeButtonStyles = cva({
  base: [
    'absolute right-4 top-4 rounded-sm',
    'disabled:pointer-events-none',
    'data-[entering]:bg-accent data-[entering]:text-muted-foreground',
  ],
  variants: {},
  defaultVariants: {},
});

const closeButtonStyles = compose(focusRing, _closeButtonStyles);

// flex flex-col items-center gap-4
const DialogContent = ({
  className,
  children,
  side,
  role,
  closeButton = true,
  ...props
}: DialogContentProps) => (
  <Modal
    className={cx(
      [
        !side && [
          'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
          'md:w-full',
          'border border-solid-gray-200 bg-white rounded-xl p-6 desktop:p-10 duration-200',
          'data-[exiting]:duration-300 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[entering]:slide-in-from-left-1/2 data-[entering]:slide-in-from-top-[48%] data-[exiting]:slide-out-to-left-1/2 data-[exiting]:slide-out-to-top-[48%]',
        ],
        side && sheetStyles({ side }),
        side && 'h-full p-6',
      ],
      className,
    )}
    {...props}
  >
    <Dialog role={role} className={cx(!side && 'grid h-full gap-4', 'h-full outline-none')}>
      {composeRenderProps(children, (children, values) => (
        <>
          {children}
          {closeButton && (
            <Button
              onPress={values.close}
              className={composeRenderProps('', (className, renderProps) =>
                cx(closeButtonStyles({ ...renderProps, className })),
              )}
            >
              <svg aria-hidden={true} width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M6.39961 18.6496L5.34961 17.5996L10.9496 11.9996L5.34961 6.39961L6.39961 5.34961L11.9996 10.9496L17.5996 5.34961L18.6496 6.39961L13.0496 11.9996L18.6496 17.5996L17.5996 18.6496L11.9996 13.0496L6.39961 18.6496Z'
                  fill='#1A1A1A'
                />
              </svg>
              <span className='sr-only'>Close</span>
            </Button>
          )}
        </>
      ))}
    </Dialog>
  </Modal>
);

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cx('flex flex-col gap-4 sm:flex-row-reverse desktop:mt-6', className)}
    {...props}
  />
);

const DialogTitle = ({ className, ...props }: HeadingProps) => (
  <Heading
    slot='title'
    className={cx('text-std-24B-5 desktop:text-std-28B-5', className)}
    {...props}
  />
);

export {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
};
