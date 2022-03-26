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

		const emailSpy = jest.spyOn(emailService, 'send');
		const tokenSpy = jest.spyOn(tokenService, 'generate');

		await forgotPasswordService.exec({ email: user.email });

		expect(tokenSpy).toHaveBeenCalledWith(user.id);
		expect(emailSpy).toHaveBeenCalledWith({
			to: [user.email],
			cc: [],
			bcc: [],
			subject: 'Redefinir a sua senha',
			body: expect.stringContaining(`Olá ${user.name},`),
		});

		emailSpy.mockRestore();
		tokenSpy.mockRestore();
	});

	test('Invalid e-mail', async () => {
		expect(forgotPasswordService.exec({ email: 'john.doe@hotmail.com' })).resolves;
	});
});
