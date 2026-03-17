import type { Meta, StoryObj } from '@storybook/react';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Breadcrumb, Breadcrumbs, BreadcrumbsLabel } from './';
import type { BreadcrumbItemData } from './Breadcrumb';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Component/Breadcrumb',
  component: Breadcrumbs,
  args: {},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: (args) => {
    const breadcrumbsId = useId();

    return (
      <Breadcrumbs {...args} aria-labelledby={`${breadcrumbsId}-label`}>
        <BreadcrumbsLabel className='sr-only' id={`${breadcrumbsId}-label`}>
          現在位置
        </BreadcrumbsLabel>
        <Breadcrumb href='/'>ホーム</Breadcrumb>
        <Breadcrumb href='/2'>組織情報</Breadcrumb>
        <Breadcrumb href='/3'>長いページタイトルが入ります長いページタイトルが入ります</Breadcrumb>
        <Breadcrumb>長いページタイトルが入ります長いページタイトルが入ります</Breadcrumb>
      </Breadcrumbs>
    );
  },
};

export const LongLabelExample: Story = {
  render: (args) => {
    const breadcrumbsId = useId();

    return (
      <Breadcrumbs {...args} aria-labelledby={`${breadcrumbsId}-label`}>
        <BreadcrumbsLabel className='sr-only' id={`${breadcrumbsId}-label`}>
          現在位置
        </BreadcrumbsLabel>
        <Breadcrumb href='/'>
          ホーム ホーム ホーム ホーム ホーム ホーム ホーム ホーム ホーム ホーム ホーム
        </Breadcrumb>
        <Breadcrumb href='/2'>
          組織情報 組織情報 組織情報 組織情報 組織情報 組織情報 組織情報 組織情報 組織情報 組織情報
        </Breadcrumb>
        <Breadcrumb href='/3'>長いページタイトルが入ります長いページタイトルが入ります</Breadcrumb>
        <Breadcrumb>長いページタイトルが入ります長いページタイトルが入ります</Breadcrumb>
      </Breadcrumbs>
    );
  },
};

export const Separator: Story = {
  render: (args) => {
    const breadcrumbsId = useId();

    return (
      <Breadcrumbs {...args} aria-labelledby={`${breadcrumbsId}-label`}>
        <BreadcrumbsLabel className='sr-only' id={`${breadcrumbsId}-label`}>
          現在位置
        </BreadcrumbsLabel>
        <Breadcrumb href='/' separator='/'>
          ホーム
        </Breadcrumb>
        <Breadcrumb href='/2' separator='/'>
          組織情報
        </Breadcrumb>
        <Breadcrumb href='/3' separator='/'>
          長いページタイトルが入ります長いページタイトルが入ります
        </Breadcrumb>
        <Breadcrumb separator='/'>
          長いページタイトルが入ります長いページタイトルが入ります
        </Breadcrumb>
      </Breadcrumbs>
    );
  },
};

export const PropItems: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'ホーム',
        href: '/',
      },
      {
        id: 'organization',
        label: '組織情報',
        href: '/2',
      },
      {
        id: 'detail',
        label: '長いページタイトルが入ります長いページタイトルが入ります',
        onPress: () => {
          console.log('長いページタイトルが入ります長いページタイトルが入ります');
        },
      },
      {
        id: 'current',
        label: '長いページタイトルが入ります長いページタイトルが入ります',
      },
    ],
    onAction: (key) => {
      console.log(key);
    },
  },
  render: (args) => (
    <Breadcrumbs {...args} aria-label='現在位置'>
      {(item: BreadcrumbItemData) => {
        const { id: _id, label, ...rest } = item;
        return <Breadcrumb {...rest}>{label}</Breadcrumb>;
      }}
    </Breadcrumbs>
  ),
};

export const WithHomeIcon: Story = {
  render: (args) => {
    const breadcrumbsId = useId();

    return (
      <Breadcrumbs {...args} aria-labelledby={`${breadcrumbsId}-label`}>
        <BreadcrumbsLabel className='sr-only' id={`${breadcrumbsId}-label`}>
          現在位置
        </BreadcrumbsLabel>
        <Breadcrumb href='/' linkClassName='inline-flex items-center gap-1'>
          <svg aria-hidden={true} fill='none' height='16' viewBox='0 0 16 16' width='16'>
            <path
              d='M3 13.6666V6.16667L7.99998 2.40387L13 6.16667V13.6666H9.26922V9.2051H6.73075V13.6666H3Z'
              fill='currentColor'
            />
          </svg>
          ホーム
        </Breadcrumb>
        <Breadcrumb href='/2'>組織情報</Breadcrumb>
        <Breadcrumb href='/3'>長いページタイトルが入ります長いページタイトルが入ります</Breadcrumb>
        <Breadcrumb>長いページタイトルが入ります長いページタイトルが入ります</Breadcrumb>
      </Breadcrumbs>
    );
  },
};

export const WithVisibleLabel: Story = {
  render: (args) => {
    const breadcrumbsId = useId();

    return (
      <Breadcrumbs
        {...args}
        aria-labelledby={`${breadcrumbsId}-label`}
        className={twMerge('flex gap-1 items-baseline', args.className)}
      >
        <BreadcrumbsLabel className='flex-none text-dns-16N-120' id={`${breadcrumbsId}-label`}>
          現在位置：
        </BreadcrumbsLabel>
        <Breadcrumb href='/'>ホーム</Breadcrumb>
        <Breadcrumb href='/2'>組織情報</Breadcrumb>
        <Breadcrumb href='/3'>長いページタイトルが入ります長いページタイトルが入ります</Breadcrumb>
        <Breadcrumb>長いページタイトルが入ります長いページタイトルが入ります</Breadcrumb>
      </Breadcrumbs>
    );
  },
};
