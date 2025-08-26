/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/preset-create-react-app", "@storybook/addon-docs"],
  framework: {
    // "name": "@storybook/react-webpack5",
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
};
export default config;
