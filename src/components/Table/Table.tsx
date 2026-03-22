import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils';

const tableOuterStyles = tv({
  base: 'w-full overflow-x-auto',
});

const tableStyles = tv({
  base: 'w-full border-collapse text-std-16N-170 text-solid-gray-900',
});

const theadStyles = tv({
  base: '',
});

const tbodyStyles = tv({
  base: '',
});

const trStyles = tv({
  base: '',
});

const cellStyles = tv({
  base: 'border-b border-solid-gray-400 px-4 py-6 align-top text-left',
});

const thStyles = tv({
  extend: cellStyles,
  base: 'font-bold',
});

const tdStyles = tv({
  extend: cellStyles,
  base: 'font-normal',
});

export interface TableProps
  extends ComponentProps<'table'>,
    VariantProps<typeof tableStyles> {
  outerClassName?: string;
}

export function Table(props: TableProps) {
  const { children, className, outerClassName, ...rest } = props;

  return (
    <div className={tableOuterStyles({ className: outerClassName })}>
      <table {...rest} className={tableStyles({ className })}>
        {children}
      </table>
    </div>
  );
}

export interface TheadProps extends ComponentProps<'thead'>, VariantProps<typeof theadStyles> {}

export function Thead(props: TheadProps) {
  const { children, className, ...rest } = props;

  return (
    <thead {...rest} className={theadStyles({ className })}>
      {children}
    </thead>
  );
}

export interface TbodyProps extends ComponentProps<'tbody'>, VariantProps<typeof tbodyStyles> {}

export function Tbody(props: TbodyProps) {
  const { children, className, ...rest } = props;

  return (
    <tbody {...rest} className={tbodyStyles({ className })}>
      {children}
    </tbody>
  );
}

export interface TrProps extends ComponentProps<'tr'>, VariantProps<typeof trStyles> {}

export function Tr(props: TrProps) {
  const { children, className, ...rest } = props;

  return (
    <tr {...rest} className={trStyles({ className })}>
      {children}
    </tr>
  );
}

export interface ThProps extends ComponentProps<'th'>, VariantProps<typeof thStyles> {}

export function Th(props: ThProps) {
  const { children, className, ...rest } = props;

  return (
    <th {...rest} className={thStyles({ className })}>
      {children}
    </th>
  );
}

export interface TdProps extends ComponentProps<'td'>, VariantProps<typeof tdStyles> {}

export function Td(props: TdProps) {
  const { children, className, ...rest } = props;

  return (
    <td {...rest} className={tdStyles({ className })}>
      {children}
    </td>
  );
}

export { tableOuterStyles, tableStyles, tbodyStyles, tdStyles, theadStyles, thStyles, trStyles };
