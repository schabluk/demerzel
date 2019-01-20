const base = require('../../jest.config.js')

module.exports = {
  ...base,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  name: 'webapp',
  displayName: 'Web Application',
}
