import { RevokeSessionController } from '@presentation/controllers/session';
import { makeCreateSession, makeRevokeSession } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Revoke Session Controller', () => {
	const revokeSessionService = makeRevokeSession(mockUserRepository);
	const createSessionService = makeCreateSession();
	const revokeSessionController = new RevokeSessionController(revokeSessionService);

	test('With required parameter', async () => {
		const user = await mockUserRepository.getById('1');
		const serviceSpy = jest.spyOn(revokeSessionService, 'exec');

		const session = await createSessionService.exec({ userId: '1', ipAddress: '0.0.0.0' });

		user.addSession(session);

		await mockUserRepository.update(user);

		expect(
			await revokeSessionController.handle({
				ip: '0.0.0.0',
				userId: '1',
				query: { sessionToken: session.token },
				cookies: null,
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
	test('Without required parameter', async () => {
		expect(
			revokeSessionController.handle({
				ip: '0.0.0.0',
				userId: '1',
				query: null,
				cookies: null,
				headers: null,
				body: null,
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao finalizar sessão.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'sessionToken' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});
});
