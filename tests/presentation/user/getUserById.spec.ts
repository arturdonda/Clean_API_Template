import { GetUserByIdController } from '@presentation/controllers/user';
import { UserViewModel } from '@presentation/viewModels';
import { getUserByIdService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get User By Id Controller', () => {
	const getUserByIdController = new GetUserByIdController(getUserByIdService);

	test('With required parameter', async () => {
		const serviceSpy = jest.spyOn(getUserByIdService, 'exec');

		expect(
			await getUserByIdController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: { userId: '1' },
				cookies: null,
				headers: null,
				body: null,
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Usuário retornado com sucesso.',
					result: expect.any(UserViewModel),
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('Without required parameter', async () => {
		expect(
			getUserByIdController.handle({
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
					message: 'Erro ao retornar usuário.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'userId' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});
});
