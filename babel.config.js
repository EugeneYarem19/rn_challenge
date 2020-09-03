module.exports = {
  presets: ['module:metro-react-native-babel-preset',],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.ts', '.tsx',],
        alias: {
          '@src': './src',
          '@screens': './src/screens/index.ts',
          '@navigation': './src/navigation/index.tsx',
          '@redux': './src/redux/index.ts',
          '@api': './src/api/index.ts',
          '@utils': './src/utils/index.ts',
          '@theme': './src/theme/index.ts',
          '@components': './src/components/index.ts',
        },
      },
    ],
  ],
};
