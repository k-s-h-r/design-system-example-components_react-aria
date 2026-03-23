import { useContext } from 'react';
import { composeRenderProps, OverlayTriggerStateContext } from 'react-aria-components';
import { TriggerButton, type TriggerButtonProps } from '../Button';
import { tv } from '../utils';

const hamburgerMenuButtonStyles = tv({
  base: [''],
  variants: {
    orientation: {
      horizontal: '',
      vertical: '',
    },
  },
});

const hamburgerMenuButtonLabelStyles = tv({
  variants: {
    orientation: {
      horizontal: '',
      vertical: '',
    },
  },
});

const iconHorizontalOpend = (
  <svg aria-hidden={true} height='24' role='img' viewBox='0 0 24 24' width='24'>
    <path
      d='M6.39961 18.6496L5.34961 17.5996L10.9496 11.9996L5.34961 6.39961L6.39961 5.34961L11.9996 10.9496L17.5996 5.34961L18.6496 6.39961L13.0496 11.9996L18.6496 17.5996L17.5996 18.6496L11.9996 13.0496L6.39961 18.6496Z'
      fill='currentColor'
    />
  </svg>
);
const iconHorizontalClosed = (
  <svg aria-hidden={true} width='24' role='img' height='24' viewBox='0 0 24 24' fill='none'>
    <path d='M21 5.5H3V7H21V5.5Z' fill='currentColor' />
    <path d='M21 11.2998H3V12.7998H21V11.2998Z' fill='currentColor' />
    <path d='M3 17H21V18.5H3V17Z' fill='currentColor' />
  </svg>
);
const iconVerticalOpend = (
  <svg aria-hidden={true} role='img' width='34' height='22' viewBox='0 0 34 22' fill='none'>
    <path
      d='M7.89474 22L6 20.1053L15.1053 11L6 1.89474L7.89474 0L17 9.10526L26.1053 0L28 1.89474L18.8947 11L28 20.1053L26.1053 22L17 12.8947L7.89474 22Z'
      fill='currentColor'
    />
  </svg>
);
const iconVerticalClosed = (
  <svg aria-hidden={true} width='34' height='22' viewBox='0 0 34 22' fill='none' role='img'>
    <path d='M34 18V20H0V18H34ZM34 12H0V10H34V12ZM34 4H0V2H34V4Z' fill='currentColor' />
  </svg>
);

type HamburgerMenuButtonProps = TriggerButtonProps & {
  labelClassName?: string;
  label: {
    open: string;
    close?: string;
  };
  orientation: 'horizontal' | 'vertical';
};

export const HamburgerMenuButton = (props: HamburgerMenuButtonProps) => {
  const { label, labelClassName, orientation, className, ...rest } = props;
  const state = useContext(OverlayTriggerStateContext);
  const isOpen = state?.isOpen ?? false;
  const dispLabel = isOpen ? (label.close ?? label.open) : label.open;

  return (
    <TriggerButton
      className={composeRenderProps(props.className, (className, renderProps) =>
        hamburgerMenuButtonStyles({ ...renderProps, orientation, className }),
      )}
      orientation={orientation}
      {...rest}
    >
      {orientation === 'horizontal' && (isOpen ? iconHorizontalOpend : iconHorizontalClosed)}
      {orientation === 'vertical' && (isOpen ? iconVerticalOpend : iconVerticalClosed)}
      <span className={hamburgerMenuButtonLabelStyles({ orientation, className: labelClassName })}>
        {dispLabel}
      </span>
    </TriggerButton>
  );
};
