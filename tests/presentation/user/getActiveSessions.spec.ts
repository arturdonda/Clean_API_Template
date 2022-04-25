import { GetActiveSessionsController } from '@presentation/controllers/user';
import { SessionViewModel } from '@presentation/viewModels';
import { makeGetActiveSessions, makeCreateSession } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get Active Sessions Controller', () => {
	const getActiveSessionsService = makeGetActiveSessions(mockUserRepository);
	const createSessionService = makeCreateSession();
	const getActiveSessionsController = new GetActiveSessionsController(getActiveSessionsService);

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
