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
        },
      },
    ],
  ],
};
