import mongo from '@infra/adapters/db/mongoose';

describe('MongoDB', () => {
	beforeAll(async () => {
		await mongo.connect(process.env.MONGO_URL);
	});

	afterAll(async () => {
		await mongo.disconnect();
	});

	test('Get users collection - connected', async () => {
		const users = await mongo.collections.User;

		expect(users).toBeTruthy();
	});

	test('Get users collection - disconnected', async () => {
		await mongo.disconnect();

		const users = await mongo.collections.User;

		expect(users).toBeTruthy();
	});
});
