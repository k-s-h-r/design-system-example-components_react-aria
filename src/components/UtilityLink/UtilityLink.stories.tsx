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
        <p>
          <UtilityLink href='#'>リンク</UtilityLink>
        </p>

        <p>
          <UtilityLink
            href='#'
            leadingIcon={({ className, ...iconProps }) => (
              <svg
                {...iconProps}
                className={className}
                fill='none'
                height='16'
                viewBox='0 0 16 16'
                width='16'
              >
                <path
                  d='M8 1.5L10 5.5L14.5 6L11.25 9L12 13.5L8 11.25L4 13.5L4.75 9L1.5 6L6 5.5L8 1.5Z'
                  fill='currentColor'
                />
              </svg>
            )}
          >
            前置アイコン付きリンク
          </UtilityLink>
        </p>

        <p>
          <UtilityLink href='https://www.digital.go.jp' target='_blank'>
            外部リンク
          </UtilityLink>
        </p>
        <p>
          <UtilityLink
            href='#'
            trailingIcon={({ className, ...iconProps }) => (
              <svg
                {...iconProps}
                className={className}
                fill='none'
                height='16'
                viewBox='0 0 16 16'
                width='16'
              >
                <circle cx='8' cy='8' r='6' stroke='currentColor' strokeWidth='2' />
                <path d='M8 5V8L10 10' stroke='currentColor' strokeWidth='2' />
              </svg>
            )}
          >
            後置アイコン付きリンク
          </UtilityLink>
        </p>
        <p>
          <UtilityLink
            href='https://www.digital.go.jp'
            target='_blank'
            aria-label='前後に補助アイコンが付いた外部リンクを新規タブで開きます'
            leadingIcon={({ className, ...iconProps }) => (
              <svg
                {...iconProps}
                className={className}
                fill='none'
                height='16'
                viewBox='0 0 16 16'
                width='16'
              >
                <path
                  d='M8 1.5L10 5.5L14.5 6L11.25 9L12 13.5L8 11.25L4 13.5L4.75 9L1.5 6L6 5.5L8 1.5Z'
                  fill='currentColor'
                />
              </svg>
            )}
            trailingIcon={({ className, ...iconProps }) => (
              <svg
                {...iconProps}
                className={className}
                fill='none'
                height='16'
                viewBox='0 0 16 16'
                width='16'
              >
                <path d='M3 13H13V8.66667H14V14H2V2H7.33333V3H3V13Z' fill='currentColor' />
                <path
                  d='M9.33333 3V2H14V6.66667H13V3.73333L7 9.66667L6.33333 9L12.2667 3H9.33333Z'
                  fill='currentColor'
                />
              </svg>
            )}
          >
            前後どちらにもアイコンが付いた外部リンク
          </UtilityLink>
        </p>
        <p>
          <UtilityLink
            href='https://www.digital.go.jp'
            target='_blank'
            aria-label='注記付きの外部リンクを新規タブで開きます'
            leadingIcon={() => '※'}
            trailingIcon={false}
          >
            前置だけにした外部リンク
          </UtilityLink>
        </p>
        <p>
          <UtilityLink href='#' isDisabled>
            isDisabledのリンク
          </UtilityLink>
        </p>
        <p>
          <UtilityLink>hrefなしのリンク</UtilityLink>
        </p>
      </div>
    );
  },
};
