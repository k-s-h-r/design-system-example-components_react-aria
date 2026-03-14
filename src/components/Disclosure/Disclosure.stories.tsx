import type { Meta, StoryObj } from '@storybook/react';
import {
  Disclosure,
  DisclosureBackLink,
  DisclosureDefaultIcon,
  DisclosurePanel,
  DisclosureSummary,
} from './';

const meta = {
  title: 'Component/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-6'>
        <Disclosure defaultExpanded>
          <DisclosureSummary>開示情報とは何ですか？</DisclosureSummary>
          <DisclosurePanel className='pt-4'>
            <p className='mb-4'>
              開示情報は、必要に応じてユーザーが展開して読む補足情報です。
            </p>
            <DisclosureBackLink href='#'>ページ上部へ戻る</DisclosureBackLink>
          </DisclosurePanel>
        </Disclosure>

        <Disclosure>
          <DisclosureSummary>いつ Disclosure を使いますか？</DisclosureSummary>
          <DisclosurePanel className='pt-4'>
            常時表示しなくてよい補足説明や、段階的に読ませたい内容に使います。
          </DisclosurePanel>
        </Disclosure>
      </div>
    );
  },
};

export const CustomIcon: Story = {
  render: () => {
    return (
      <Disclosure defaultExpanded>
        <DisclosureSummary
          icon={({ isExpanded, isDisabled }) => (
            <span className='inline-flex items-center gap-2'>
              <DisclosureDefaultIcon
                isDisabled={isDisabled}
                isExpanded={isExpanded}
                className={isExpanded ? 'text-orange-800' : 'text-blue-1000'}
              />
            </span>
          )}
        >
          カスタムアイコン
        </DisclosureSummary>
        <DisclosurePanel className='pt-4'>
          Accordion と同じように render props でアイコン差し替えができます。
        </DisclosurePanel>
      </Disclosure>
    );
  },
};
