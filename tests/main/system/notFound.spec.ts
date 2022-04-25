import pkgJson from '@root/package.json';
import app from '@main/config/express';
import mongo from '@infra/adapters/db/mongoose';
import request from 'supertest';

const agent = request.agent(app);

describe('Not Found', () => {
	beforeAll(async () => {
		await mongo.connect(process.env.MONGO_URL);
	});

	afterAll(async () => {
		await mongo.disconnect();
	});

	test('Response', async () => {
		const response = await agent.get('/api/loiawerjjhgnvlqwif');

		expect(response.statusCode).toBe(404);
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toMatchObject({
			success: false,
			message: 'Nenhuma rota encontrada.',
			result: null,
		});
	});
});
