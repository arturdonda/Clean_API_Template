import app from '@main/config/express';
import mongo from '@infra/adapters/db/mongoose';
import request from 'supertest';

const agent = request.agent(app);

describe('Express configuration', () => {
	beforeAll(async () => {
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
});
