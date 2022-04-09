import { CreateSession, RenewAccess } from '@application/services/session';
import { SignIn } from '@application/services/user';
import { MockHashService, MockIpService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { SignInController } from '@presentation/controllers/user';
import { MissingParamError } from '@presentation/errors';
import { UserViewModel } from '@presentation/viewModels';

describe('Sign In Controller', () => {
	const mockUserRespository = new MockUserRepository();
	const passwordHashService = new MockHashService();
	const tokenService = new MockTokenService();
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const renewAccessService = new RenewAccess(tokenService, tokenService);
	const signInService = new SignIn(mockUserRespository, passwordHashService, createSessionService, renewAccessService);
	const signInController = new SignInController(signInService);

	test('With required parameter', async () => {
		const user = await mockUserRespository.getById('1');

		user.status = 'Active';

		await mockUserRespository.update(user);

		const serviceSpy = jest.spyOn(signInService, 'exec');
		expect(
			await signInController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { email: user.email, password: 'Sueli@123' },
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Usuário logado com sucesso.',
					result: expect.any(UserViewModel),
				},
				headers: expect.objectContaining({ authorization: expect.any(String) }),
				cookies: expect.objectContaining({ sessionToken: expect.any(String) }),
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('Without required parameter - email', async () => {
		expect(
			signInController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { password: 'Sueli@123' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao logar usuário.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'email' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});

	test('Without required parameter - password', async () => {
		expect(
			signInController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { email: 'abc' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao logar usuário.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'password' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});
});
