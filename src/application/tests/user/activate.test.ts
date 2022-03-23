import { Activate } from '@/application/services/user';
import { UserNotFoundError } from '@/application/protocols/errors';
import { MockUserRepository } from '@/application/tests/mock';

describe('Activate User', () => {
	const userRepository = new MockUserRepository();
	const activateService = new Activate(userRepository);

	test('Valid Confirmation Code', async () => {
		const user = await userRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		expect(userRepository.getByConfirmationCode(user.confirmationCode)).resolves.toHaveProperty('status', 'Pending');

		expect(activateService.exec({ confirmationCode: user.confirmationCode })).resolves;

		expect(userRepository.getByConfirmationCode(user.confirmationCode)).resolves.toHaveProperty('status', 'Active');
	});

	test('Invalid Confirmation Code', async () => {
		expect(activateService.exec({ confirmationCode: '123' })).rejects.toThrow(UserNotFoundError);
	});
});
