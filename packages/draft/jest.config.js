const base = require('../../jest.config.js')

module.exports = {
  ...base,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  name: 'draft',
  displayName: 'Draft Editor',
}
