import { MockUserRepository } from '@application/__tests__/mock';
import { GetAllUsers } from '@application/services/user';

describe('Get All Users', () => {
	const userRepository = new MockUserRepository();
	const getAllUsersService = new GetAllUsers(userRepository);

	test('Get All Users', async () => {
		expect(getAllUsersService.exec()).resolves.toHaveLength(5);
	});
});
