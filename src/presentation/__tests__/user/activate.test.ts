import { MockUserRepository } from '@application/__tests__/mock';
import { Activate } from '@application/services/user';
import { ActivateUserController } from '@presentation/controllers/user';

describe('Activate User Controller', () => {
	const mockUserRespository = new MockUserRepository();
	const activateUserService = new Activate(mockUserRespository);
	const activateUserController = new ActivateUserController(activateUserService);

	test('With required parameter', async () => {
		const user = await mockUserRespository.getById('1');
		const serviceSpy = jest.spyOn(activateUserService, 'exec');

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
