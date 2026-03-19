import type { VariantProps } from 'cva';
import type { ComponentProps } from 'react';
import { compose, cva, cx } from '@/lib/cva';

// import { Cell as _Cell, Column as _Column, Row as _Row, Table as _Table, TableBody as _TableBody, TableHeader as _TableHeader } from 'react-aria-components';

const tableStyles = cva({});

type TableProps = ComponentProps<'table'> &
  VariantProps<typeof tableStyles> & {
    outerClassName?: string;
  };

const Table = (props: TableProps) => {
  const { children, className, outerClassName, ...rest } = props;

  return (
    <div className={cx('w-full overflow-x-auto', outerClassName)}>
      <table className={cx(tableStyles({ className }))} {...rest}>
        {children}
      </table>
    </div>
  );
};

const theadStyles = cva({});

type TheadProps = ComponentProps<'thead'> & VariantProps<typeof theadStyles>;

const Thead = (props: TheadProps) => {
  const { children, className, ...rest } = props;

  return (
    <thead {...rest} className={cx(theadStyles({ className }))}>
      {children}
    </thead>
  );
};

const tbodyStyles = cva({});

type TbodyProps = ComponentProps<'tbody'> & VariantProps<typeof tbodyStyles>;

const Tbody = (props: TbodyProps) => {
  const { children, className, ...rest } = props;

  return (
    <tbody {...rest} className={cx(tbodyStyles({ className }))}>
      {children}
    </tbody>
  );
};

const trStyles = cva({});

type TrProps = ComponentProps<'tr'> & VariantProps<typeof trStyles>;

const Tr = (props: TrProps) => {
  const { children, className, ...rest } = props;

  return (
    <tr {...rest} className={cx(trStyles({ className }))}>
      {children}
    </tr>
  );
};

const cellStyles = cva({
  base: 'border-b border-solid-gray-400 px-4 py-6 text-left text-solid-gray-900',
});
const thStyles = compose(cellStyles, cva({}));

type ThProps = ComponentProps<'th'> & VariantProps<typeof thStyles>;

const Th = (props: ThProps) => {
  const { children, className, ...rest } = props;

  return (
    <th {...rest} className={cx(thStyles({ className }))}>
      {children}
    </th>
  );
};

const tdStyles = compose(cellStyles, cva({}));

type TdProps = ComponentProps<'td'> & VariantProps<typeof tdStyles>;

const Td = (props: TdProps) => {
  const { children, className, ...rest } = props;

  return (
    <td {...rest} className={cx(tdStyles({ className }))}>
      {children}
    </td>
  );
};

export type { TableProps, TbodyProps, TdProps, TheadProps, ThProps, TrProps };
export {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  tableStyles,
  tbodyStyles,
  tdStyles,
  theadStyles,
  thStyles,
  trStyles,
};
