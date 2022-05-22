import { SignInController } from '@presentation/controllers/user';
import { UserViewModel } from '@presentation/viewModels';
import { signInService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Sign In Controller', () => {
	const signInController = new SignInController(signInService);

	test('With required parameter', async () => {
		const user = await mockUserRepository.getById('1');

		user.status = 'Active';

		await mockUserRepository.update(user);

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
