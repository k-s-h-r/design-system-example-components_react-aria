import type { Meta } from '@storybook/react';
import { DialogContent, DialogOverlay, DialogTrigger } from '@/components';
import { HamburgerButton } from './';

const meta = {
  title: 'Component/HamburgerButton',
  component: HamburgerButton,
  tags: ['autodocs'],
  argTypes: {
    align: {
      options: ['row', 'col'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof HamburgerButton>;

export default meta;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Example = (args: any) => (
  <DialogTrigger>
    <HamburgerButton {...args} />

    <DialogOverlay>
      <DialogContent side='right' className='bg-white'>
        {({ close }) => (
          <>
            <div className='h-40 w-60 border border-solid-grey-400 p-4' id='menu'>
              メニューを表示中
            </div>
          </>
        )}
      </DialogContent>
    </DialogOverlay>
  </DialogTrigger>
);

Example.args = {
  align: 'row',
  label: {
    open: 'メニュー',
    close: '閉じる',
  },
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Row = (args: any) => <Example {...args} />;

Row.args = {
  align: 'col',
  label: {
    open: 'メニュー',
    close: '閉じる',
  },
};
