import { UpdatePassword } from '@application/services/user';
import { MockHashService, MockUserRepository } from '@application/__tests__/mock';
import { UpdatePasswordController } from '@presentation/controllers/user';
import { MissingParamError } from '@presentation/errors';

describe('Update Password Controller', () => {
	const mockUserRepository = new MockUserRepository();
	const passwordHashService = new MockHashService();
	const updatePasswordService = new UpdatePassword(mockUserRepository, passwordHashService);
	const updatePasswordController = new UpdatePasswordController(updatePasswordService);

	test('With required parameter', async () => {
		const serviceSpy = jest.spyOn(updatePasswordService, 'exec');

		expect(
			await updatePasswordController.handle({
				ip: '0.0.0.0',
				userId: '1',
				query: null,
				cookies: null,
				headers: null,
				body: { password: 'John@123', confirmationPassword: 'John@123' },
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

	test('Without required parameter - password', async () => {
		expect(
			updatePasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { confirmationPassword: 'John@123' },
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
			updatePasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { password: 'John@123' },
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
