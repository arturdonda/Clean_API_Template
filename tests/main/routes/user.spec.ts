import { configureApp } from '@main/config/express';
import mongo from '@infra/adapters/db/mongoose';
import request from 'supertest';
import { RevokeSessionController } from '@presentation/controllers/session';
import {
	GetAllUsersController,
	GetUserMeController,
	GetUserByIdController,
	GetActiveSessionsController,
	SignUpController,
	UpdateOptionalDataController,
	UpdatePasswordController,
} from '@presentation/controllers/user';
import { AccessTokenService } from '@infra/adapters/token/jsonwebtoken';

jest.mock('@presentation/controllers/session');
jest.mock('@presentation/controllers/user');

let agent: request.SuperAgentTest;

const { token: accessToken } = new AccessTokenService().generate('123');

describe('Auth routes', () => {
	beforeAll(async () => {
		const app = await configureApp();
		agent = request.agent(app);

		await mongo.connect(process.env.MONGO_URL);
	});

	beforeEach(() => jest.resetAllMocks());

	afterAll(async () => {
		await mongo.disconnect();
	});

	it("should call GetAllUsersController's handle method", async () => {
		expect(GetAllUsersController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.get('/api/users').set('authorization', `Bearer ${accessToken}`);

		expect(GetAllUsersController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call GetUserMeController's handle method", async () => {
		expect(GetUserMeController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.get('/api/users/me').set('authorization', `Bearer ${accessToken}`);

		expect(GetUserMeController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call GetUserByIdController's handle method", async () => {
		expect(GetUserByIdController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.get('/api/users/123').set('authorization', `Bearer ${accessToken}`);

		expect(GetUserByIdController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call GetActiveSessionsController's handle method", async () => {
		expect(GetActiveSessionsController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.get('/api/users/me/sessions').set('authorization', `Bearer ${accessToken}`);

		expect(GetActiveSessionsController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call SignUpController's handle method", async () => {
		expect(SignUpController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.post('/api/users');

		expect(SignUpController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call UpdateOptionalDataController's handle method", async () => {
		expect(UpdateOptionalDataController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.put('/api/users/me').set('authorization', `Bearer ${accessToken}`);

		expect(UpdateOptionalDataController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call UpdatePasswordController's handle method", async () => {
		expect(UpdatePasswordController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.put('/api/users/me/password').set('authorization', `Bearer ${accessToken}`);

		expect(UpdatePasswordController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call RevokeSessionController's handle method", async () => {
		expect(RevokeSessionController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.delete('/api/users/me/sessions/123').set('authorization', `Bearer ${accessToken}`);

		expect(RevokeSessionController.prototype.handle).toHaveBeenCalledTimes(1);
	});
});
