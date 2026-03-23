import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  LanguageSelector,
  LanguageSelectorArrowIcon,
  LanguageSelectorButton,
  LanguageSelectorGlobeIcon,
  LanguageSelectorMenu,
  LanguageSelectorMenuItem,
} from './LanguageSelector';

const meta = {
  title: 'Component/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
  args: {
    children: null,
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const exampleLanguages = [
  { code: 'ja', name: '日本語', url: 'https://www.digital.go.jp/' },
  { code: 'en', name: 'English', url: 'https://www.digital.go.jp/en' },
  { code: 'zh-cn', name: '简体中文', url: '#' },
  { code: 'zh-tw', name: '繁体中文', url: '#' },
  { code: 'ko', name: '한국어', url: '#' },
  { code: 'es', name: 'Español', url: '#' },
];

export const Example: Story = {
  render: () => (
    <div className='h-80'>
      <LanguageSelector>
        <LanguageSelectorButton aria-label='言語を選択'>
          <LanguageSelectorGlobeIcon />
          <span>Language</span>
          <LanguageSelectorArrowIcon />
        </LanguageSelectorButton>
        <LanguageSelectorMenu>
          {exampleLanguages.map((lang) => (
            <LanguageSelectorMenuItem
              href={lang.url}
              id={lang.code}
              isCurrent={lang.code === 'ja'}
              key={lang.code}
              textValue={lang.name}
            >
              {lang.name}
            </LanguageSelectorMenuItem>
          ))}
        </LanguageSelectorMenu>
      </LanguageSelector>
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div className='h-80'>
      <LanguageSelector>
        <LanguageSelectorButton aria-label='言語を選択' orientation='vertical'>
          <LanguageSelectorGlobeIcon />
          <span>Language</span>
          <LanguageSelectorArrowIcon />
        </LanguageSelectorButton>
        <LanguageSelectorMenu>
          {exampleLanguages.map((lang) => (
            <LanguageSelectorMenuItem
              href={lang.url}
              id={lang.code}
              isCurrent={lang.code === 'ja'}
              key={lang.code}
              textValue={lang.name}
            >
              {lang.name}
            </LanguageSelectorMenuItem>
          ))}
        </LanguageSelectorMenu>
      </LanguageSelector>
    </div>
  ),
};
