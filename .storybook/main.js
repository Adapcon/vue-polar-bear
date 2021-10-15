module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxBabelOptions: {
          babelrc: true,
          configFile: true,
        },
      },
    },
    '@storybook/addon-controls',
    'storybook-dark-mode/register',
  ],
};
