import { User } from '@domain/entities';
import { getAllUsersService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get All Users', () => {
	beforeAll(() => mockUserRepository.resetDatabase());

	afterAll(() => jest.restoreAllMocks());

	it('should return all users from fatabase', async () => {
		const users = await mockUserRepository.getAll();

		expect(getAllUsersService.exec()).resolves.toEqual<User[]>(users);
	});
});
