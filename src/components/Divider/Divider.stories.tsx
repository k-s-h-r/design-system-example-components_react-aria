import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  id: 'Component/Divider',
  title: 'Component/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      description: '区切り線の向きを選択します。',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal', 'vertical'" },
      },
    },
    lineStyle: {
      options: ['solid', 'dashed'],
      control: { type: 'radio' },
      description: '線のスタイルを選択します。',
      table: {
        defaultValue: { summary: 'solid' },
        type: { summary: "'solid' | 'dashed'" },
      },
    },
    thickness: {
      options: ['1px', '2px', '3px', '4px'],
      control: { type: 'radio' },
      description:
        '線の太さを選択します。任意値を使いたい場合は className で --divider-thickness を上書きしてください。',
      table: {
        defaultValue: { summary: '1px' },
        type: { summary: "'1px' | '2px' | '3px' | '4px'" },
      },
    },
    color: {
      options: ['gray-420', 'gray-536', 'black'],
      control: { type: 'radio' },
      description: '線の色を以下から選択します。',
      table: {
        defaultValue: { summary: 'gray-420' },
        type: { summary: "'gray-420', 'gray-536', 'black'" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Default では線の太さは\`1px\`、スタイルは\`solid\`に設定されています。\`lineStyle\` と \`thickness\` prop で線種と太さを指定できます。任意の太さを使いたい場合は \`className="[--divider-thickness:3px]"\` で上書きしてください。`,
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    className: '',
    orientation: 'horizontal',
    lineStyle: 'solid',
    thickness: '1px',
    color: 'gray-420',
  },
  render: (args) => (
    <div className={args.orientation === 'vertical' ? 'flex h-24' : 'w-full'}>
      <Divider {...args} />
    </div>
  ),
};

export const Solid: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-8'>
        <Divider />
        <Divider color='gray-536' />
        <Divider color='black' />
        <Divider thickness='2px' />
        <Divider color='gray-536' thickness='2px' />
        <Divider color='black' thickness='2px' />
        <Divider thickness='3px' />
        <Divider color='gray-536' thickness='3px' />
        <Divider color='black' thickness='3px' />
        <Divider thickness='4px' />
        <Divider color='gray-536' thickness='4px' />
        <Divider color='black' thickness='4px' />
      </div>
    );
  },
};

export const Dash: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-8'>
        <Divider lineStyle='dashed' />
        <Divider color='gray-536' lineStyle='dashed' />
        <Divider color='black' lineStyle='dashed' />
        <Divider lineStyle='dashed' thickness='2px' />
        <Divider color='gray-536' lineStyle='dashed' thickness='2px' />
        <Divider color='black' lineStyle='dashed' thickness='2px' />
        <Divider lineStyle='dashed' thickness='3px' />
        <Divider color='gray-536' lineStyle='dashed' thickness='3px' />
        <Divider color='black' lineStyle='dashed' thickness='3px' />
        <Divider lineStyle='dashed' thickness='4px' />
        <Divider color='gray-536' lineStyle='dashed' thickness='4px' />
        <Divider color='black' lineStyle='dashed' thickness='4px' />
      </div>
    );
  },
};
