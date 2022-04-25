import { UpdateForgottenPasswordController } from '@presentation/controllers/user';
import { makeUpdateForgottenPassword } from '@tests/_factories/usecases';
import { mockUserRepository, mockTokenService } from '@tests/_factories/adapters';

describe('Update Forgotten Password Controller', () => {
	const updateForgottenPasswordService = makeUpdateForgottenPassword(mockUserRepository);
	const updateForgottenPasswordController = new UpdateForgottenPasswordController(updateForgottenPasswordService);

	const { token: resetToken } = mockTokenService.generate('1');

	test('With required parameter', async () => {
		const serviceSpy = jest.spyOn(updateForgottenPasswordService, 'exec');

		expect(
			await updateForgottenPasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { resetToken: resetToken, password: 'John@123', confirmationPassword: 'John@123' },
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Senha atualizada com sucesso.',
					result: null,
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('Without required parameter - resetToken', async () => {
		expect(
			updateForgottenPasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { password: 'John@123', confirmationPassword: 'John@123' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao atualizar senha.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'resetToken' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});

	test('Without required parameter - password', async () => {
		expect(
			updateForgottenPasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { resetToken: resetToken, confirmationPassword: 'John@123' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao atualizar senha.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'password' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});

	test('Without required parameter - confirmationPassword', async () => {
		expect(
			updateForgottenPasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { resetToken: resetToken, password: 'John@123' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao atualizar senha.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'confirmationPassword' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});
});
