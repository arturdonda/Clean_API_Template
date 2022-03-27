import { MockUserRepository } from '@application/__tests__/mock';
import { GetUserById } from '@application/services/user';
import { UserNotFoundError } from '@application/errors';

describe('Get User By Id', () => {
	const userRepository = new MockUserRepository();
	const getUserByIdService = new GetUserById(userRepository);

	test('Valid Id', async () => {
		const user = await userRepository.getById('1');

		expect(getUserByIdService.exec({ userId: '1' })).resolves.toEqual(user);
	});

	test('Invalid Id', () => {
		expect(getUserByIdService.exec({ userId: '0' })).rejects.toThrow(UserNotFoundError);
	});
});
