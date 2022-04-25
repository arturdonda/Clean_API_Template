import pkgJson from '@root/package.json';
import app from '@main/config/express';
import mongo from '@infra/adapters/db/mongoose';
import request from 'supertest';

const agent = request.agent(app);

describe('Health Check', () => {
	beforeAll(async () => {
		await mongo.connect(process.env.MONGO_URL);
	});

	afterAll(async () => {
		await mongo.disconnect();
	});

	test('Response', async () => {
		const response = await agent.get('/api/');

		expect(response.statusCode).toBe(200);
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toMatchObject({
			success: true,
			message: 'Bem vindo(a) ao Clean API Template',
			result: {
				name: pkgJson.name,
				description: pkgJson.description,
				version: pkgJson.version,
				author: pkgJson.author,
				license: pkgJson.license,
				repo: pkgJson.repository.url,
			},
		});
	});
});
