module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^@testing/(.*)$': '<rootDir>/test-utils/$1',
  },
};
