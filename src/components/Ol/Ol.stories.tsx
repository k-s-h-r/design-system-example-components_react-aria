import type { Meta } from '@storybook/react';
import React from 'react';
import { Ol } from './';

const meta = {
  title: 'Component/Ol',
  component: Ol,
  tags: ['autodocs'],
  argTypes: {
    listStyle: {
      options: ['unset', 'none', 'decimal', 'lower-latin'],
      control: { type: 'radio' },
    },
    hierarchicalStyles: {
      control: 'boolean',
      description: 'trueの場合、自身のOL階層によってlower-latin（2階層目）で表示する',
    },
  },
} satisfies Meta<typeof Ol>;

export default meta;

export const Example = (args) => (
  <Ol {...args}>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>
      サンプルサンプル
      <Ol {...{ hierarchicalStyles: args.hierarchicalStyles }}>
        <li>サンプルサンプル</li>
        <li>サンプルサンプル</li>
        <li>サンプルサンプル</li>
        <li>
          サンプルサンプル
          <Ol {...{ hierarchicalStyles: args.hierarchicalStyles }}>
            <li>サンプルサンプル</li>
            <li>サンプルサンプル</li>
            <li>サンプルサンプル</li>
            <li>サンプルサンプル</li>
          </Ol>
        </li>
      </Ol>
    </li>
  </Ol>
);

export const ListStyleDecimal = (args) => (
  <Ol {...args}>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
  </Ol>
);
ListStyleDecimal.args = {
  listStyle: 'decimal',
};

export const ListStyleLowerLatin = (args) => (
  <Ol {...args}>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
    <li>サンプルサンプル</li>
  </Ol>
);
ListStyleLowerLatin.args = {
  listStyle: 'lower-latin',
};
