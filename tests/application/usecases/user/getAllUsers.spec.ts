import { makeGetAllUsers } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get All Users', () => {
	const getAllUsersService = makeGetAllUsers(mockUserRepository);

	test('Get All Users', async () => {
		expect(getAllUsersService.exec()).resolves.toHaveLength(5);
	});
});
