import type { Meta } from '@storybook/react';
import { DialogContent, DialogOverlay, DialogTrigger } from '@/components';
import { HamburgerMenuButton } from './';

const meta = {
  title: 'Component/HamburgerMenuButton',
  component: HamburgerMenuButton,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof HamburgerMenuButton>;

export default meta;

const Template = (args) => (
  <DialogTrigger>
    <HamburgerMenuButton {...args} />

    <DialogOverlay>
      <DialogContent side='right' className='bg-white'>
        {() => (
          <>
            <div className='h-40 w-60 border border-solid-gray-400 p-4' id='menu'>
              メニューを表示中
            </div>
          </>
        )}
      </DialogContent>
    </DialogOverlay>
  </DialogTrigger>
);

export const HorizontalJapaneseLabel = (args) => <Template {...args} />;

HorizontalJapaneseLabel.args = {
  orientation: 'horizontal',
  label: {
    open: 'メニュー',
    close: '閉じる',
  },
};

export const VerticalJapaneseLabel = (args) => <Template {...args} />;

VerticalJapaneseLabel.args = {
  orientation: 'vertical',
  label: {
    open: 'メニュー',
    close: '閉じる',
  },
};

export const HorizontalEnglishLabel = (args) => <Template {...args} />;

HorizontalEnglishLabel.args = {
  orientation: 'horizontal',
  label: {
    open: 'OPEN',
    close: 'CLOSE',
  },
};

export const VerticalEnglishLabel = (args) => <Template {...args} />;

VerticalEnglishLabel.args = {
  orientation: 'vertical',
  label: {
    open: 'OPEN',
    close: 'CLOSE',
  },
  labelClassName: 'tracking-wider',
};
