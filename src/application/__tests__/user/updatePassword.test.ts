import { MockEmailService, MockHashService, MockIpService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { SignIn, UpdatePassword } from '@application/services/user';
import { InvalidPasswordError, UserNotFoundError } from '@application/errors';
import { CreateSession, RenewAccess } from '@application/services/session';

describe('Update Password', () => {
	const userRepository = new MockUserRepository();
	const passwordHashService = new MockHashService();
	const emailService = new MockEmailService();
	const updatePasswordService = new UpdatePassword(userRepository, passwordHashService, emailService);
	const tokenService = new MockTokenService();
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const renewAccessService = new RenewAccess(tokenService, tokenService);
	const signInService = new SignIn(userRepository, passwordHashService, createSessionService, renewAccessService);

	test('Valid parameters', async () => {
		const emailSpy = jest.spyOn(emailService, 'sendPasswordChangeConfirmationEmail');

		const user = await userRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		user.status = 'Active';

		await userRepository.update(user);

		expect(
			await updatePasswordService.exec({
				userId: user.id,
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

	test('Invalid user', async () => {
		expect(
			updatePasswordService.exec({
				userId: '',
				password: 'Test@123',
				confirmationPassword: 'Test@123',
			})
		).rejects.toThrow("Campo 'Id' inválido: não pode ser vazio.");
	});

	test('Nonexistent user', async () => {
		expect(
			updatePasswordService.exec({
				userId: '0',
				password: 'Test@123',
				confirmationPassword: 'Test@123',
			})
		).rejects.toThrow(UserNotFoundError);
	});

	test('Invalid password', async () => {
		expect(
			updatePasswordService.exec({
				userId: '1',
				password: 'TEST@123',
				confirmationPassword: 'TEST#123',
			})
		).rejects.toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere minúsculo (a-z).");
	});

	test('Unmatch passwords', async () => {
		expect(
			updatePasswordService.exec({
				userId: '1',
				password: 'Test@123',
				confirmationPassword: 'Test#123',
			})
		).rejects.toThrow(InvalidPasswordError);
	});
});
