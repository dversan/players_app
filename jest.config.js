module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/__tests__/__mocks__/globalMocks.tsx'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/__tests__/__mocks__/globalMocks.tsx'
  ],
  transform: {
    // Handle TypeScript files
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|@gluestack-style/react|@gluestack-ui/config|@gluestack-ui/themed|@react-native-community/datetimepicker|@react-native-firebase|@react-native-localize|lucide-react-native|@expo/html-elements|@legendapp/motion)/)'
  ],
  modulePathIgnorePatterns: [
    '__mocks__',
    '__utils__',
    'index.test.js',
    '__doubles__'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$':
      '<rootDir>/__tests__/__mocks__/fileMock.js'
  },
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  cacheDirectory: '.jest/cache'
}
