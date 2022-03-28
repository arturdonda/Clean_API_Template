import { CreateSession, RevokeSession } from '@application/services/session';
import { MockIpService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { SignOutController } from '@presentation/controllers/session';

describe('Sign Out Controller', () => {
	const mockUserRepository = new MockUserRepository();
	const ipService = new MockIpService();
	const revokeSessionService = new RevokeSession(mockUserRepository, ipService);
	const signOutController = new SignOutController(revokeSessionService);
	const tokenService = new MockTokenService();
	const createSessionService = new CreateSession(tokenService, ipService);

	test('With required parameter', async () => {
		const user = await mockUserRepository.getById('1');
		const serviceSpy = jest.spyOn(revokeSessionService, 'exec');

		const session = await createSessionService.exec({ userId: '1', ipAddress: '0.0.0.0' });

		user.addSession(session);

		await mockUserRepository.update(user);

		expect(
			await signOutController.handle({
				ip: '0.0.0.0',
				userId: '1',
				query: null,
				cookies: { sessionToken: session.token },
				headers: null,
				body: null,
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Sessão finalizada com sucesso.',
					result: null,
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});
});
