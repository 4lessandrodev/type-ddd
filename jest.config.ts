module.exports = {
     roots: ['<rootDir>'],
     collectCoverageFrom: ['<rootDir>/tests/**/*.ts', '!<rootDir>/src/**'],
     coverageDirectory: 'coverage',
     testEnvironment: 'node',
     transform: {
          '.+\\.ts$': 'ts-jest',
     },
};
