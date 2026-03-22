import type { Meta, StoryObj } from '@storybook/react';
import { ScrollToTopButton } from './';

const meta = {
  title: 'Component/Deprecated/ScrollToTopButton',
  component: ScrollToTopButton,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollToTopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    href: '#',
  },
};
