module.exports = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: ['/node_modules/(?!axios)'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
}
