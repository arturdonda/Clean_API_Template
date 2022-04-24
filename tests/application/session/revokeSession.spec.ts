import { SessionNotFoundError } from '@domain/errors';
import { makeCreateSession, makeRevokeSession } from '@tests/_factories/usecases';
import { UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockTokenService } from '@tests/_factories/adapters';

describe('Revoke Session', () => {
	const createSessionService = makeCreateSession();
	const revokeSessionService = makeRevokeSession(mockUserRepository);

	test('Valid token', async () => {
		const user = await mockUserRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		const session = await createSessionService.exec({
			userId: user.id,
			ipAddress: '0.0.0.0',
		});

		user.addSession(session);

		mockUserRepository.update(user);

		expect(user.sessions.length).toBe(1);

		expect(
			await revokeSessionService.exec({
				userId: user.id,
				sessionToken: session.token,
				ipAddress: '0.0.0.0',
			})
		).resolves;

		expect(user.getSession(session.token).isActive).toBe(false);
		expect((user.getSession(session.token).revokedAt?.valueOf() ?? 0) / 1000).toBeCloseTo(new Date().valueOf() / 1000, 0);
		expect(user.getSession(session.token).revokedBy).toMatchObject(
			expect.objectContaining({
				ip: '0.0.0.0',
			})
		);
	});

	test('Invalid session', async () => {
		const token = mockTokenService.generate('1');

		expect(
			revokeSessionService.exec({
				userId: '1',
				sessionToken: token.token,
				ipAddress: '0.0.0.0',
			})
		).rejects.toThrow(SessionNotFoundError);
	});
});
