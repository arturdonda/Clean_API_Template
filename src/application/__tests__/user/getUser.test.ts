import { MockUserRepository } from '@/application/__tests__/mock';
import { GetUserProfile } from '@/application/services/user';
import { UserNotFoundError } from '@/application/errors';

describe('Get Active Sessions', () => {
	const userRepository = new MockUserRepository();
	const getUserProfileService = new GetUserProfile(userRepository);

	test('Valid Id', async () => {
		const user = await userRepository.getById('1');

		expect(getUserProfileService.exec({ userId: '1' })).resolves.toEqual(user);
	});

	test('Invalid Id', () => {
		expect(getUserProfileService.exec({ userId: '0' })).rejects.toThrow(UserNotFoundError);
	});
});
