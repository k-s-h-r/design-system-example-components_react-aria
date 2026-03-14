import { Text, type TextProps } from 'react-aria-components';
import { cx } from '@/lib/cva';

const Description = (props: TextProps) => {
  return (
    <Text
      {...props}
      slot='description'
      className={cx('text-std-16N-7 text-solid-grey-700', props.className)}
    />
  );
};

export { Description };
