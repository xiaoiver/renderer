module.exports = {
  testTimeout: 100000,
  testMatch: ['<rootDir>/__tests__/**/*/*.spec.+(ts|tsx|js)'],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  modulePathIgnorePatterns: ['dist'],
  collectCoverageFrom: [
    'src/api/**/*.ts',
    'src/shader/**/*.ts',
    'src/webgl/**/*.ts',
  ],
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          allowJs: true,
          target: 'esnext',
          esModuleInterop: true,
        },
      },
    ],
  },
  // @see https://stackoverflow.com/questions/42260218/jest-setup-syntaxerror-unexpected-token-export
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};
