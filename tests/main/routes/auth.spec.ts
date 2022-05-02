import app from '@main/config/express';
import mongo from '@infra/adapters/db/mongoose';
import request from 'supertest';
import { RenewAccessController, SignOutController } from '@presentation/controllers/session';
import { ActivateUserController, SignInController, ForgotPasswordController, UpdateForgottenPasswordController } from '@presentation/controllers/user';
import { AccessTokenService } from '@infra/adapters/token/jsonwebtoken';

jest.mock('@presentation/controllers/session');
jest.mock('@presentation/controllers/user');

const agent = request.agent(app);
const { token: accessToken } = new AccessTokenService().generate('123');

describe('Auth routes', () => {
	beforeAll(async () => {
		await mongo.connect(process.env.MONGO_URL);
	});

	beforeEach(() => jest.resetAllMocks());

	afterAll(async () => {
		await mongo.disconnect();
	});

	it("should call RenewAccessController's handle method", async () => {
		expect(RenewAccessController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.get('/api/auth/refresh');

		expect(RenewAccessController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call SignOutController's handle method", async () => {
		expect(SignOutController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.get('/api/auth/sign-out').set('authorization', `Bearer ${accessToken}`);

		expect(SignOutController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call ActivateUserController's handle method", async () => {
		expect(ActivateUserController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.post('/api/auth/activate');

		expect(ActivateUserController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call SignInController's handle method", async () => {
		expect(SignInController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.post('/api/auth/sign-in');

		expect(SignInController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call ForgotPasswordController's handle method", async () => {
		expect(ForgotPasswordController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.post('/api/auth/forgot-password');

		expect(ForgotPasswordController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call ForgotPasswordController's handle method", async () => {
		expect(ForgotPasswordController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.post('/api/auth/forgot-password');

		expect(ForgotPasswordController.prototype.handle).toHaveBeenCalledTimes(1);
	});

	it("should call UpdateForgottenPasswordController's handle method", async () => {
		expect(UpdateForgottenPasswordController.prototype.handle).toHaveBeenCalledTimes(0);

		await agent.post('/api/auth/reset-password');

		expect(UpdateForgottenPasswordController.prototype.handle).toHaveBeenCalledTimes(1);
	});
});
