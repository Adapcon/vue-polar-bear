/**
 * VUE JSX is not yet supported as of 2020-08-06
 * See more: https://github.com/storybookjs/storybook/issues/7729
 *
 * MDX SYNTAX DOCS: https://storybook.js.org/docs/formats/mdx-syntax/
 */
import "../src/plugins/fontawesome";

import withGlobalStyles from "./withGlobalStyles";

export const decorators = [withGlobalStyles];

const customViewports = {
  default: {
    name: "Default",
    styles: {
      width: "850px",
      height: "560px",
    },
  },
  ultrawilde: {
    name: "Ultrawilde",
    styles: {
      width: "2560px",
      height: "1080px",
    },
  },
  fullHD: {
    name: "1920x1080",
    styles: {
      width: "1920px",
      height: "1080px",
    },
  },
  HD: {
    name: "1600x900",
    styles: {
      width: "1600px",
      height: "900px",
    },
  },
  WXGA: {
    name: "1366x768",
    styles: {
      width: "1366px",
      height: "768px",
    },
  },
  pixel5: {
    name: "Pixel 5",
    styles: {
      width: "393px",
      height: "851px",
    },
  },
  iphoneXR: {
    name: "Iphone XR",
    styles: {
      width: "414px",
      height: "896px",
    },
  },
  tablet: {
    name: "Tablet",
    styles: {
      width: "540px",
      height: "720px",
    },
  },
};

export const parameters = {
  viewport: {
    viewports: customViewports,
    defaultViewport: "default",
  },
};
