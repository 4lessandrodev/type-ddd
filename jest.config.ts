import './global-setup';

module.exports = {
	roots: ['<rootDir>'],
	collectCoverage: false,
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: {
		'@types-ddd': '<rootDir>/lib/index',
	},
};
