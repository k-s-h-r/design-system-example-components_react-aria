import type { Meta, StoryObj } from '@storybook/react';
import { UtilityLink } from './';

const meta = {
  title: 'Component/UtilityLink',
  component: UtilityLink,
  tags: ['autodocs'],
} satisfies Meta<typeof UtilityLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    return (
      <div className='flex flex-col items-start gap-8'>
        <p className='text-std-16N-7'>
          <UtilityLink href='#'>リンク</UtilityLink>
        </p>

        <p className='text-std-16N-7'>
          <UtilityLink href='https://www.digital.go.jp' target='_blank'>
            外部リンク
          </UtilityLink>
        </p>
        <p className='text-std-16N-7'>
          <UtilityLink href='#' isDisabled>
            isDisabledのリンク
          </UtilityLink>
        </p>
        <p className='text-std-16N-7'>
          <UtilityLink>hrefなしのリンク</UtilityLink>
        </p>
      </div>
    );
  },
};
