import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	roots: ['<rootDir>/src'],
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: {
		'@domain/(.*)': '<rootDir>/src/domain/$1',
		'@application/(.*)': '<rootDir>/src/application/$1',
		'@infra/(.*)': '<rootDir>/src/infra/$1',
		'@presentation/(.*)': '<rootDir>/src/presentation/$1',
		'@main/(.*)': '<rootDir>/src/main/$1',
	},
	modulePathIgnorePatterns: ['mock'],
};

export default config;
