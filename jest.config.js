module.exports = {
  // roots: ['<rootDir>/src', '<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  projects: ['<rootDir>/packages/*/jest.config.js'],
  snapshotSerializers: [
    // 'enzyme-to-json/serializer'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/\\./'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // setupTestFrameworkScriptFile: '<rootDir>/../../rtl.setup.js',
  verbose: true,
}
