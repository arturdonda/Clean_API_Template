module.exports = {
	mongodbMemoryServerOptions: {
		binary: {
			version: '4.0.3',
			skipMD5: true,
		},
		instance: {
			dbName: 'jest', // Will use the same database for all tests
		},
		autoStart: false,
	},
};

// Check out other options at: https://github.com/shelfio/jest-mongodb#2-create-jest-mongodb-configjs
