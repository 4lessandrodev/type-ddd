module.exports = {
     roots: ['<rootDir>'],
	 collectCoverage: true,
     coverageDirectory: 'coverage',
     testEnvironment: 'node',
     transform: {
          '.+\\.ts$': 'ts-jest',
     },
};
