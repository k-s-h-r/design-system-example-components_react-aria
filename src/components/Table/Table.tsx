import type { VariantProps } from 'cva';
import type { ComponentProps } from 'react';
import { compose, cva, cx } from '@/lib/cva';

// import { Cell as _Cell, Column as _Column, Row as _Row, Table as _Table, TableBody as _TableBody, TableHeader as _TableHeader } from 'react-aria-components';

const tableVariants = cva({});

type TableProps = ComponentProps<'table'> &
  VariantProps<typeof tableVariants> & {
    outerClassName?: string;
  };

const Table = (props: TableProps) => {
  const { children, className, outerClassName, ...rest } = props;

  return (
    <div className={cx('w-full overflow-x-auto', outerClassName)}>
      <table className={cx(tableVariants({ className }))} {...rest}>
        {children}
      </table>
    </div>
  );
};

const theadVariants = cva({});

type TheadProps = ComponentProps<'thead'> & VariantProps<typeof theadVariants>;

const Thead = (props: TheadProps) => {
  const { children, className, ...rest } = props;

  return (
    <thead {...rest} className={cx(theadVariants({ className }))}>
      {children}
    </thead>
  );
};

const tbodyVariants = cva({});

type TbodyProps = ComponentProps<'tbody'> & VariantProps<typeof tbodyVariants>;

const Tbody = (props: TbodyProps) => {
  const { children, className, ...rest } = props;

  return (
    <tbody {...rest} className={cx(tbodyVariants({ className }))}>
      {children}
    </tbody>
  );
};

const trVariants = cva({});

type TrProps = ComponentProps<'tr'> & VariantProps<typeof trVariants>;

const Tr = (props: TrProps) => {
  const { children, className, ...rest } = props;

  return (
    <tr {...rest} className={cx(trVariants({ className }))}>
      {children}
    </tr>
  );
};

const cellVariants = cva({
  base: 'border-b border-solid-grey-400 px-4 py-6 text-left text-solid-grey-900',
});
const thVariants = compose(cellVariants, cva({}));

type ThProps = ComponentProps<'th'> & VariantProps<typeof thVariants>;

const Th = (props: ThProps) => {
  const { children, className, ...rest } = props;

  return (
    <th {...rest} className={cx(thVariants({ className }))}>
      {children}
    </th>
  );
};

const tdVariants = compose(cellVariants, cva({}));

type TdProps = ComponentProps<'td'> & VariantProps<typeof tdVariants>;

const Td = (props: TdProps) => {
  const { children, className, ...rest } = props;

  return (
    <td {...rest} className={cx(tdVariants({ className }))}>
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
  tableVariants,
  tbodyVariants,
  tdVariants,
  theadVariants,
  thVariants,
  trVariants,
};
