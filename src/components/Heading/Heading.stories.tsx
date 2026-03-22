import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Heading,
  type HeadingLevel,
  HeadingShoulder,
  type HeadingSize,
  HeadingTitle,
  type RuleSize,
} from './Heading';

const meta = {
  title: 'Component/見出し',
  component: Heading,
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;

type PlaygroundArgs = {
  hasChip: boolean;
  hasIcon: boolean;
  hasRule: boolean;
  hasShoulder: boolean;
  level: HeadingLevel;
  rule: RuleSize;
  shoulderText?: string;
  size: HeadingSize;
  text: string;
};

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    hasChip: false,
    hasIcon: false,
    hasRule: false,
    hasShoulder: false,
    level: 'h2',
    rule: '6',
    shoulderText: 'ショルダーテキスト',
    size: '36',
    text: '見出しテキスト',
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['64', '57', '45', '36', '32', '28', '24', '20', '18', '16'],
    },
    level: {
      control: { type: 'inline-radio' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    hasChip: {
      control: { type: 'boolean' },
    },
    hasIcon: {
      control: { type: 'boolean' },
    },
    hasRule: {
      control: { type: 'boolean' },
    },
    rule: {
      control: { type: 'inline-radio' },
      options: ['8', '6', '4', '2'],
      if: { arg: 'hasRule', eq: true },
    },
    hasShoulder: {
      control: { type: 'boolean' },
    },
    shoulderText: {
      control: { type: 'text' },
      if: { arg: 'hasShoulder', eq: true },
    },
    text: {
      control: { type: 'text' },
    },
  },
  render: ({ hasChip, hasIcon, hasRule, hasShoulder, level, rule, shoulderText, size, text }) => (
    <Heading hasChip={hasChip} rule={hasRule ? rule : undefined} size={size}>
      {hasShoulder ? <HeadingShoulder>{shoulderText}</HeadingShoulder> : null}
      <HeadingTitle level={level}>
        {hasIcon ? (
          <svg
            aria-hidden={true}
            className='mr-[0.4em] inline-block h-[1.25em] w-[1.25em] align-[-0.25em]'
            fill='currentColor'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <path d='M4.6 20.5c-.5-.1-1-.6-1.1-1l16-16c.5.1.9.6 1 1l-16 16Zm-1.1-6.4v-2L12 3.4h2.1L3.5 14.1Zm0-7.4V5.3c0-1 .8-1.8 1.8-1.8h1.4L3.5 6.7Zm13.8 13.8 3.2-3.2v1.4c0 1-.8 1.8-1.8 1.8h-1.4Zm-7.4 0L20.5 9.9v2L12 20.6H9.9Z' />
          </svg>
        ) : null}
        {text}
      </HeadingTitle>
    </Heading>
  ),
};
