import { Session, User } from '@domain/entities';
import { mockTokenService } from '@tests/_factories/adapters';
import { createSessionService } from '@tests/_factories/usecases';

describe('Create Session', () => {
	afterAll(() => jest.restoreAllMocks());

	it('should validate user id', async () => {
		const ipValidationSpy = jest.spyOn(User, 'validateId');

		await createSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
		});

		expect(ipValidationSpy).toHaveBeenCalledTimes(1);
		expect(ipValidationSpy).toHaveBeenCalledWith('1');
	});

	it('should generate token with user id', async () => {
		const tokenSpy = jest.spyOn(mockTokenService, 'generate');

		await createSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
		});

		expect(tokenSpy).toHaveBeenCalledTimes(1);
		expect(tokenSpy).toHaveBeenCalledWith('1');
	});

	it('should return a new session', async () => {
		expect(
			createSessionService.exec({
				userId: '1',
				ipAddress: '0.0.0.0',
			})
		).resolves.toEqual<Session>(expect.any(Session));
	});
});
