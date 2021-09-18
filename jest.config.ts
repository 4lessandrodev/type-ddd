module.exports = {
	roots: ['<rootDir>'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: {
		'@types-ddd': '<rootDir>/lib/index',
	},
};
