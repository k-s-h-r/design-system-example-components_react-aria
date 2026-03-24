import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import {
  NotificationBanner,
  NotificationBannerBody,
  NotificationBannerClose,
  NotificationBannerMobileClose,
} from './NotificationBanner';

function ExampleBody() {
  return (
    <NotificationBannerBody>
      <p>
        <time dateTime='2024-07-01'>2024年7月1日</time>
      </p>
      <p>
        ダミーテキストは、デザインの作成時に使用される仮の文章です。ダミーテキストは、デザインの作成時に使用される仮の文章です。
      </p>
    </NotificationBannerBody>
  );
}

const meta = {
  title: 'Component/NotificationBanner',
  component: NotificationBanner,
  tags: ['autodocs'],
  args: {
    bannerStyle: 'standard',
    children: <ExampleBody />,
    headingLevel: 'h2',
    title: 'バナータイトル',
    type: 'info2',
  },
  argTypes: {
    bannerStyle: {
      control: 'inline-radio',
      options: ['standard', 'color-chip'],
    },
    type: {
      control: 'inline-radio',
      options: ['info1', 'info2', 'warning', 'error', 'success'],
    },
  },
} satisfies Meta<typeof NotificationBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: <ExampleBody />,
  },
};

export const StandardWithClose: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {(['info1', 'info2', 'warning', 'error', 'success'] as const).map((type) => (
        <NotificationBanner
          key={type}
          bannerStyle='standard'
          headingLevel='h2'
          title='登録期間が延長されました'
          type={type}
        >
          <NotificationBannerClose />
          <ExampleBody />
        </NotificationBanner>
      ))}
    </div>
  ),
};

export const ColorChipWithClose: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {(['info1', 'info2', 'warning', 'error', 'success'] as const).map((type) => (
        <NotificationBanner
          key={type}
          bannerStyle='color-chip'
          headingLevel='h2'
          title='登録期間が延長されました'
          type={type}
        >
          <NotificationBannerClose />
          <ExampleBody />
        </NotificationBanner>
      ))}
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <NotificationBanner
      bannerStyle='standard'
      headingLevel='h2'
      title='偽SNSアカウントにご注意ください'
      type='warning'
    >
      <NotificationBannerBody>
        <p>
          ダミーテキストは、デザインの作成時に使用される仮の文章です。ダミーテキストは、デザインの作成時に使用される仮の文章です。
        </p>
        <div className='mt-2 grid gap-2 desktop:grid-flow-col desktop:justify-end desktop:gap-4'>
          <Button
            className='border-warning-yellow-2 text-warning-yellow-2 data-hovered:bg-yellow-200 data-hovered:text-yellow-1000 data-pressed:bg-yellow-300 data-pressed:text-yellow-1200'
            size='md'
            variant='secondary'
          >
            アクションボタン
          </Button>
          <Button
            className='bg-warning-yellow-2 data-hovered:bg-yellow-1100 data-pressed:bg-yellow-1200'
            size='md'
            variant='primary'
          >
            アクションボタン
          </Button>
        </div>
      </NotificationBannerBody>
    </NotificationBanner>
  ),
};

export const MobileClose: Story = {
  render: () => (
    <NotificationBanner
      bannerStyle='standard'
      headingLevel='h2'
      title='登録期間が延長されました'
      type='info1'
    >
      <NotificationBannerMobileClose />
      <NotificationBannerBody>
        <p>
          モバイル向け close ボタンの利用例です。`desktop:hidden` なので小さい viewport
          で確認してください。
        </p>
      </NotificationBannerBody>
    </NotificationBanner>
  ),
};
