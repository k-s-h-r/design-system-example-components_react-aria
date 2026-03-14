import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './';

const meta = {
  title: 'Component/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    return (
      <div className='flex flex-col items-start gap-8'>
        <Link href='#'>リンク</Link>

        <Link href='https://www.digital.go.jp' target='_blank'>
          外部リンク
        </Link>

        <Link href='https://www.digital.go.jp' target='_blank' icon={false}>
          アイコンを表示しない外部リンク
        </Link>

        <Link
          href='https://www.digital.go.jp'
          target='_blank'
          icon={(isDisabled) => (
            <svg
              className={isDisabled ? 'text-solid-gray-400' : 'text-blue-1000'}
              fill='none'
              height='20'
              viewBox='0 0 20 20'
              width='20'
            >
              <circle cx='10' cy='10' r='8' stroke='currentColor' strokeWidth='2' />
              <path d='M10 6V10L12.5 12.5' stroke='currentColor' strokeWidth='2' />
            </svg>
          )}
        >
          アイコンを差し替えた外部リンク
        </Link>

        <p>
          これは<Link href='#'>文中のリンク</Link>です。
        </p>
        <p>
          これは
          <Link href='#' aria-disabled>
            aria-disabledのリンク
          </Link>
          です。
        </p>

        <p className='w-[calc(160/16*1rem)]'>
          これは
          <Link href='https://www.digital.go.jp' target='_blank'>
            複数行にまたがる文中のインラインリンク
          </Link>
          です。
        </p>

        <p>
          これは
          <Link>hrefなしのリンク</Link>
          です。
        </p>
      </div>
    );
  },
};
