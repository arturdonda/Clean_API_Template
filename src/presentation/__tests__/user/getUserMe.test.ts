import { GetUserById } from '@application/services/user';
import { MockUserRepository } from '@application/__tests__/mock';
import { GetUserMeController } from '@presentation/controllers/user';
import { UserViewModel } from '@presentation/viewModels';

describe('Get User Me Controller', () => {
	const mockUserRespository = new MockUserRepository();
	const getUserByIdService = new GetUserById(mockUserRespository);
	const getUserMeController = new GetUserMeController(getUserByIdService);

	test('With required parameter', async () => {
		const serviceSpy = jest.spyOn(getUserByIdService, 'exec');

		expect(
			await getUserMeController.handle({
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
					message: 'Usuário retornado com sucesso.',
					result: expect.any(UserViewModel),
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});
});
