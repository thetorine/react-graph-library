const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  babel: (options) => {
    options.presets.push('@emotion/babel-preset-css-prop')
    return options
  },
  webpackFinal: (config) => {
    config.resolve.alias.src = path.join(__dirname, "../", "src");
    return config;
  },
};
