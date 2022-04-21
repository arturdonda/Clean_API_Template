import { MockEmailService, MockHashService, MockIpService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { UpdatePassword, UpdateForgottenPassword, SignIn } from '@application/services/user';
import { CreateSession, RenewAccess } from '@application/services/session';
import { InvalidPasswordError, UserNotFoundError } from '@application/errors';

describe('Update forgotten password', () => {
	const tokenService = new MockTokenService();
	const userRepository = new MockUserRepository();
	const passwordHashService = new MockHashService();
	const emailService = new MockEmailService();
	const updatePasswordService = new UpdatePassword(userRepository, passwordHashService, emailService);
	const updateForgottenPasswordService = new UpdateForgottenPassword(tokenService, updatePasswordService);
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const renewAccessService = new RenewAccess(tokenService, tokenService, userRepository);
	const signInService = new SignIn(userRepository, passwordHashService, createSessionService, renewAccessService);

	test('Valid parameters', async () => {
		const emailSpy = jest.spyOn(emailService, 'sendPasswordChangeConfirmationEmail');

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

		expect(emailSpy).toHaveBeenCalledWith({ name: user.name, email: user.email });

		expect(
			signInService.exec({
				email: user.email,
				password: 'Test@123',
				ipAddress: '0.0.0.0',
			})
		).resolves;

		emailSpy.mockRestore();
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
