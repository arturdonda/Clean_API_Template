import { configureApp } from '@main/config/express';
import mongo from '@infra/adapters/db/mongoose';
import request from 'supertest';
import { setLocalIp } from '@main/helpers';

jest.mock('@main/helpers/localIp');
const mongoSpy = jest.spyOn(mongo, 'connect');

describe('Express configuration', () => {
	let agent: request.SuperAgentTest;

	beforeAll(async () => {
		const app = await configureApp();
		agent = request.agent(app);

		await mongo.connect(process.env.MONGO_URL);
	});

	afterAll(async () => {
		await mongo.disconnect();
	});

	it('should return JSON', async () => {
		const response = await agent.get('/api');

		expect(response.headers['content-type']).toMatch(/json/);
	});

	it('should use standard response', async () => {
		const response = await agent.get('/api');

		expect(response.body).toMatchObject({
			success: expect.any(Boolean),
			message: expect.any(String),
			result: expect.anything(),
		});
	});

	it('should NOT override ip address', async () => {
		expect(setLocalIp).toHaveBeenCalledTimes(0);
	});

	it('should use mock connection string', async () => {
		expect(mongoSpy).toHaveBeenCalledWith(process.env.MONGO_URL);
	});
});

describe('Express dev configuration', () => {
	let devAgent: request.SuperAgentTest;

	beforeAll(async () => {
		const app = await configureApp('dev');
		devAgent = request.agent(app);
	});

	afterAll(async () => {
		await mongo.disconnect();
	});

	it('should override ip address', async () => {
		expect(setLocalIp).toHaveBeenCalledTimes(1);
	});

	it('should use real connection string', async () => {
		expect(mongoSpy).toHaveBeenCalledWith(process.env.MONGODB_CONNECTION_STRING);
	});
});
