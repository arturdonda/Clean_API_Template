import { CreateSession, RenewAccess } from '@application/services/session';
import { MockIpService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { RenewAccessController } from '@presentation/controllers/session';

describe('Renew Access Controller', () => {
	const tokenService = new MockTokenService();
	const userRepository = new MockUserRepository();
	const renewAccessService = new RenewAccess(tokenService, tokenService, userRepository);
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const renewAccessController = new RenewAccessController(renewAccessService);

	test('With required parameter', async () => {
		const serviceSpy = jest.spyOn(renewAccessService, 'exec');

		const user = await userRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		user.addSession(session);

		expect(
			await renewAccessController.handle({
				ip: '0.0.0.0',
				userId: '',
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
					message: 'Acesso renovado com sucesso.',
					result: null,
				},
				headers: expect.objectContaining({ authorization: expect.any(String) }),
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('Without session token', async () => {
		expect(
			renewAccessController.handle({
				ip: '0.0.0.0',
				userId: '',
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
					message: 'Erro ao renovar acesso.',
					result: expect.objectContaining({
						name: 'MissingSessionTokenError',
						message: 'Cookie de sessão não localizado.',
						stack: expect.any(String),
					}),
				},
			})
		);
	});
});
