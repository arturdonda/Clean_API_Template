import { Session, User } from '@domain/entities';
import { UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockIpService } from '@tests/_factories/adapters';
import { createSessionService, revokeSessionService } from '@tests/_factories/usecases';

describe('Revoke Session', () => {
	let sessionToken: string;

	beforeEach(async () => {
		mockUserRepository.resetDatabase();

		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		user.addSession(session);

		await mockUserRepository.update(user);

		sessionToken = session.token;
	});

	afterAll(() => jest.restoreAllMocks());

	it('should validate user id', async () => {
		const ipValidationSpy = jest.spyOn(User, 'validateId');

		await revokeSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
			sessionToken: sessionToken,
		});

		expect(ipValidationSpy).toHaveBeenCalledTimes(1);
		expect(ipValidationSpy).toHaveBeenCalledWith('1');
	});

	it('should validate session token', async () => {
		const tokenValidationSpy = jest.spyOn(Session, 'validateToken');

		await revokeSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
			sessionToken: sessionToken,
		});

		expect(tokenValidationSpy).toHaveBeenCalledTimes(1);
		expect(tokenValidationSpy).toHaveBeenCalledWith(sessionToken);
	});

	it('should validate user against database', async () => {
		expect(
			revokeSessionService.exec({
				userId: '0',
				ipAddress: '0.0.0.0',
				sessionToken: sessionToken,
			})
		).rejects.toThrow(UserNotFoundError);
	});

	it('should get revoker information from ip service', async () => {
		const ipServiceSpy = jest.spyOn(mockIpService, 'lookup');

		await revokeSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
			sessionToken: sessionToken,
		});

		expect(ipServiceSpy).toHaveBeenCalledTimes(1);
		expect(ipServiceSpy).toHaveBeenCalledWith('0.0.0.0');
	});

	it('should revoke session', async () => {
		const userRevokeSpy = jest.spyOn(User.prototype, 'revokeSession');

		await revokeSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
			sessionToken: sessionToken,
		});

		expect(userRevokeSpy).toHaveBeenCalledTimes(1);
		expect(userRevokeSpy).toHaveBeenCalledWith(sessionToken, expect.objectContaining({ ip: '0.0.0.0' }));
	});

	it('should persist changes to database', async () => {
		const databaseSpy = jest.spyOn(mockUserRepository, 'update');

		await revokeSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
			sessionToken: sessionToken,
		});

		expect(databaseSpy).toHaveBeenCalledTimes(1);
		expect(databaseSpy).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
	});
});
