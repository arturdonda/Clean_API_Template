import { ForgotPassword } from '@application/services/user';
import { UserNotFoundError } from '@application/errors';
import { MockEmailService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';

describe('Forgot Password', () => {
	const userRepository = new MockUserRepository();
	const tokenService = new MockTokenService();
	const emailService = new MockEmailService();

	const forgotPasswordService = new ForgotPassword(userRepository, tokenService, emailService);

	test('Valid e-mail', async () => {
		const user = await userRepository.getById('1');
		if (!user) throw new UserNotFoundError();

		const emailSpy = jest.spyOn(emailService, 'sendForgotPasswordEmail');
		const tokenSpy = jest.spyOn(tokenService, 'generate');

		await forgotPasswordService.exec({ email: user.email });

		expect(tokenSpy).toHaveBeenCalledWith(user.id);
		expect(emailSpy).toHaveBeenCalledWith(expect.objectContaining({ name: user.name, email: user.email }));

		emailSpy.mockRestore();
		tokenSpy.mockRestore();
	});

	test('Nonexistent e-mail', async () => {
		expect(forgotPasswordService.exec({ email: 'john.doe@hotmail.com' })).resolves;
	});

	test('Invalid e-mail', async () => {
		expect(forgotPasswordService.exec({ email: 'john.doe@hotmailcom' })).rejects.toThrow("Campo 'E-mail' inválido: formato inválido.");
	});
});
