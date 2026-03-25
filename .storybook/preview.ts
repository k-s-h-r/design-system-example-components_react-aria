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
        const trailingStoryGroups = new Set(['DADS v1', 'Deprecated']);
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
            return aSegments.length - bSegments.length;
          }

          const aIsTrailingGroup = trailingStoryGroups.has(aSegment);
          const bIsTrailingGroup = trailingStoryGroups.has(bSegment);

          if (aIsTrailingGroup !== bIsTrailingGroup) {
            return aIsTrailingGroup ? 1 : -1;
          }

          const segmentComparison = aSegment.localeCompare(bSegment, 'ja');
          if (segmentComparison !== 0) {
            return segmentComparison;
          }
        }

        return 0;
      },
    },
  },
};

export default preview;
