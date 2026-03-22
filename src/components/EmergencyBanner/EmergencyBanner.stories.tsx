import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmergencyBanner } from './EmergencyBanner';
import { EmergencyBannerBody } from './parts/Body';
import { EmergencyBannerButton } from './parts/Button';
import { EmergencyBannerHeading } from './parts/Heading';

const meta = {
  title: 'Component/緊急時バナー',
  component: EmergencyBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '緊急時バナーは緊急性の高い通知のため、できるだけページの先頭に近い場所に配置します。リンク先がある場合はバナー内にアクションボタンを配置します。',
      },
    },
  },
} satisfies Meta<typeof EmergencyBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

function BannerContent({ withLink, newWindow = false }: { newWindow?: boolean; withLink: boolean }) {
  return (
    <EmergencyBanner>
      <EmergencyBannerHeading level={2}>〇〇地区に避難準備情報が発令されました</EmergencyBannerHeading>
      <EmergencyBannerBody>
        <div className='flex flex-col gap-2 desktop:gap-4'>
          <p className='text-std-16N-170'>
            <time dateTime='2024-01-01T06:00'>2024年1月1日 06:00更新</time>
          </p>
          <p className='text-std-16N-170 desktop:text-std-20N-150'>
            1時23分に○○地区に対して避難準備情報が発令されました。お年寄りの方等避難に時間がかかる方は、直ちに指定避難所へ避難してください。
          </p>
          {withLink ? (
            <EmergencyBannerButton className='mb-2 mt-4' href='#' target={newWindow ? '_blank' : undefined}>
              指定避難所を確認する
            </EmergencyBannerButton>
          ) : null}
        </div>
      </EmergencyBannerBody>
    </EmergencyBanner>
  );
}

export const WithoutLink: Story = {
  render: () => <BannerContent withLink={false} />,
};

export const WithLink: Story = {
  render: () => <BannerContent withLink={true} />,
};

export const WithLinkInNewWindow: Story = {
  render: () => <BannerContent newWindow={true} withLink={true} />,
};
