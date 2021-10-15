import adapconTheme from './adapconTheme';

export const parameters = {
  darkMode: {
    current: 'light',
    // Override the default dark theme
    dark: { ...adapconTheme.dark },
    // Override the default light theme
    light: { ...adapconTheme.normal },
  },
};
