module.exports = {
  root: true,
  extends: ['airbnb-base', 'plugin:vue/recommended', 'plugin:storybook/recommended'],
  rules: {
    'no-underscore-dangle': 'off',
    'import/no-unresolved': [2, {
      caseSensitive: true
    }],
    'import/prefer-default-export': 'off',
    'arrow-parens': [2, 'as-needed'],
    'no-trailing-spaces': ['error', {
      skipBlankLines: true,
      ignoreComments: true
    }],
    'no-confusing-arrow': ['error', {
      allowParens: true
    }],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'no-new': 'off',
    'prefer-promise-reject-errors': 'off',
    'nonblock-statement-body-position': ['error', 'beside', {
      overrides: {
        if: 'any'
      }
    }],
    curly: ['error', 'multi-or-nest', 'consistent'],
    camelcase: 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['state']
    }],
    'vue/singleline-html-element-content-newline': ['error', {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea', 'div', 'span']
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-use-before-define': 'off',
    'max-len': ['error', {
      code: 130,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreRegExpLiterals: true
    }]
  },
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.config.dev.js'
      }
    }
  },
  plugins: ['vue'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2017,
    sourceType: 'module'
  }
};