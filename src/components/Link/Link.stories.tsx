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
          icon={({ className, ...iconProps }) => (
            <svg
              {...iconProps}
              aria-hidden={true}
              className={className}
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
          デフォルトの iconProps を使った外部リンク
        </Link>

        <Link
          href='https://www.digital.go.jp'
          target='_blank'
          aria-label='外部サイトを新規タブで開きます'
          icon={({ className, isDisabled, ...iconProps }) => (
            <svg
              {...iconProps}
              aria-hidden={true}
              className={`${className} ${isDisabled ? 'text-solid-gray-400' : 'text-blue-1000'}`}
              fill='none'
              height='20'
              viewBox='0 0 20 20'
              width='20'
            >
              <rect
                x='3'
                y='3'
                width='14'
                height='14'
                rx='2'
                stroke='currentColor'
                strokeWidth='2'
              />
              <path d='M7 13L13 7' stroke='currentColor' strokeWidth='2' />
              <path d='M9 7H13V11' stroke='currentColor' strokeWidth='2' />
            </svg>
          )}
        >
          iconProps を上書きした外部リンク
        </Link>

        <Link
          href='https://www.digital.go.jp'
          target='_blank'
          aria-label='テキスト記号で外部サイトを新規タブで開きます'
          icon={() => '↗'}
        >
          要素ではない icon を返す外部リンク
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

        <p className='w-[calc(160*var(--px-to-rem))]'>
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
