const custom = require('../build/webpack.config.dev');

module.exports = ({ config }) => {
  config.resolve.extensions = [...config.resolve.extensions, ...custom.resolve.extensions];

  config.resolve.alias = {
    ...config.resolve.alias,
    ...custom.resolve.alias,
  };
  
  config.module.rules.push(
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            // `dart-sass`
            implementation: require('sass'),
          },
        },
      ],
    },
  );

  return config;
};
