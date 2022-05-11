import { User } from '@domain/entities';
import { mockTokenService } from '@tests/_factories/adapters';
import { makeCreateSession } from '@tests/_factories/usecases';

describe('Create Session', () => {
	const createSessionService = makeCreateSession();

	it('should validate user id', async () => {
		const ipValidationSpy = jest.spyOn(User, 'validateId');

		await createSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
		});

		expect(ipValidationSpy).toHaveBeenCalledTimes(1);
		expect(ipValidationSpy).toHaveBeenCalledWith('1');

		ipValidationSpy.mockRestore();
	});

	it('should generate token with user id', async () => {
		const tokenSpy = jest.spyOn(mockTokenService, 'generate');

		await createSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
		});

		expect(tokenSpy).toHaveBeenCalledTimes(1);
		expect(tokenSpy).toHaveBeenCalledWith('1');

		tokenSpy.mockRestore();
	});

	it('should return a new session', async () => {
		const tokenSpy = jest.spyOn(mockTokenService, 'generate');

		const sessionResult = await createSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
		});

		const tokenResult = tokenSpy.mock.results[0].value;

		expect(sessionResult).toMatchObject({
			token: tokenResult.token,
			expiredAt: tokenResult.expiredAt,
			createdBy: expect.objectContaining({
				ip: '0.0.0.0',
			}),
		});

		tokenSpy.mockRestore();
	});
});
