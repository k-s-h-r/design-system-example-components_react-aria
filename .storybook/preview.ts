import type { Preview } from '@storybook/react';
import { themes } from 'storybook/theming';
import '../src/index.css';

// const docsTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
//   ? themes.dark
//   : themes.light;
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {},
    },
    docs: {
      // Docs pages use the app's global typography colors, so forcing Storybook's
      // dark docs theme makes the content unreadable without a dedicated dark palette.
      theme: themes.light,
    },
  },
};

export default preview;
