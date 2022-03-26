import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	roots: ['<rootDir>/src'],
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: {
		'@/(.+)': '<rootDir>/src/$1',
	},
	modulePathIgnorePatterns: ['mock'],
};

export default config;
