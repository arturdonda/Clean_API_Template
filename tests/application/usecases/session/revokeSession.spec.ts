import { Session, User } from '@domain/entities';
import { UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockIpService } from '@tests/_factories/adapters';
import { makeCreateSession, makeRevokeSession } from '@tests/_factories/usecases';

describe('Revoke Session', () => {
	const createSessionService = makeCreateSession();
	const revokeSessionService = makeRevokeSession(mockUserRepository);

	it('should validate user id', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		const ipValidationSpy = jest.spyOn(User, 'validateId');

		user.addSession(session);

		await revokeSessionService.exec({
			userId: user.id,
			ipAddress: '0.0.0.0',
			sessionToken: session.token,
		});

		expect(ipValidationSpy).toHaveBeenCalledTimes(1);
		expect(ipValidationSpy).toHaveBeenCalledWith(user.id);

		ipValidationSpy.mockRestore();
	});

	it('should validate session token', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		const tokenValidationSpy = jest.spyOn(Session, 'validateToken');

		user.addSession(session);

		await revokeSessionService.exec({
			userId: user.id,
			ipAddress: '0.0.0.0',
			sessionToken: session.token,
		});

		expect(tokenValidationSpy).toHaveBeenCalledTimes(1);
		expect(tokenValidationSpy).toHaveBeenCalledWith(session.token);

		tokenValidationSpy.mockRestore();
	});

	it('should validate user against database', async () => {
		const session = await createSessionService.exec({ userId: '0', ipAddress: '0.0.0.0' });

		expect(
			revokeSessionService.exec({
				userId: '0',
				ipAddress: '0.0.0.0',
				sessionToken: session.token,
			})
		).rejects.toThrow(UserNotFoundError);
	});

	it('should get revoker information from ip service', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		const ipServiceSpy = jest.spyOn(mockIpService, 'lookup');

		user.addSession(session);

		await revokeSessionService.exec({
			userId: user.id,
			ipAddress: '0.0.0.0',
			sessionToken: session.token,
		});

		expect(ipServiceSpy).toHaveBeenCalledTimes(1);
		expect(ipServiceSpy).toHaveBeenCalledWith(session.revokedBy.ip);

		ipServiceSpy.mockRestore();
	});

	it('should revoke session', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		const userRevokeSpy = jest.spyOn(User.prototype, 'revokeSession');

		user.addSession(session);

		await revokeSessionService.exec({
			userId: user.id,
			ipAddress: '0.0.0.0',
			sessionToken: session.token,
		});

		expect(userRevokeSpy).toHaveBeenCalledTimes(1);
		expect(userRevokeSpy).toHaveBeenCalledWith(session.token, expect.objectContaining({ ip: session.revokedBy.ip }));

		userRevokeSpy.mockRestore();
	});

	it('should persist changes to database', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		const databaseSpy = jest.spyOn(mockUserRepository, 'update');

		user.addSession(session);

		await revokeSessionService.exec({
			userId: user.id,
			ipAddress: '0.0.0.0',
			sessionToken: session.token,
		});

		expect(databaseSpy).toHaveBeenCalledTimes(1);
		expect(databaseSpy).toHaveBeenCalledWith(expect.objectContaining({ id: user.id }));

		databaseSpy.mockRestore();
	});
});
