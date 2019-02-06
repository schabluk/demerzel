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
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/../../__mocks__/styleMock.js',
    '\\.(scss)$': 'identity-obj-proxy',
  },
}
