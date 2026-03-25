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
    options: {
      storySort: (a, b) => {
        const trailingStoryGroupOrder = new Map([
          ['DADS v1', 1],
          ['Deprecated', 2],
        ]);
        const aSegments = a.title.split('/');
        const bSegments = b.title.split('/');

        for (
          let index = 0;
          index < Math.max(aSegments.length, bSegments.length);
          index++
        ) {
          const aSegment = aSegments[index];
          const bSegment = bSegments[index];

          if (aSegment == null || bSegment == null) {
            return 0;
          }

          if (aSegment !== bSegment) {
            const aOrder = trailingStoryGroupOrder.get(aSegment) ?? 0;
            const bOrder = trailingStoryGroupOrder.get(bSegment) ?? 0;

            if (aOrder !== bOrder) {
              return aOrder - bOrder;
            }

            return 0;
          }
        }

        return 0;
      },
    },
  },
};

export default preview;
