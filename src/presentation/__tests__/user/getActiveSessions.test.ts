import { GetActiveSessions } from '@application/services/user';
import { CreateSession } from '@application/services/session';
import { MockIpService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { GetActiveSessionsController } from '@presentation/controllers/user';
import { SessionViewModel } from '@presentation/viewModels';

describe('Get Active Sessions Controller', () => {
	const mockUserRepository = new MockUserRepository();
	const getActiveSessionsService = new GetActiveSessions(mockUserRepository);
	const getActiveSessionsController = new GetActiveSessionsController(getActiveSessionsService);
	const tokenService = new MockTokenService();
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);

	test('With required parameter', async () => {
		const user = await mockUserRepository.getById('1');
		const serviceSpy = jest.spyOn(getActiveSessionsService, 'exec');

		const session = await createSessionService.exec({ userId: '1', ipAddress: '0.0.0.0' });

		user.addSession(session);

		await mockUserRepository.update(user);

		expect(
			await getActiveSessionsController.handle({
				ip: '0.0.0.0',
				userId: '1',
				query: null,
				cookies: null,
				headers: null,
				body: null,
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Sessões retornadas com sucesso.',
					result: expect.arrayContaining([expect.any(SessionViewModel)]),
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});
});
