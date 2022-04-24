import { makeUpdateForgottenPassword, makeSignIn } from '@tests/_factories/usecases';
import { InvalidPasswordError, UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockEmailService, mockTokenService } from '@tests/_factories/adapters';

describe('Update forgotten password', () => {
	const updateForgottenPasswordService = makeUpdateForgottenPassword(mockUserRepository);
	const signInService = makeSignIn(mockUserRepository);

	test('Valid parameters', async () => {
		const emailSpy = jest.spyOn(mockEmailService, 'sendPasswordChangeConfirmationEmail');

		const resetToken = mockTokenService.generate('1');

		const user = await mockUserRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		user.status = 'Active';

		await mockUserRepository.update(user);

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
		const resetToken = mockTokenService.generate('0');

		expect(
			updateForgottenPasswordService.exec({
				resetToken: resetToken.token,
				password: 'Test@123',
				confirmationPassword: 'Test@123',
			})
		).rejects.toThrow(UserNotFoundError);
	});

	test('Unmatch passwords', async () => {
		const resetToken = mockTokenService.generate('1');

		expect(
			updateForgottenPasswordService.exec({
				resetToken: resetToken.token,
				password: 'Test@123',
				confirmationPassword: 'Test#123',
			})
		).rejects.toThrow(InvalidPasswordError);
	});
});
