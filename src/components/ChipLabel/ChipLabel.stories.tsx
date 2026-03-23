import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChipLabel, type ChipLabelColor, type ChipLabelVariant } from './ChipLabel';

const meta = {
  title: 'Component/ChipLabel',
  component: ChipLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof ChipLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  color: ChipLabelColor;
  icon: boolean;
  text: string;
  variant: ChipLabelVariant;
};

function SampleIcon() {
  return (
    <svg aria-hidden={true} fill='currentColor' height='24' viewBox='0 0 24 24' width='24'>
      <path d='M4.6 20.5c-.5-.1-1-.6-1.1-1l16-16c.5.1.9.6 1 1l-16 16Zm-1.1-6.4v-2L12 3.4h2.1L3.5 14.1Zm0-7.4V5.3c0-1 .8-1.8 1.8-1.8h1.4L3.5 6.7Zm13.8 13.8 3.2-3.2v1.4c0 1-.8 1.8-1.8 1.8h-1.4Zm-7.4 0L20.5 9.9v2L12 20.6H9.9Z' />
    </svg>
  );
}

export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    variant: {
      control: 'radio',
      options: ['text', 'outline', 'filled-outline', 'fill'],
    },
    color: {
      control: 'inline-radio',
      options: [
        'gray',
        'blue',
        'light-blue',
        'cyan',
        'green',
        'lime',
        'yellow',
        'orange',
        'red',
        'magenta',
        'purple',
      ],
    },
    icon: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
  },
  args: {
    variant: 'text',
    color: 'gray',
    icon: true,
    text: 'ラベル',
  },
  render: (args) => (
    <ChipLabel color={args.color} variant={args.variant}>
      {args.icon ? <SampleIcon /> : null}
      {args.text}
    </ChipLabel>
  ),
};

const variants: ChipLabelVariant[] = ['text', 'outline', 'filled-outline', 'fill'];
const colors: ChipLabelColor[] = [
  'gray',
  'blue',
  'light-blue',
  'cyan',
  'green',
  'lime',
  'yellow',
  'orange',
  'red',
  'magenta',
  'purple',
];

export const AllChipLabels: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      {variants.map((variant) =>
        colors.map((color) => (
          <ChipLabel color={color} key={`${variant}-${color}`} variant={variant}>
            <SampleIcon />
            ラベル
          </ChipLabel>
        )),
      )}
    </div>
  ),
};
