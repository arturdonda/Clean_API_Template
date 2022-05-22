import { UpdateOptionalDataController } from '@presentation/controllers/user';
import { UserViewModel } from '@presentation/viewModels';
import { updateOptionalDataService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Update Optional Data Controller', () => {
	const updateOptionalDataController = new UpdateOptionalDataController(updateOptionalDataService);

	test('With optional parameter', async () => {
		const serviceSpy = jest.spyOn(updateOptionalDataService, 'exec');

		expect(
			await updateOptionalDataController.handle({
				ip: '0.0.0.0',
				userId: '1',
				query: null,
				cookies: null,
				headers: null,
				body: { address: 'Not Found Street, 404' },
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Dados atualizados com sucesso.',
					result: expect.any(UserViewModel),
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('With no parameters', async () => {
		const serviceSpy = jest.spyOn(updateOptionalDataService, 'exec');

		expect(
			await updateOptionalDataController.handle({
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
					message: 'Dados atualizados com sucesso.',
					result: expect.any(UserViewModel),
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});
});
