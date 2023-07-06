import type { StorybookConfig } from '@storybook/nextjs'
const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require("path");


const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config: any, ) => {
    console.log({ config })
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src/")
    };
    config.resolve.extensions.push(".ts", ".tsx");
    config.plugins.concat(new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
   }))
    return config;
  }
}
export default config

// "@/*": ["./src/*"],
//       "@client*": ["./src/client/*"],
//       "@api*": ["./src/client/*"]