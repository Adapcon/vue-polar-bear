import { library } from '@fortawesome/fontawesome-svg-core';

export const list = () => {
  if (library && library.definitions) {
    return Object
      .entries(library.definitions)
      .reduce((acc, [prefix, icons]) => {
        const formattedIcons = Object
          .keys(icons)
          .map(icon => `${prefix} fa-${icon}`);

        return acc.concat(formattedIcons);
      }, []);
  }

  return [];
}
