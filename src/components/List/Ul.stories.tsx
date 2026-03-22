import type { Meta } from '@storybook/react';
import { Ul } from './';

const meta = {
  title: 'Component/List/Ul',
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

export const Example = (args) => (
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

export const ListStyleDisc = (args) => (
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

export const ListStyleCircle = (args) => (
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

export const ListStyleSquere = (args) => (
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
