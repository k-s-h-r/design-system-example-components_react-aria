import { useControlledState } from '@react-stately/utils';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef } from 'react';
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  type RadioProps as AriaRadioProps,
  composeRenderProps,
  type ValidationResult,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { Description } from '../FormControl';
import {
  type RequirementOption,
  renderFieldErrorMessage,
  renderFieldLabel,
  splitFieldChildren,
} from '../FormControl/fieldHelpers';
import { composeTailwindRenderProps, focusRing, tv } from '../utils';

const radioStyles = tv({
  base: [
    'group relative flex w-fit items-center py-2 text-solid-gray-800 transition',
    'touch-manipulation [-webkit-tap-highlight-color:transparent]',
  ],
  variants: {
    size: {
      sm: 'gap-1 text-dns-16N-130',
      md: 'gap-2 text-dns-16N-130',
      lg: 'gap-3 text-dns-17N-130',
    },
    isDisabled: {
      true: 'text-solid-gray-600 forced-colors:text-[GrayText]',
    },
    isInvalid: {
      true: '',
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      isInvalid: true,
      className: 'text-solid-gray-600',
    },
  ],
  defaultVariants: {
    size: 'sm',
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: [
    'box-content shrink-0 rounded-full border-solid',
    'flex items-center justify-center transition',
    'group-data-hovered:ring-solid-gray-420 group-data-hovered:ring-3',
  ],
  variants: {
    size: {
      sm: 'border-2 size-3.5',
      md: 'border-2 size-4.5',
      lg: 'border-3 size-6',
    },
    isSelected: {
      false: ['[--color:theme(colors.solid-gray.600)]', 'bg-white border-(--color)'],
      true: [
        '[--color:theme(colors.blue.900)]',
        'bg-white border-(--color)',
        'group-data-hovered:[--color:theme(colors.blue.1100)]',
      ],
    },
    isInvalid: {
      true: [
        '[--color:theme(colors.error-1)]',
        'group-data-hovered:[--color:theme(colors.red.1000)]',
      ],
    },
    isDisabled: {
      true: [
        '[--color:theme(colors.solid-gray.300)]',
        'group-data-hovered:[--color:theme(colors.solid-gray.300)]',
        'group-data-hovered:ring-0',
      ],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const indicatorStyles = tv({
  base: 'rounded-full bg-(--color) transition',
  variants: {
    size: {
      sm: 'size-2',
      md: 'size-2',
      lg: 'size-3',
    },
    isDisabled: {
      true: 'bg-solid-gray-300',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const radioGroupItemsStyles = tv({
  base: 'flex gap-3',
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row flex-wrap gap-x-6 gap-y-3',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

interface RadioAriaDisabledContextValue {
  isValueAriaDisabled: (value: string | null) => boolean;
  register: (value: string, isAriaDisabled: boolean) => () => void;
}

const RadioAriaDisabledContext = createContext<RadioAriaDisabledContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<AriaRadioGroupProps, 'children'>,
    VariantProps<typeof radioGroupItemsStyles> {
  label?: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  requirement?: RequirementOption;
}

export interface RadioProps extends AriaRadioProps, VariantProps<typeof radioStyles> {
  'aria-disabled'?: boolean | 'true' | 'false';
}

export function RadioGroup(props: RadioGroupProps) {
  const {
    label,
    children,
    description,
    errorMessage,
    orientation,
    requirement,
    value: controlledValue,
    defaultValue,
    onChange,
    ...rest
  } = props;
  const ariaDisabledValuesRef = useRef(new Set<string>());
  const [selectedValue, setSelectedValue] = useControlledState<string | null>(
    controlledValue,
    defaultValue ?? null,
    onChange,
  );
  const { contentChildren, descriptionChild, errorMessageChild, labelChild } = splitFieldChildren(
    children,
    {
      label: label == null,
      description: description == null,
      errorMessage: errorMessage == null,
    },
  );
  const ariaDisabledContextValue: RadioAriaDisabledContextValue = {
    isValueAriaDisabled: (value) => value !== null && ariaDisabledValuesRef.current.has(value),
    register: (value, isAriaDisabled) => {
      if (isAriaDisabled) {
        ariaDisabledValuesRef.current.add(value);
      } else {
        ariaDisabledValuesRef.current.delete(value);
      }

      return () => {
        ariaDisabledValuesRef.current.delete(value);
      };
    },
  };

  const handleChange = (nextValue: string) => {
    if (ariaDisabledContextValue.isValueAriaDisabled(nextValue)) {
      return;
    }

    setSelectedValue(nextValue);
  };

  return (
    <RadioAriaDisabledContext.Provider value={ariaDisabledContextValue}>
      <AriaRadioGroup
        {...rest}
        orientation={orientation}
        value={selectedValue}
        onChange={handleChange}
        className={composeTailwindRenderProps(props.className, 'flex flex-col gap-2')}
      >
        {renderFieldLabel(label, requirement, rest.isRequired) ?? labelChild}
        {description != null ? <Description>{description}</Description> : descriptionChild}
        <div className={radioGroupItemsStyles({ orientation })}>{contentChildren}</div>
        {renderFieldErrorMessage(errorMessage) ?? errorMessageChild}
      </AriaRadioGroup>
    </RadioAriaDisabledContext.Provider>
  );
}

export function Radio(props: RadioProps) {
  const { size, 'aria-disabled': ariaDisabledProp, ...rest } = props;
  const isAriaDisabled = ariaDisabledProp === true || ariaDisabledProp === 'true';
  const radioAriaDisabledContext = useContext(RadioAriaDisabledContext);

  useEffect(() => {
    if (!radioAriaDisabledContext) {
      return;
    }

    return radioAriaDisabledContext.register(props.value, isAriaDisabled);
  }, [isAriaDisabled, props.value, radioAriaDisabledContext]);

  return (
    <AriaRadio
      {...rest}
      aria-disabled={ariaDisabledProp}
      className={composeRenderProps(props.className, (className, renderProps) =>
        radioStyles({
          ...renderProps,
          size,
          isDisabled: renderProps.isDisabled || isAriaDisabled,
          className,
        }),
      )}
    >
      {composeRenderProps(props.children, (children, renderProps) => (
        <>
          <span
            className={boxStyles({
              ...renderProps,
              size,
              isDisabled: renderProps.isDisabled || isAriaDisabled,
            })}
          >
            {renderProps.isSelected ? (
              <span
                aria-hidden={true}
                className={indicatorStyles({
                  size,
                  isDisabled: renderProps.isDisabled || isAriaDisabled,
                })}
              />
            ) : null}
          </span>
          {children}
        </>
      ))}
    </AriaRadio>
  );
}
