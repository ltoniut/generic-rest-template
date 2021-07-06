module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  moduleNameMapper: {
    '^src[/](.*)': '<rootDir>/$1',
  },
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['/node_modules/', '_template'],
};
