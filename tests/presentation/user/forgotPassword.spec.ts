import { ForgotPasswordController } from '@presentation/controllers/user';
import { forgotPasswordService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Forgot Password Controller', () => {
	const forgotPasswordController = new ForgotPasswordController(forgotPasswordService);

	test('With required parameter', async () => {
		const user = await mockUserRepository.getById('1');
		const serviceSpy = jest.spyOn(forgotPasswordService, 'exec');

		expect(
			await forgotPasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { email: user.email },
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'E-mail para alteração de senha enviado.',
					result: null,
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('Without required parameter', async () => {
		expect(
			forgotPasswordController.handle({
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
					message: 'Erro ao enviar e-mail de alteração de senha.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'email' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});
});
