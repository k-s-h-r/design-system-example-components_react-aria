import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionBackLink,
  AccordionContent,
  AccordionDefaultIcon,
  AccordionGroup,
  AccordionSummary,
} from './';

const meta = {
  title: 'Component/Accordion',
  component: AccordionGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    return (
      <AccordionGroup allowsMultipleExpanded defaultExpandedKeys={['accordion-example-summary-2']}>
        <Accordion id='accordion-example-summary-1'>
          <AccordionSummary>ダミーテキストとは何ですか？</AccordionSummary>
          <AccordionContent>
            <p className='mb-4'>これはダミーテキストです。</p>
            <p>
              ダミーテキストは、デザインやレイアウトの作成時に使用される仮の文章です。ダミーテキストを使用すると、デザインの全体像を評価したり、テキストの配置や長さを確認したりすることができます。ダミーテキストは実際の文章ではないので、内容には意味がありません。
            </p>
            <AccordionBackLink href='#accordion-example-summary-1'>
              「ダミーテキストとは何ですか？」の先頭に戻る
            </AccordionBackLink>
          </AccordionContent>
        </Accordion>

        <Accordion id='accordion-example-summary-2'>
          <AccordionSummary>ダミーテキストはどのような場合に使用されますか。</AccordionSummary>
          <AccordionContent>
            これはダミーテキストです。ダミーテキストは、デザインやレイアウトの作成時に使用される仮の文章です。ダミーテキストは実際の文章ではないので、内容には意味がありません。
            <AccordionBackLink href='#accordion-example-summary-2'>
              「ダミーテキストとは何ですか？」の先頭に戻る
            </AccordionBackLink>
          </AccordionContent>
        </Accordion>
      </AccordionGroup>
    );
  },
};

export const CustomIcon: Story = {
  render: () => {
    return (
      <AccordionGroup defaultExpandedKeys={['item-1']}>
        <Accordion id='item-1'>
          <AccordionSummary
            icon={({ isExpanded, isDisabled }) => (
              <span
                className={
                  isExpanded
                    ? 'absolute top-2 left-0.5 inline-flex size-[var(--icon-size)] items-center justify-center rounded-full border border-current bg-blue-200 text-blue-1000 mt-[calc((1lh-var(--icon-size))/2)] desktop:top-3.5 desktop:left-1.5'
                    : 'absolute top-2 left-0.5 inline-flex size-[var(--icon-size)] items-center justify-center rounded-full border border-current bg-white text-blue-1000 mt-[calc((1lh-var(--icon-size))/2)] desktop:top-3.5 desktop:left-1.5'
                }
              >
                <AccordionDefaultIcon
                  isDisabled={isDisabled}
                  isExpanded={isExpanded}
                  className='size-4 desktop:size-auto'
                />
              </span>
            )}
          >
            カスタムアイコン
          </AccordionSummary>
          <AccordionContent>
            render props で受け取った状態から、アイコンの見た目を差し替えられます。
            <div className='mt-4'>
              <AccordionBackLink href='#'>ページ上部へ戻る</AccordionBackLink>
            </div>
          </AccordionContent>
        </Accordion>
      </AccordionGroup>
    );
  },
};
