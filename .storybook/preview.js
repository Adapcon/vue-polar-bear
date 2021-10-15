/**
 * VUE JSX is not yet supported as of 2020-08-06
 * See more: https://github.com/storybookjs/storybook/issues/7729
 *
 * MDX SYNTAX DOCS: https://storybook.js.org/docs/formats/mdx-syntax/
 */
import '../src/plugins/fontawesome';

import withGlobalStyles from './withGlobalStyles';

export const decorators = [
  withGlobalStyles,
];

// export const parameters = {};
