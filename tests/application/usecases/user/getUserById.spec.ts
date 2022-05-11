import { makeGetUserById } from '@tests/_factories/usecases';
import { UserNotFoundError } from '@application/errors';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get User By Id', () => {
	const getUserByIdService = makeGetUserById(mockUserRepository);

	test('Valid Id', async () => {
		const user = await mockUserRepository.getById('1');

		expect(getUserByIdService.exec({ userId: '1' })).resolves.toEqual(user);
	});

	test('Nonexistent Id', () => {
		expect(getUserByIdService.exec({ userId: '0' })).rejects.toThrow(UserNotFoundError);
	});

	test('Invalid Id', () => {
		expect(getUserByIdService.exec({ userId: '' })).rejects.toThrow("Campo 'Id' inválido: não pode ser vazio.");
	});
});
