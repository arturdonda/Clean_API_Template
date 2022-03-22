import { Activate } from '@/application/services/user';
import { UserNotFoundError } from '@/application/protocols/errors';
import { MockUserRepository } from '@/application/tests/mock';

describe('Activate User', () => {
	const userRepository = new MockUserRepository();
	const activateService = new Activate(userRepository);
	const confirmationCode = 'CCffe5c42644974f1c9102e93f35c77f64';

	test('Valid Confirmation Code', async () => {
		expect(userRepository.getByConfirmationCode(confirmationCode)).resolves.toHaveProperty('status', 'Pending');

		expect(activateService.exec({ confirmationCode })).resolves;

		expect(userRepository.getByConfirmationCode(confirmationCode)).resolves.toHaveProperty('status', 'Active');
	});

	test('Invalid Confirmation Code', async () => {
		expect(activateService.exec({ confirmationCode: 'CC123' })).rejects.toThrow(UserNotFoundError);
	});
});
