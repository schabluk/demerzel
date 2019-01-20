module.exports = {
  // roots: ['<rootDir>/src', '<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  projects: ['<rootDir>/packages/*/jest.config.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/\\./'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // setupTestFrameworkScriptFile: '<rootDir>/../../rtl.setup.js',
  verbose: true,
}
