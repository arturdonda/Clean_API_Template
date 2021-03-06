import { configureApp } from '@main/config/express';
import mongo from '@infra/adapters/db/mongoose';
import request from 'supertest';

let agent: request.SuperAgentTest;

describe('Routes configuration', () => {
	beforeAll(async () => {
		const app = await configureApp();
		agent = request.agent(app);

		await mongo.connect(process.env.MONGO_URL);
	});

	afterAll(async () => {
		await mongo.disconnect();
	});

	it('should return 404 error', async () => {
		const response = await agent.get('/');

		expect(response.status).toBe(404);
	});

	it('should return success', async () => {
		const response = await agent.get('/api');

		expect(response.status).toBe(200);
	});
});
