import type { Preview } from '@storybook/react';
import { themes } from 'storybook/theming';
import '../src/index.css';

const docsTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? themes.dark
  : themes.light;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {},
    },
    docs: {
      theme: docsTheme,
    },
  },
};

export default preview;
