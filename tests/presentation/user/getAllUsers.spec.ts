import { GetAllUsersController } from '@presentation/controllers/user';
import { UserViewModel } from '@presentation/viewModels';
import { makeGetAllUsers } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get All Users Controller', () => {
	const getAllUsersService = makeGetAllUsers(mockUserRepository);
	const getAllUsersController = new GetAllUsersController(getAllUsersService);

	test('With required parameter', async () => {
		const serviceSpy = jest.spyOn(getAllUsersService, 'exec');

		expect(
			await getAllUsersController.handle({
				ip: '0.0.0.0',
				userId: '1',
				query: null,
				cookies: null,
				headers: null,
				body: null,
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Usuários retornados com sucesso.',
					result: expect.arrayContaining([expect.any(UserViewModel)]),
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});
});
