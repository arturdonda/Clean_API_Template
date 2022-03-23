import { MockHashService, MockIpService, MockTokenService, MockUserRepository } from '@/application/tests/mock';
import { UpdatePassword, UpdateForgottenPassword, SignIn } from '@/application/services/user';
import { CreateSession, RenewAccess } from '@/application/services/session';
import { InvalidPasswordError, UserNotFoundError } from '@/application/protocols/errors';

describe('Update forgotten password', () => {
	const tokenService = new MockTokenService();
	const userRepository = new MockUserRepository();
	const passwordHashService = new MockHashService();
	const updatePasswordService = new UpdatePassword(userRepository, passwordHashService);
	const updateForgottenPasswordService = new UpdateForgottenPassword(tokenService, updatePasswordService);
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const renewAccessService = new RenewAccess(tokenService);
	const signInService = new SignIn(userRepository, passwordHashService, createSessionService, renewAccessService);

	test('Valid parameters', async () => {
		const resetToken = tokenService.generate('1');

		const user = await userRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		user.status = 'Active';

		await userRepository.update(user);

		expect(
			await updateForgottenPasswordService.exec({
				resetToken: resetToken.token,
				password: 'Test@123',
				confirmationPassword: 'Test@123',
			})
		).resolves;

		expect(
			signInService.exec({
				email: user.email,
				password: 'Test@123',
				ipAddress: '0.0.0.0',
			})
		).resolves;
	});

	test('Invalid token', async () => {
		const resetToken = tokenService.generate('0');

		expect(
			updateForgottenPasswordService.exec({
				resetToken: resetToken.token,
				password: 'Test@123',
				confirmationPassword: 'Test@123',
			})
		).rejects.toThrow(UserNotFoundError);
	});

	test('Unmatch passwords', async () => {
		const resetToken = tokenService.generate('1');

		expect(
			updateForgottenPasswordService.exec({
				resetToken: resetToken.token,
				password: 'Test@123',
				confirmationPassword: 'Test#123',
			})
		).rejects.toThrow(InvalidPasswordError);
	});
});