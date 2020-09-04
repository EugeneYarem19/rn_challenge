module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node',],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect",],
  testMatch: [
    "<rootDir>/__tests__/**/*.test.ts",
    "<rootDir>/__tests__/**/*.test.tsx",
  ],
};
