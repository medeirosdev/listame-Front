module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src/',
        rootPathPrefix: '~/',
      },
    ],
    'jest-hoist',
    'react-native-reanimated/plugin',
  ],
};
