import type { Meta } from '@storybook/react';
import { Ul } from './';

const meta = {
  title: 'Component/Ul',
  component: Ul,
  tags: ['autodocs'],
  argTypes: {
    listStyle: {
      options: ['unset', 'none', 'disc', 'circle', 'square'],
      control: { type: 'radio' },
    },
    hierarchicalStyles: {
      control: 'boolean',
      description: 'trueの場合、自身のUL階層によってcircle（2階層目）, square（3階層目）で表示する',
    },
  },
} satisfies Meta<typeof Ul>;

export default meta;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Example = (args: any) => (
  <Ul {...args}>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>
      サンプルサンプル
      <Ul {...{ hierarchicalStyles: args.hierarchicalStyles }}>
        <li>サンプルサンプル</li>
        <li>サンプルサンプル</li>
        <li>サンプルサンプル</li>
        <li>
          サンプルサンプル
          <Ul {...{ hierarchicalStyles: args.hierarchicalStyles }}>
            <li>サンプルサンプル</li>
            <li>サンプルサンプル</li>
            <li>サンプルサンプル</li>
            <li>サンプルサンプル</li>
          </Ul>
        </li>
      </Ul>
    </li>
  </Ul>
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const ListStyleDisc = (args: any) => (
  <Ul {...args}>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
  </Ul>
);
ListStyleDisc.args = {
  listStyle: 'disc',
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const ListStyleCircle = (args: any) => (
  <Ul {...args}>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
  </Ul>
);
ListStyleCircle.args = {
  listStyle: 'circle',
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const ListStyleSquere = (args: any) => (
  <Ul {...args}>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
  </Ul>
);
ListStyleSquere.args = {
  listStyle: 'square',
};
