import type { ComponentProps, HTMLAttributes } from 'react';
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  composeRenderProps,
  type DialogProps,
  type DialogTriggerProps,
  Heading,
  type HeadingProps,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv, twMerge } from '../utils';

const dialogOverlayStyles = tv({
  base: [
    'fixed inset-0 z-50 bg-black/45',
    'data-[entering]:animate-in data-[exiting]:animate-out',
    'data-[entering]:fade-in-0 data-[exiting]:fade-out-0',
    'data-[exiting]:duration-300',
  ],
});

const dialogContentStyles = tv({
  base: [
    'fixed z-50 bg-white shadow-lg',
    'data-[entering]:animate-in data-[exiting]:animate-out',
    'data-[entering]:duration-500 data-[exiting]:duration-300',
    'ease-in-out',
  ],
  variants: {
    placement: {
      center: [
        'left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-solid-gray-200 p-6 desktop:p-10',
        'md:w-full',
        // Centered dialogs should only fade/zoom. Slide utilities here cause the current
        // diagonal movement from the top-left because they stack with the fixed centering transform.
        'data-[entering]:fade-in-0 data-[exiting]:fade-out-0',
        'data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95',
      ],
      top: 'inset-x-0 top-0 border-b data-[entering]:slide-in-from-top data-[exiting]:slide-out-to-top',
      bottom:
        'inset-x-0 bottom-0 border-t data-[entering]:slide-in-from-bottom data-[exiting]:slide-out-to-bottom',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[entering]:slide-in-from-left data-[exiting]:slide-out-to-left sm:max-w-sm',
      right:
        'inset-y-0 right-0 h-full w-3/4 border-l data-[entering]:slide-in-from-right data-[exiting]:slide-out-to-right sm:max-w-sm',
    },
  },
  defaultVariants: {
    placement: 'center',
  },
});

const dialogInnerStyles = tv({
  base: 'h-full outline-none',
  variants: {
    placement: {
      center: 'grid gap-4',
      top: 'h-full',
      bottom: 'h-full',
      left: 'h-full',
      right: 'h-full',
    },
  },
  defaultVariants: {
    placement: 'center',
  },
});

const closeButtonStyles = tv({
  extend: focusVisibleRing,
  base: ['absolute right-4 top-4 rounded-sm', 'disabled:pointer-events-none'],
});

const dialogHeaderStyles = tv({
  base: 'flex flex-col space-y-1.5 text-center sm:text-left',
});

const dialogFooterStyles = tv({
  base: 'flex flex-col gap-4 sm:flex-row-reverse desktop:mt-6',
});

const dialogTitleStyles = tv({
  base: 'text-std-24B-150 desktop:text-std-28B-150',
});

const DialogTrigger = (props: DialogTriggerProps) => <AriaDialogTrigger {...props} />;
const Dialog = (props: DialogProps) => <AriaDialog {...props} />;

const DialogOverlay = ({ className, isDismissable = true, ...props }: ModalOverlayProps) => (
  <ModalOverlay
    {...props}
    isDismissable={isDismissable}
    className={composeRenderProps(className, (className) => dialogOverlayStyles({ className }))}
  />
);

export interface DialogContentProps
  extends Omit<ComponentProps<typeof Modal>, 'children'>,
    Omit<VariantProps<typeof dialogContentStyles>, 'placement'> {
  children?: DialogProps['children'];
  closeButton?: boolean;
  role?: DialogProps['role'];
  side?: Exclude<VariantProps<typeof dialogContentStyles>['placement'], 'center'>;
}

const DialogContent = ({
  children,
  className,
  closeButton = true,
  role,
  side,
  ...props
}: DialogContentProps) => {
  const placement = side ?? 'center';

  return (
    <Modal
      {...props}
      className={composeRenderProps(className, (className) =>
        dialogContentStyles({
          placement,
          className: twMerge(side ? 'h-full p-6' : undefined, className),
        }),
      )}
    >
      <Dialog className={dialogInnerStyles({ placement })} role={role}>
        {composeRenderProps(children, (children, values) => (
          <>
            {children}
            {closeButton && (
              <AriaButton
                className={composeRenderProps('', (className, renderProps) =>
                  closeButtonStyles({ ...renderProps, className }),
                )}
                onPress={values.close}
              >
                <svg aria-hidden={true} width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M6.39961 18.6496L5.34961 17.5996L10.9496 11.9996L5.34961 6.39961L6.39961 5.34961L11.9996 10.9496L17.5996 5.34961L18.6496 6.39961L13.0496 11.9996L18.6496 17.5996L17.5996 18.6496L11.9996 13.0496L6.39961 18.6496Z'
                    fill='currentColor'
                  />
                </svg>
                <span className='sr-only'>Close</span>
              </AriaButton>
            )}
          </>
        ))}
      </Dialog>
    </Modal>
  );
};

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={dialogHeaderStyles({ className })} />
);

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={dialogFooterStyles({ className })} />
);

const DialogTitle = ({ className, ...props }: HeadingProps) => (
  <Heading {...props} slot='title' className={dialogTitleStyles({ className })} />
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
