module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(ts)$',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['src/grpc'],
}
