import { ActivateUserController } from '@presentation/controllers/user';
import { activateService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Activate User Controller', () => {
	const activateUserController = new ActivateUserController(activateService);

	test('With required parameter', async () => {
		const user = await mockUserRepository.getById('1');
		const serviceSpy = jest.spyOn(activateService, 'exec');

		expect(
			await activateUserController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { confirmationCode: user.confirmationCode },
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Usuário ativado com sucesso.',
					result: null,
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('Without required parameter', async () => {
		expect(
			activateUserController.handle({
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
					message: 'Erro ao ativar usuário.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'confirmationCode' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});
});
