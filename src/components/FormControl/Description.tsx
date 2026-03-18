import { Text, type TextProps } from 'react-aria-components';
import { twMerge } from '../utils';

const Description = (props: TextProps) => {
  return (
    <Text
      {...props}
      slot='description'
      className={twMerge('text-std-16N-170 text-solid-gray-600', props.className)}
    />
  );
};

export { Description };
