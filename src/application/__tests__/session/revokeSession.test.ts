import { MockIpService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { CreateSession, RevokeSession } from '@application/services/session';
import { UserNotFoundError } from '@application/errors';
import { SessionNotFoundError } from '@domain/errors';

describe('Revoke Session', () => {
	const tokenService = new MockTokenService();
	const userRepository = new MockUserRepository();
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const revokeSessionService = new RevokeSession(userRepository, ipService);

	test('Valid token', async () => {
		const user = await userRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		const session = await createSessionService.exec({
			userId: user.id,
			ipAddress: '0.0.0.0',
		});

		user.addSession(session);

		userRepository.update(user);

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
		const token = tokenService.generate('1');

		expect(
			revokeSessionService.exec({
				userId: '1',
				sessionToken: token.token,
				ipAddress: '0.0.0.0',
			})
		).rejects.toThrow(SessionNotFoundError);
	});
});
